import { z } from "zod";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@/components/ui/button";
import DragAndDrop from "@/components/ui/DragAndDrop";
import Toast from "@/components/ui/toast";
import { useNewListingContext } from "../newListingContext";
import { useUploadImageMutation } from "@/store/api/uploadfile/uploadfile";
import { Typography } from "@/components/core/Typography";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  images: z.array(z.string()).optional(),
});

export function UploadMedia() {
  const { services, nextStep, setListingData, prevStep } =
    useNewListingContext();
  const [uploadFile] = useUploadImageMutation();

  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    services?.images || []
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      images: services?.images || [],
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setSelectedFiles([...selectedFiles, ...Array.from(files)]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    form.setValue("images", newImages);

    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (
      selectedFiles.length === 0 &&
      (!data.images || data.images.length === 0)
    ) {
      setToastMessage({
        message: "Please upload at least one image.",
        type: "error",
      });
      return;
    }

    setIsUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const response = await uploadFile(formData).unwrap();
          console.log("Uploaded Image URL:", response.data.url);
          return response.data.url;
        })
      );

      const finalImages = [...uploadedImages, ...uploadedUrls];
      setUploadedImages(finalImages);
      setListingData({ ...services, images: finalImages });
      nextStep();
    } catch (error) {
      console.error("File upload failed:", error);
      setToastMessage({
        message: "File upload failed. Try again.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <div>
          <Typography variant="24px/800/32.78px">Service Images</Typography>
          <Typography variant="16px/400/21.86px" className="text-gray-500">
            Please provide any document regarded this service.
          </Typography>
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DragAndDrop
                  previews={uploadedImages}
                  onChange={handleImageChange}
                  onRemove={handleRemoveImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-3">
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-accent"
            onClick={prevStep}
          >
            Back
          </Button>
          {toastMessage && (
            <Toast message={toastMessage.message} type={toastMessage.type} />
          )}
        </div>
      </form>
    </Form>
  );
}
