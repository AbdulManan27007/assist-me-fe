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

export function ReviewDetails() {
  const { services, setStep, setListingData } = useNewListingContext();
  const { user } = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createService, { isLoading, isError, isSuccess, error }] =
    useCreateServiceMutation();
  const router = useRouter();

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
      <div className="grid gap-2">
        <Typography variant="24px/800/32.78px" className="text-black-2">
          Review Details
        </Typography>
        <Typography variant="14px/400/21px" className="text-black-5">
          Click on any detail you’d like to edit
        </Typography>
      </div>

      <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <ClickToEdit step={0}>
              <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                <Typography variant="14px/400/21px" className="text-black-5">
                  {services?.category}
                </Typography>
              </div>
            </ClickToEdit>

            <div className="flex items-center gap-2">
              <ClickToEdit step={0}>
                <Typography variant="16px/600/21.86px" className="text-black-5">
                  {services?.location}
                </Typography>
              </ClickToEdit>
              <div className="h-1 w-1 rounded-full bg-black-5" />
            </div>
          </div>

          <ClickToEdit step={0}>
            <Typography variant="24px/800/32.78px">
              {services?.title}
            </Typography>
          </ClickToEdit>
        </div>

        <ClickToEdit step={0}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Description
            </Typography>
            <Typography variant="16px/400/24px" className="text-black-5">
              {services?.description}
            </Typography>
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
                    width={80}
                    height={80}
                    className="rounded-[12px]"
                  />
                ))}
            </div>
          </div>
        </ClickToEdit>

        <ClickToEdit step={1}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Pricing
            </Typography>
            <div className="flex flex-1 items-end gap-2">
              <Typography variant="24px/800/32.78px">
                A$ {services?.price}
              </Typography>
              <Typography variant="16px/400/21.86px" className="text-black-5">
                {services?.priceType}
              </Typography>
            </div>
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
