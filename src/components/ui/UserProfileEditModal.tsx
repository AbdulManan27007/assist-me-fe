"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GetUser } from "@/store/type";
import Image from "next/image";
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
import { useUpdateUserMutation, useUploadFileMutation } from "@/store/users/userApi";
import { CameraIcon } from "@/icons";
import { CircularProgress } from "@mui/material";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GetUser | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function UserProfileEditModal({ isOpen, onClose, user, onSuccess, onError }: UserModalProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>(
    user?.picture || "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
  );
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [updateUser] = useUpdateUserMutation();
  const [updatedFields, setUpdatedFields] = useState<Partial<GetUser>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadUserImage] = useUploadFileMutation();

  const UserSchema = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
  }).refine((data) => {
    const changedFields = Object.entries(data).filter(([field, value]) => 
      updatedFields.hasOwnProperty(field)
    );
    
    if (changedFields.length === 0) return true;
  
    for (const [field, value] of changedFields) {
      if (!value) continue;
      switch (field) {
        case 'name':
          if (value.length < 2) return false;
          break;
        case 'username':
          if (value.length < 2) return false;
          break;
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;
          break;
        case 'phone':
          if (value.length < 10) return false;
          break;
        case 'city':
        case 'address':
          if (value.length < 3) return false;
          break;
      }
    }
    return true;
  }, {
    message: "Please check the validation requirements for changed fields",
    path: ["updatedFields"]
  });

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      city: user?.city || "",
      address: user?.address || "",
    },
    mode: "onChange",
    context: { updatedFields }
  });

  const { handleSubmit, setValue, formState } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedImageFile(file);
    
    const previewUrl = URL.createObjectURL(file);
    setPreviewImageUrl(previewUrl);
    
    setUpdatedFields(prev => ({ ...prev, imageChanged: true }));
  };

  //   if (!user?.id) {
  //     console.error("User ID is missing.");
  //     return;
  //   }

  //   const changedData = Object.fromEntries(
  //     Object.entries(updatedFields).filter(([field, value]) => 
  //       value !== user[field as keyof GetUser]
  //     )
  //   );

  //   if (Object.keys(changedData).length > 0) {
  //     try {
  //       await updateUser({ 
  //         userId: user.id, 
  //         userDto: changedData 
  //       }).unwrap();
  //       onSuccess?.(); // Call success callback
  //       onClose();
  //     } catch (error) {
  //       onError?.(error); // Call error callback
  //       console.error("Update failed:", error);
  //     }
  //   } else {
  //     onClose();
  //   }
  // };
  const handleSave = async (data: any) => {
    if (!user?.id) {
      console.error("User ID is missing.");
      return;
    }
    setIsLoading(true);

    let finalData: Partial<GetUser> = {};
    
    Object.entries(updatedFields).forEach(([key, value]) => {
      if (key !== 'imageChanged') {
        finalData[key as keyof GetUser] = value as any;
      }
    });
    
    if (selectedImageFile && updatedFields.imageChanged) {
      try {
        const formData = new FormData();
        formData.append("file", selectedImageFile);
        const response = await uploadUserImage(formData).unwrap();
        
        finalData.picture = response.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        onError?.(error);
        return;
      }
    }

    if (Object.keys(finalData).length > 0) {
      try {
        await updateUser({ 
          userId: user.id, 
          userDto: finalData 
        }).unwrap();
        onSuccess?.();
        onClose();
      } catch (error) {
        onError?.(error);
        console.error("Update failed:", error);
      }
    } else {
      onClose();
    }
    setIsLoading(false);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogTitle>Edit Profile</DialogTitle>

        <div className="w-full p-4 md:p-8 grid gap-8 border border-[#0000001A] rounded-[12px]">

          <div className="relative w-fit mx-auto md:mx-0">
          <Image
            priority
            src={previewImageUrl}
            alt="user avatar"
            width={140}
            height={140}
            className="rounded-full w-[140px] h-[140px]"
          />
            <label className="cursor-pointer absolute bottom-1 right-1 p-2.5 grid place-items-center rounded-full bg-accent border-4 border-white">
              <input type="file" className="hidden" onChange={handleImageChange} />
              <CameraIcon />
            </label>
          </div>

          {/* <Form {...form}>
        <form onSubmit={handleSubmit(handleSave)} className="grid gap-6">
          {(["name", "username", "email", "phone", "address", "city"] as const).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field: formField }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      full
                      smallLabel={field.charAt(0).toUpperCase() + field.slice(1)}
                      placeholder={`Enter your ${field}`}
                      disabled={field === "username" || field === "email"}
                      {...formField}
                      onChange={(e) => {
                        const value = e.target.value;
                        formField.onChange(value);

                        // Only track fields that have been changed from their original value
                        setUpdatedFields((prev) => {
                          const newFields = { ...prev };
                          if (value !== user?.[field]) {
                            newFields[field] = value;
                          } else {
                            delete newFields[field];
                          }
                          return newFields;
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          
          <Button 
            className="w-fit justify-self-end p-[13px_32px]" 
            type="submit" 
            disabled={Object.keys(updatedFields).length === 0 || isLoading}
          >
            {isLoading?  <CircularProgress color="inherit" /> : "Save"}
          </Button>
        </form>
          </Form> */}
          <Form {...form}>
            <form onSubmit={handleSubmit(handleSave)} className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(["name", "username", "email", "phone", "address", "city"] as const).map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: formField }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            full
                            smallLabel={field.charAt(0).toUpperCase() + field.slice(1)}
                            placeholder={`Enter your ${field}`}
                            disabled={field === "username" || field === "email"}
                            {...formField}
                            onChange={(e) => {
                              const value = e.target.value;
                              formField.onChange(value);

                              setUpdatedFields((prev) => {
                                const newFields = { ...prev };
                                if (value !== user?.[field]) {
                                  newFields[field] = value;
                                } else {
                                  delete newFields[field];
                                }
                                return newFields;
                              });
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button 
                  className="w-fit justify-self-end p-[13px_32px]" 
                  type="submit" 
                  disabled={Object.keys(updatedFields).length === 0 || isLoading}
                  >
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
