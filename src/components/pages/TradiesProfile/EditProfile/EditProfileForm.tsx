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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useGlobalContext } from "@/globalContext/globalContext";
import { useGetUserQuery } from "@/store/users/userdataApi";
import { useUpdateUserMutation } from "@/store/users/updateuserApi";
import { useUploadFileMutation } from "@/store/listings/listingsApi";
import { useEffect, useState } from "react";
import Toast from "@/components/ui/toast";
import Image from "next/image";
import { CameraIcon } from "@/icons";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Please type a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  city: z.string().min(3, "City must be at least 3 characters long"),
  address: z.string().min(3, "Address must be at least 3 characters long"),
});

export function EditProfileForm() {
    const { user } = useGlobalContext();
    const userId = user?.id || "";
  
    const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId, {
      skip: !userId,
    });
  
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [uploadFile] = useUploadFileMutation();
  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        city: "",
      },
    });
  
    const [toast, setToast] = useState<{
      message: string;
      type: "success" | "error";
    } | null>(null);
    const [userImage, setUserImage] = useState<string>("/default-avatar.png");
  
    useEffect(() => {
      if (userData) {
        form.reset({
          name: userData.name || "",
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          // bio: userData.bio || "",
        });
        setUserImage(userData.picture || "/default-avatar.png");
      }
    }, [userData, form]);
  
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      try {
        await updateUser({
          userId,
          userData: { ...data, picture: userImage },
        }).unwrap();
        setToast({
          message: "Your profile has been updated successfully!",
          type: "success",
        });
      } catch (error) {
        console.error("Update failed:", error);
        setToast({
          message: "Something went wrong! Please try again.",
          type: "error",
        });
      }
    };
  
    const handleImageChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await uploadFile(formData).unwrap();
        if (response?.url) {
          setUserImage(response.url);
          // console.log("Uploaded Image URL:", response.url);
        }
      } catch (error) {
        console.error("File upload failed:", error);
      }
    };
  
    if (isUserLoading) return <p>Loading user data...</p>;
  return (
    <>
    {toast && <Toast message={toast.message} type={toast.type} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* Profile Picture Upload */}
          <div className="relative w-fit">
            <Image
              priority
              src={userImage}
              alt="User avatar"
              width={240}
              height={240}
              className="rounded-full w-[240px] h-[240px]"
            />
            <label className="cursor-pointer absolute bottom-1 right-1 p-2.5 grid place-items-center rounded-full bg-accent border-4 border-white">
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <CameraIcon />
            </label>
          </div>

          {/* Form Fields */}
          {["name", "username", "email", "phone", "address", "city"].map(
            (fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof z.infer<typeof FormSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        full
                        smallLabel={
                          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                        }
                        placeholder={`Your ${fieldName}`}
                        // disabled={
                        //   fieldName === "username" || fieldName === "email"
                        // }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}

          <div className="px-6 py-[1.5px]">
            <Typography variant="14px/500/19.12px" className="text-black-1">
              This information won’t be public
            </Typography>
          </div>

          {/* Submit Button */}
          <Button
            className="w-fit justify-self-end p-[13px_32px]"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
}
