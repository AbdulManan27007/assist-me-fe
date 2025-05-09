import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/core/Typography";
import { useNewListingContext } from "../newListingContext";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useCreateListingMutation } from "@/store/listings/listingsApi";
import { useGlobalContext } from "@/globalContext/globalContext";

export function ReviewDetails() {
  const { listing, setStep } = useNewListingContext();
  const { user } = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createListing, { isLoading }] = useCreateListingMutation();
  const router = useRouter();

  const ClickToEdit = ({
    step,
    children,
  }: { step: number } & PropsWithChildren) => (
    <div
      onClick={() => setStep(step)}
      className="cursor-pointer relative after:absolute after:inset-[-5px] after:rounded-[6px] hover:after:bg-black-5/5"
    >
      {children}
    </div>
  );

  const handlePublish = async () => {
    if (errorMessage) setErrorMessage("");
    const { imageFiles, ...listingData } = listing;
    const listingDataToSend = {
      ...listingData,
      user_id: user?.id,
      status: "open",
    };

    try {
      const res = await createListing(listingDataToSend).unwrap();
      setSuccessMessage("Listing created successfully");
      console.log("SUCCESS:", res);

      setTimeout(() => {
        router.push("/my-listings");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(error.message || "Error creating listing");
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Typography variant="24px/800/32.78px" className="text-black-2">
          Review Details
        </Typography>

        <Typography variant="16px/400/21.86px" className="text-gray-500">
          Click on any detail you’d like to edit
        </Typography>
      </div>

      <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8">
        <ClickToEdit step={0}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Personal Information
            </Typography>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Full Name
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.fullname}
                </Typography>
              </div>
              {/* <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Profile 
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.profile}
                </Typography>
              </div> */}
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Bio
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.bio}
                </Typography>
              </div>
            </div>
          </div>
        </ClickToEdit>
        {/* <ClickToEdit step={2}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Uploaded media
            </Typography>
            <div className="flex gap-2 flex-wrap">
              {Array.isArray(listing?.images) &&
                listing.images.map((image, index) => (
                  <Image
                    priority
                    key={index}
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                    alt={`uploaded media ${index}`}
                    width={80}
                    height={80}
                    className="rounded-[12px]"
                  />
                ))}
            </div>
          </div>
        </ClickToEdit> */}

        <ClickToEdit step={1}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Contact Information
            </Typography>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Email
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.email}
                </Typography>
              </div>
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Contact Number
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.contactnumber}
                </Typography>
              </div>
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Website URL
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.weburl}
                </Typography>
              </div>
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Country
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.country}
                </Typography>
              </div>
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  City
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.city}
                </Typography>
              </div>
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Address
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.address}
                </Typography>
              </div>
            </div>
          </div>
        </ClickToEdit>

        <ClickToEdit step={2}>
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Professional Information
            </Typography>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Experience
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.experience}
                </Typography>
              </div>
              <div>
                <Typography variant="14px/600/20px" className="text-black-4">
                  Certified
                </Typography>
                <Typography variant="16px/400/21.86px">
                  {listing?.certified}
                </Typography>
              </div>
            </div>
          </div>
        </ClickToEdit>

        <Button onClick={handlePublish} disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit"
          )}
        </Button>

        {successMessage && <Toast message={successMessage} type="success" />}
        {errorMessage && <Toast message={errorMessage} type="error" />}
      </div>
    </div>
  );
}
