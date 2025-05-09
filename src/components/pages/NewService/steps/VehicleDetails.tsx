import { z } from "zod";
import { useState, ChangeEvent } from "react";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, DeleteIcon } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@/components/core/Typography";
import { useNewListingContext } from "../newListingContext";
import { VehicleType, VehicleCompany } from "@/globalContext/globalContext";
import { useUploadImageMutation } from "@/store/api/uploadfile/uploadfile";
import UploadIcon from "@/icons/UploadIcon";

// Define a schema for a single vehicle
const VehicleSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle type is required"),
  model: z.string().min(1, "Model is required"),
  modelNumber: z.string().min(1, "Model number is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  color: z.string().min(1, "Color is required"),
  carRegistrationNumber: z
    .string()
    .min(1, "Car registration number is required"),
  sittingCapacity: z.string().min(1, "Capacity is required"),
  vehicleImages: z.array(z.string()).optional(),
});

const FormSchema = z.object({
  vehicles: z.array(VehicleSchema).min(1, "At least one vehicle is required"),
});

export function VehicleDetails() {
  const { services, nextStep, setListingData, prevStep } =
    useNewListingContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile] = useUploadImageMutation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviewsMap, setFilePreviewsMap] = useState<
    Map<number, Map<string, string>>
  >(new Map());
  const [uploadedImages, setUploadedImages] = useState<
    { vehicleIndex: number; url: string; fileName: string }[]
  >([]);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vehicles: Array.isArray(services?.vehicles)
        ? services.vehicles.map((vehicle) =>
            typeof vehicle === "string" ? { vehicleType: vehicle } : vehicle
          )
        : [{}],
    },
    mode: "all", // Enable real-time validation
  });

  const { control, watch, getValues, setValue, formState } = form;
  const watchedVehicles = watch("vehicles");
  const { errors } = formState;

  const addVehicle = () => {
    const currentVehicles = getValues().vehicles || [];
    setValue("vehicles", [
      ...currentVehicles,
      {
        vehicleType: "",
        model: "",
        modelNumber: "",
        plateNumber: "",
        licenseNumber: "",
        color: "",
        carRegistrationNumber: "",
        sittingCapacity: "",
        vehicleImages: [],
      },
    ]);
  };

  const removeVehicle = (index: number) => {
    const currentVehicles = getValues().vehicles || [];
    const updatedVehicles = [...currentVehicles];
    updatedVehicles.splice(index, 1);
    setValue("vehicles", updatedVehicles);

    const updatedPreviews = new Map(filePreviewsMap);
    updatedPreviews.delete(index);
    setFilePreviewsMap(updatedPreviews);

    setUploadedImages(
      uploadedImages.filter((img) => img.vehicleIndex !== index)
    );
  };

  const isVehicleComplete = (index: number) => {
    const vehicle = watchedVehicles[index];
    if (!vehicle) return false;

    const requiredFields = [
      "vehicleType",
      "model",
      "modelNumber",
      "plateNumber",
      "licenseNumber",
      "color",
      "carRegistrationNumber",
      "sittingCapacity",
    ];

    return requiredFields.every(
      (field) =>
        vehicle[field as keyof typeof vehicle] &&
        String(vehicle[field as keyof typeof vehicle]).trim() !== ""
    );
  };

  const generatePreview = (file: File): string => {
    return URL.createObjectURL(file);
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    vehicleIndex: number
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    const vehiclePreviews =
      filePreviewsMap.get(vehicleIndex) || new Map<string, string>();

    newFiles.forEach((file) => {
      vehiclePreviews.set(file.name, generatePreview(file));
    });

    const updatedPreviews = new Map(filePreviewsMap);
    updatedPreviews.set(vehicleIndex, vehiclePreviews);
    setFilePreviewsMap(updatedPreviews);

    setSelectedFiles([...selectedFiles, ...newFiles]);

    const currentVehicle = getValues().vehicles[vehicleIndex];
    const currentImages = currentVehicle.vehicleImages || [];
    const newFileNames = newFiles.map((file) => file.name);

    setValue(`vehicles.${vehicleIndex}.vehicleImages`, [
      ...currentImages,
      ...newFileNames,
    ]);
  };

  const handleRemoveImage = (imageName: string, vehicleIndex: number) => {
    const currentImages = [
      ...(getValues().vehicles[vehicleIndex].vehicleImages || []),
    ];

    const imageIndex = currentImages.findIndex((name) => name === imageName);
    if (imageIndex === -1) return;

    currentImages.splice(imageIndex, 1);
    setValue(`vehicles.${vehicleIndex}.vehicleImages`, currentImages);

    const vehiclePreviews = filePreviewsMap.get(vehicleIndex);
    if (vehiclePreviews && vehiclePreviews.has(imageName)) {
      URL.revokeObjectURL(vehiclePreviews.get(imageName)!);

      vehiclePreviews.delete(imageName);
      const updatedPreviews = new Map(filePreviewsMap);
      updatedPreviews.set(vehicleIndex, vehiclePreviews);
      setFilePreviewsMap(updatedPreviews);
    }

    setUploadedImages(
      uploadedImages.filter(
        (img) =>
          !(img.vehicleIndex === vehicleIndex && img.fileName === imageName)
      )
    );

    setSelectedFiles(selectedFiles.filter((file) => file.name !== imageName));
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const hasNoImages = data.vehicles.some(
      (vehicle) => !vehicle.vehicleImages || vehicle.vehicleImages.length === 0
    );

    if (hasNoImages) {
      setToastMessage({
        message: "Please upload at least one image for each vehicle.",
        type: "error",
      });
      return;
    }

    setIsUploading(true);
    try {
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const response = await uploadFile(formData).unwrap();
          console.log("Uploaded Image URL:", response.data.url);

          for (let i = 0; i < data.vehicles.length; i++) {
            const vehicle = data.vehicles[i];
            if (vehicle.vehicleImages?.includes(file.name)) {
              return {
                vehicleIndex: i,
                fileName: file.name,
                url: response.data.url,
              };
            }
          }
          return null;
        });

        const uploadedResults = (await Promise.all(uploadPromises)).filter(
          Boolean
        );

        setUploadedImages([
          ...uploadedImages,
          ...uploadedResults.filter(
            (
              result
            ): result is {
              vehicleIndex: number;
              fileName: string;
              url: string;
            } => result !== null
          ),
        ]);

        const updatedVehicles = [...data.vehicles];

        uploadedResults.forEach((result) => {
          if (!result) return;

          const vehicleIndex = result.vehicleIndex;
          const fileName = result.fileName;
          const imageUrl = result.url;

          const currentVehicle = updatedVehicles[vehicleIndex];
          const imageIndex =
            currentVehicle.vehicleImages?.findIndex(
              (img) => img === fileName
            ) ?? -1;

          if (imageIndex !== -1 && currentVehicle.vehicleImages) {
            currentVehicle.vehicleImages[imageIndex] = imageUrl;
          }
        });

        data.vehicles = updatedVehicles;
      }

      setListingData({
        ...services,
        vehicles: data.vehicles as any[],
      });

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

  const getImagePreview = (imageName: string, vehicleIndex: number): string => {
    const uploadedImage = uploadedImages.find(
      (img) => img.vehicleIndex === vehicleIndex && img.fileName === imageName
    );

    if (uploadedImage) {
      return uploadedImage.url;
    }

    const vehiclePreviews = filePreviewsMap.get(vehicleIndex);
    if (vehiclePreviews && vehiclePreviews.has(imageName)) {
      return vehiclePreviews.get(imageName)!;
    }

    if (imageName.startsWith("http")) {
      return imageName;
    }

    // Fallback
    return "";
  };

  // Check if an image name is a URL or a file name
  const isImageUrl = (imageName: string): boolean => {
    return imageName.startsWith("http");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <div>
          <Typography variant="24px/800/32.78px">Vehicle Details</Typography>
          <Typography variant="16px/400/21.86px" className="text-gray-500">
            Please provide the details of your vehicle(s).
          </Typography>
        </div>

        {toastMessage && (
          <div
            className={`p-3 rounded-md ${
              toastMessage.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {toastMessage.message}
          </div>
        )}

        {/* Vehicle Details Section */}
        {watchedVehicles.map((_, index) => (
          <div
            key={index}
            className="border-2 border-[#ff7125] rounded-lg p-4 mb-4 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <Typography variant="18px/600/24.59px">
                Vehicle {index + 1}
              </Typography>
              {watchedVehicles.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeVehicle(index)}
                  className="text-accent"
                >
                  <DeleteIcon className="mr-1" /> Remove
                </Button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Vehicle Type */}
              <FormField
                control={control}
                name={`vehicles.${index}.vehicleType`}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger smallLabel="Vehicle Type">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(VehicleType).map((type: string) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vehicle Make (Model) */}
              <FormField
                control={control}
                name={`vehicles.${index}.model`}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger smallLabel="Vehicle Make">
                          <SelectValue placeholder="Select vehicle make" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(VehicleCompany).map((type: string) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sitting Capacity */}
              <FormField
                control={control}
                name={`vehicles.${index}.sittingCapacity`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        smallLabel="Sitting Capacity"
                        placeholder="Enter Sitting Capacity"
                        type="number"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Model Number / Year of Manufacture */}
              <FormField
                control={control}
                name={`vehicles.${index}.modelNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        smallLabel="Year of Manufacture"
                        placeholder="Enter year"
                        type="number"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Plate Number */}
              <FormField
                control={control}
                name={`vehicles.${index}.plateNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        smallLabel="Plate Number"
                        placeholder="ABC-1234"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* License Number */}
              <FormField
                control={control}
                name={`vehicles.${index}.licenseNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        smallLabel="License Number"
                        placeholder="AXX-1234567890123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Car Color */}
              <FormField
                control={control}
                name={`vehicles.${index}.color`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        smallLabel="Color"
                        placeholder="Enter color"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Car Registration Number */}
              <FormField
                control={control}
                name={`vehicles.${index}.carRegistrationNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        smallLabel="Car Registration Number"
                        placeholder="ABC-4587"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vehicle Images */}
              <FormField
                control={control}
                name={`vehicles.${index}.vehicleImages`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <div className="flex flex-col ">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-sm transition-shadow">
                          <div className="bg-gray-100 p-4 rounded-full mb-3">
                            <UploadIcon className="text-gray-500 w-6 h-6" />
                          </div>

                          <p className="text-gray-800 font-medium mb-1 text-center">
                            Upload your file here
                          </p>
                          <p className="text-gray-500 text-sm mb-4 text-center">
                            Please upload images of your vehicle
                          </p>
                          <label
                            className="relative inline-block rounded-md bg-accent py-2 px-5  cursor-pointer hover:bg-[linear-gradient(0deg,_rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_linear-gradient(0deg,_#FF7125,_#FF7125)]
"
                          >
                            <span className=" text-white text-sm font-semibold cursor-pointer  transition-colors">
                              Upload
                            </span>
                            <Input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, index)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </label>
                          <p className="text-gray-400 text-xs mt-4 text-center">
                            Maximum file size: 4 MB
                          </p>
                        </div>

                        {/* Image preview section */}
                        {field.value && field.value.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 gap-5">
                            {field.value.map((imageName, imgIndex) => {
                              const previewUrl = getImagePreview(
                                imageName,
                                index
                              );
                              return (
                                <div key={imgIndex} className="relative group">
                                  <div className=" rounded overflow-hidden border-[2px] border-[#ff7125] border-dashed">
                                    {previewUrl ? (
                                      <img
                                        src={previewUrl}
                                        alt={`Vehicle ${index + 1} image ${
                                          imgIndex + 1
                                        }`}
                                        className="w-full h-32 object-cover"
                                      />
                                    ) : (
                                      <span className="text-xs text-gray-600 text-center p-1">
                                        {imageName}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full !size-1 p-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() =>
                                      handleRemoveImage(imageName, index)
                                    }
                                  >
                                    ✕
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form completion status indicator */}
            {!isVehicleComplete(index) && (
              <div className="mt-4 text-amber-600 text-sm">
                Please complete all required fields for Vehicle {index + 1}.
              </div>
            )}
          </div>
        ))}

        {/* Add More Vehicle Button */}
        <div className="flex justify-center items-center ">
        <Button
          type="button"
          variant="link"
          onClick={addVehicle}
          className="flex items-center justify-center gap-2"
        >
           Add Another Vehicle
        </Button>

        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="ghost"
            className="text-accent"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
