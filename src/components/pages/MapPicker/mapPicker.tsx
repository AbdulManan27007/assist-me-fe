"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const fallbackCenter = {
  lat: 31.5204,
  lng: 74.3587,
};

async function getAddressFromLatLng(lat: number, lng: number): Promise<string | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      console.error("Geocoding error:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Geocoding failed:", error);
    return null;
  }
}

export default function MapPicker({
  onLocationSelect,
}: {
  onLocationSelect: (address: string, lat: number, lng: number) => void;
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [center, setCenter] = useState(fallbackCenter);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const location = { lat, lng };

      setMarker(location);
      mapRef.current?.panTo(location);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const address = results[0].formatted_address;
          onLocationSelect(address, lat, lng);
        } else {
          console.error("Geocoder failed due to:", status);
        }
      });
    }
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newLocation = { lat, lng };

      setMarker(newLocation);
      mapRef.current?.panTo(newLocation);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newLocation }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const address = results[0].formatted_address;
          onLocationSelect(address, lat, lng);
        } else {
          console.error("Geocoder failed due to:", status);
        }
      });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentLocation = { lat, lng };

          setCenter(currentLocation);
          setMarker(currentLocation);
          mapRef.current?.panTo(currentLocation);

          const address = await getAddressFromLatLng(lat, lng);
          if (address) {
            onLocationSelect(address, lat, lng);
          }
        },
        (error) => {
          console.warn("Error getting current location:", error);
          // fallback address logging
          getAddressFromLatLng(fallbackCenter.lat, fallbackCenter.lng).then((address) => {
            if (address) {
              console.log("Fallback default address:", address);
            }
          });
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          clickableIcons: true,
        }}
      >
        {marker && (
          <Marker
            position={marker}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
            // icon={{
            //   url: "/images/pin-point.gif",
            //   scaledSize: new google.maps.Size(50, 50),
            // }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
