import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import { daysAgo, formatDate } from "@/lib/utils";
import { CalendarIcon, HourGlassIcon } from "@/icons";
import { Typography } from "@/components/core/Typography";
import { useNewListingContext } from "../newListingContext";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useCreateServiceMutation } from "@/store/listings/listingsApi";
import { useGlobalContext } from "@/globalContext/globalContext";
import { AnyARecord } from "node:dns";

export function ReviewDetails() {
  const { services, setStep, setListingData } = useNewListingContext();
  const { user } = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [expandedVehicle, setExpandedVehicle] = useState(null);
  const [createService, { isLoading, isError, isSuccess, error }] =
    useCreateServiceMutation();
  const router = useRouter();

  const hasVehicles = Array.isArray(services?.vehicles) && services.vehicles.length > 0;

  // const toggleVehicleDetails = (index : any) => {
  //   if (expandedVehicle === index) {
  //     setExpandedVehicle(index);
  //   } else {
  //     setExpandedVehicle(index);
  //   }
  // }; ingrdient address bussiness name mango fruit drink phone null license number 250ml logo null h&S foods 

  const ClickToEdit = ({
    step,
    children,
  }: { step: number } & PropsWithChildren) => (
    <div
      onClick={() => setStep(step)}
      className="cursor-pointer after:transition-colors relative after:absolute after:inset-[-5px] after:rounded-[6px] hover:after:bg-black-5/5"
    >
      {children}
    </div>
  );

  const handlePublish = async () => {
    if (errorMessage) {
      setErrorMessage("");
    }
    const serviceData = { ...services, user_id: user?.id };
    try {
      await createService(serviceData).unwrap();

      setListingData({
        category: "",
        location: "",
        title: "",
        description: "",
        images: [],
        price: 0,
        price_description: "",
        price_type: "",
      });

      setSuccessMessage("Service created successfully");
      setTimeout(() => {
        setStep(0);
        router.push("/tradies-find-listings");
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message || "Error creating Service");
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid grid-1">
        <Typography variant="24px/800/32.78px" className="text-black-2">
          Review Details
        </Typography>
        <Typography variant="16px/400/21.86px" className="text-gray-500">
        Click on any detail you’d like to edit
        </Typography>
      </div>

      <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8 ">
        <div className="grid gap-4 ">
          <ClickToEdit step={0}>
            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Basic Information
              </Typography>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                <Typography variant="16px/700/21.86px" className="text-black-4">
                    Title
                  </Typography>
                  <Typography  variant="14px/400/19.12px" >
                  {services?.title}
                  </Typography>
                </div>
                <div>
                <Typography variant="16px/700/21.86px" className="text-black-4">
                    Description
                  </Typography>
                  <Typography  variant="14px/400/19.12px" >
                  {services?.description}
                  </Typography>
                </div>
                <div>
                <Typography variant="16px/700/21.86px" className="text-black-4">
                    Price
                  </Typography>
                  <Typography  variant="14px/400/19.12px" >
                  {services?.price}
                  </Typography>
                </div>
              </div>
            </div>
          </ClickToEdit>
        </div>

        <ClickToEdit step={1}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Category & Tags
            </Typography>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Typography variant="16px/700/21.86px" className="text-black-4">
                  Service Type
                </Typography>
                <Typography  variant="14px/400/19.12px" >
                  {services?.service_type}
                </Typography>
              </div>
              <div>
                <Typography variant="16px/700/21.86px" className="text-black-4">
                  Service Category
                </Typography>
                <Typography variant="14px/400/19.12px">
                  {services?.category}
                </Typography>
              </div>
              <div>
                <Typography variant="16px/700/21.86px" className="text-black-4">
                  Service Tags
                </Typography>
                <Typography variant="14px/400/19.12px">
                  {services?.tags}
                </Typography>
              </div>
            </div>
          </div>
        </ClickToEdit>

        <ClickToEdit step={2}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Uploaded media
            </Typography>
            <div className="flex gap-2 flex-wrap">
              {Array.isArray(services?.images) &&
                services.images.map((image, index) => (
                  <Image
                    priority
                    key={index}
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`uploaded media ${index}`}
                    width={100}
                    height={80}
                    className="rounded-[12px]"
                  />
                ))}
            </div>
          </div>
        </ClickToEdit>

        <ClickToEdit step={3}>
        <div className="grid gap-3">
      <Typography variant="18px/700/24.59px" className="text-black-4">
        Vehicle Details
      </Typography>

      {!hasVehicles && (
        <Typography variant="14px/400/19.12px" className="text-gray-500">
          No vehicle details available.
        </Typography>
      )}

      {hasVehicles && (services.vehicles ?? []).map((vehicle, vehicleIndex) => (
        <div 
          key={vehicleIndex} 
          className="border border-gray-200 rounded-lg p-4 mb-4"
        >
          <div 
            className="flex justify-between items-center cursor-pointer" 
                  // onClick={() => toggleVehicleDetails(vehicleIndex)}
          >
            <Typography variant="16px/700/21.86px" className="text-black-4">
              Vehicle {vehicleIndex + 1}: {(vehicle as any)?.model || (vehicle as any)?.vehicleType || "Vehicle"}
            </Typography>
            <div className="text-accent">
              {expandedVehicle === vehicleIndex ? "▲" : "▼"}
            </div>
          </div>

          {(expandedVehicle === vehicleIndex || (services.vehicles?.length ?? 0) === 1) && (
            <div className="mt-3">
              <div className="grid md:grid-cols-2 gap-4">
                {/* <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    Vehicle Type
                  </Typography>
                  <Typography variant="14px/400/19.12px">
                    {typeof vehicle === "object" && vehicle.vehicleType ? vehicle.vehicleType : "N/A"}
                  </Typography>
                </div> */}
                <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    Vehicle Make
                  </Typography>
                  {/* <Typography variant="14px/400/19.12px">
                    {typeof vehicle === "object" && vehicle.model ? vehicle.model : "N/A"}
                  </Typography> */}
                </div>
                <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    Sitting Capacity
                  </Typography>
                  {/* <Typography variant="14px/400/19.12px">
                    {typeof vehicle === "object" && vehicle.sittingCapacity ? vehicle.sittingCapacity : "N/A"}
                  </Typography> */}
                </div>
                <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    Year of Manufacture
                  </Typography>
                  {/* <Typography variant="14px/400/19.12px">
                    {vehicle.modelNumber || "N/A"}
                  </Typography> */}
                </div>
                <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    Plate Number
                  </Typography>
                  {/* <Typography variant="14px/400/19.12px">
                    {vehicle.plateNumber || "N/A"}
                  </Typography> */}
                </div>
                <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    License Number
                  </Typography>
                  {/* <Typography variant="14px/400/19.12px">
                    {vehicle.licenseNumber || "N/A"}
                  </Typography> */}
                </div>
                <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    Color
                  </Typography>
                  {/* <Typography variant="14px/400/19.12px">
                    {vehicle.color || "N/A"}
                  </Typography> */}
                </div>
                <div>
                  <Typography variant="16px/700/21.86px" className="text-black-4">
                    Car Registration Number
                  </Typography>
                  {/* <Typography variant="14px/400/19.12px">
                    {vehicle.carRegistrationNumber || "N/A"}
                  </Typography> */}
                </div>
              </div>

              {/* Vehicle Images */}
              {/* {Array.isArray(vehicle.vehicleImages) && vehicle.vehicleImages.length > 0 && (
                <div className="mt-4">
                  <Typography variant="16px/700/21.86px" className="text-black-4 mb-2">
                    Vehicle Images
                  </Typography>
                  <div className="flex gap-2 flex-wrap">
                    {vehicle.vehicleImages.map((image, imageIndex) => (
                      <Image
                        priority
                        key={imageIndex}
                        src={typeof image === "string" ? image : URL.createObjectURL(image)}
                        alt={`Vehicle ${vehicleIndex + 1} image ${imageIndex + 1}`}
                        width={100}
                        height={80}
                        className="rounded-[12px]"
                      />
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          )}
        </div>
      ))}
    </div>
</ClickToEdit>

      </div>

      <Button
        type="submit"
        className="mt-2"
        disabled={isLoading}
        onClick={handlePublish}
      >
        {isLoading ? <CircularProgress color="inherit" /> : "Publish Service"}
      </Button>
      {isError && errorMessage && <Toast message={errorMessage} type="error" />}
      {isSuccess && successMessage && (
        <Toast message={successMessage} type="success" />
      )}
    </div>
  );
}
