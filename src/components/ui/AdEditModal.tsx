"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateListingMutation } from "@/store/adminDashboard/listingsApi";
import { useUploadFileMutation } from "@/store/users/userApi";
import { CameraIcon } from "@/icons";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  ad: any | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function AdEditModal({ isOpen, onClose, ad, onSuccess, onError }: AdModalProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>(
    ad?.image || "https://via.placeholder.com/150"
  );
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [updateAd] = useUpdateListingMutation();
  const [uploadAdImage] = useUploadFileMutation();
  const [isLoading, setIsLoading] = useState(false);

  const AdSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    price: z.string().min(1),
    category: z.string().min(2),
    status: z.enum(["active", "inactive"]),
  });

  const form = useForm({
    resolver: zodResolver(AdSchema),
    defaultValues: {
      title: ad?.title || "",
      description: ad?.description || "",
      price: ad?.price || "",
      category: ad?.category || "",
      status: ad?.status || "active",
    },
  });

  const { handleSubmit, setValue } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageFile(file);
    setPreviewImageUrl(URL.createObjectURL(file));
  };

  const handleSave = async (data: any) => {
    if (!ad?.id) {
      console.error("Ad ID is missing.");
      return;
    }
    setIsLoading(true);

    let finalData = { ...data };

    if (selectedImageFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedImageFile);
        const response = await uploadAdImage(formData).unwrap();
        finalData.image = response.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        onError?.(error);
        return;
      }
    }

    try {
      await updateAd({ id: ad.id, listing: finalData }).unwrap();
      onSuccess?.();
      onClose();
    } catch (error) {
      onError?.(error);
      console.error("Update failed:", error);
    }
    setIsLoading(false);
  };

  if (!ad) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogTitle>Edit Ad</DialogTitle>
        <div className="w-full p-4 grid gap-6 border rounded-[12px]">
          {/* Image Preview */}
          <div className="relative w-fit mx-auto">
            {Array.isArray(ad.images) ? (
              <div className="flex gap-2 overflow-x-auto w-full">
                {ad.images.map((img: string, index: number) => (
                  <Image
                    key={index}
                    priority
                    src={img}
                    alt={`ad-image-${index}`}
                    width={104}
                    height={104}
                    className="rounded-lg w-[104px] h-[104px]"
                  />
                ))}
              </div>
            ) : (
              <Image
                priority
                src={ad.images || "https://via.placeholder.com/104"}
                alt="ad-image"
                width={104}
                height={104}
                className="rounded-lg w-[104px] h-[104px]"
              />
            )}
            <label className="cursor-pointer absolute bottom-1 right-1 p-2.5 rounded-full bg-accent border-4 border-white">
              <input type="file" className="hidden" onChange={handleImageChange} />
              <CameraIcon />
            </label>
          </div>

          {/* Form Section */}
          <Form {...form}>
            <form onSubmit={handleSubmit(handleSave)} className="grid gap-4">
              {(["title", "description", "price", "category"] as const).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={`Enter ${field}`} {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select {...field} className="border p-2 rounded-md w-full">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <CircularProgress color="inherit" /> : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>

  );
}
