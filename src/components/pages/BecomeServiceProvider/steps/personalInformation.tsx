import { z } from "zod";
import { useState, useRef, useCallback } from "react";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useNewListingContext } from "../newListingContext";
import { CameraIcon } from "@/icons";
import CircularProgress from "@mui/material/CircularProgress";
import { useUploadImageMutation } from "@/store/api/uploadfile/uploadfile";
import Toast from "@/components/ui/toast";
import NextImage from "next/image";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FormSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  profile: z.string().min(1, "Profile image is required"),
  bio: z.string().min(1, "Bio is required"),
});

// Helper function to create crop preview
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Failed to get canvas context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error("Canvas is empty");
        }
      },
      "image/jpeg",
      0.95
    );
  });
};

export function PersonalInformation() {
  const { listing, nextStep, setListingData } = useNewListingContext();
  const [uploadFile] = useUploadImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(
    listing?.profile || ""
  );

  // Crop related states
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: listing?.fullname || "",
      profile: listing?.profile || "",
      bio: listing?.bio || "",
    },
  });

  const onCropComplete = useCallback((_: unknown, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setTempImageSrc(objectUrl);
    setIsCropperOpen(true);

    event.target.value = ""; // Allow reselecting same file
  };

  const handleApplyCrop = async () => {
    try {
      if (!croppedAreaPixels) return;

      setIsUploading(true);
      setIsCropperOpen(false);

      // Get the cropped image as a blob
      const croppedImage = await getCroppedImg(tempImageSrc, croppedAreaPixels);

      // Create a new File from the blob
      const croppedFile = new File([croppedImage], "cropped-profile.jpeg", {
        type: "image/jpeg",
      });

      // Upload the cropped image
      const formData = new FormData();
      formData.append("file", croppedFile);
      const response = await uploadFile(formData).unwrap();

      if (response.success) {
        const uploadedImageUrl = response.data.url;

        setProfileImageUrl(uploadedImageUrl);
        form.setValue("profile", uploadedImageUrl);

        setListingData({
          ...listing,
          profile: uploadedImageUrl,
        });

        setToastMessage({
          message: "Profile image uploaded successfully",
          type: "success",
        });
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Profile image upload failed:", error);
      setToastMessage({
        message: "Image upload failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(tempImageSrc);
    }
  };

  const cancelCrop = () => {
    setIsCropperOpen(false);
    URL.revokeObjectURL(tempImageSrc);
    setTempImageSrc("");
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: any) => {
    setListingData({
      ...listing,
      fullname: data.fullname,
      profile: data.profile,
      bio: data.bio,
    });
    nextStep();
  };

 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-12">
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Typography variant="24px/800/32.78px">
              Personal/Business Information
            </Typography>
            <Typography variant="16px/400/21.86px" className="text-gray-500">
              Please provide your personal information.
            </Typography>
          </div>
          <div className="flex items-center justify-center">
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  {/* <p className="text-sm text-gray-500 font-medium mb-2">Profile Image</p> */}

                  <div className="relative w-fit ">
                    {profileImageUrl ? (
                      <NextImage
                        priority
                        src={profileImageUrl}
                        alt="User avatar"
                        width={240}
                        height={240}
                        className="rounded-full w-[240px] h-[240px] object-cover !border border-dashed !border-gray-300"
                      />
                    ) : (
                      <div className="rounded-full w-[240px] h-[240px] bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image selected</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleCameraClick}
                      className="cursor-pointer absolute bottom-1 right-1 p-2.5 grid place-items-center rounded-full bg-accent border-4 border-white"
                    >
                      <CameraIcon />
                    </button>

                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </div>

                  <FormControl>
                    <input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      full
                      smallLabel="Full Name"
                      placeholder="Please add your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    smallLabel="Bio"
                    placeholder="Please add your bio"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-2" disabled={isUploading}>
          {isUploading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Continue"
          )}
        </Button>

        {toastMessage && (
          <Toast message={toastMessage.message} type={toastMessage.type} />
        )}

        {/* Image Cropper Dialog */}
        <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crop Profile Image</DialogTitle>
            </DialogHeader>

            <div className="relative h-64 w-full">
              {tempImageSrc && (
                <Cropper
                  image={tempImageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                />
              )}
            </div>

            <div className="py-2">
              <label className="block text-sm text-gray-500 mb-2">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <DialogFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={cancelCrop}>
                Cancel
              </Button>
              <Button type="button" onClick={handleApplyCrop}>
                Apply & Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
