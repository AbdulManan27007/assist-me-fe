"use client";

import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useNewListingContext } from "../newListingContext";
import { useEffect, useRef } from "react";
import MapPicker from "@/components/pages/MapPicker/mapPicker";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  contactnumber: z.string().nonempty("Contact number is required"),
  website: z.string().url("Invalid URL").nonempty("Website is required"),
  address: z.string().nonempty("Address is required"),
});

declare global {
  interface Window {
    google: typeof google;
  }
}

export function ContactInformation() {
  const { listing, nextStep, setListingData, prevStep } = useNewListingContext();

  const addressRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: listing?.email || "",
      contactnumber: listing?.contactnumber || "",
      website: listing?.weburl || "",
      address: listing?.address || "",
    },
  });

  // Address Autocomplete Initialization
  useEffect(() => {
    if (!addressRef.current || !window.google?.maps?.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "pk" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.formatted_address) return;

      const { lat, lng } = place.geometry.location?.toJSON() || {};
      const address = place.formatted_address;

      // Update form and map
      form.setValue("address", address, { shouldValidate: true, shouldDirty: true });
      setListingData({
        ...listing,
        address,
        latitude: lat,
        longitude: lng,
      });
    });
  }, [addressRef.current]);

  const handleLocationSelect = (address: string, lat: number, lng: number) => {
    form.setValue("address", address, { shouldValidate: true, shouldDirty: true });
    setListingData({
      ...listing,
      address,
      latitude: lat,
      longitude: lng,
    });
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData({
      ...listing,
      email: data.email,
      contactnumber: data.contactnumber,
      weburl: data.website,
      address: data.address,
    });
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <div>
          <Typography variant="24px/800/32.78px">Contact Information</Typography>
          <Typography variant="16px/400/21.86px" className="text-gray-500">
            Please provide your contact Information.
          </Typography>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input full smallLabel="Email" placeholder="Please add your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactnumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  full
                  smallLabel="Contact Number"
                  placeholder="Please add your contact number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  full
                  smallLabel="Website URL"
                  placeholder="Please add your website URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  full
                  smallLabel="Address"
                  placeholder="Search or type your address"
                  {...field}
                  ref={(e) => {
                    addressRef.current = e;
                    field.ref(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-4">
          <Typography variant="18px/700/24.59px" className="text-black-4 mb-2">
            Select Location on Map
          </Typography>
          <MapPicker onLocationSelect={handleLocationSelect} />
        </div>

        <div className="grid gap-5">
          <Button type="submit">Continue</Button>
          <Button
            type="button"
            variant="ghost"
            className="text-accent"
            onClick={prevStep}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
