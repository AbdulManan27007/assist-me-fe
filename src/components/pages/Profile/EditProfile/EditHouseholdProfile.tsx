import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "@/components/ui/toast";
import { useUpdateUserMutation } from "@/store/users/updateuserApi";
import { useGetUserQuery } from "@/store/users/userdataApi";
import { useGlobalContext } from "@/globalContext/globalContext";
import { HouseholdType, OwnershipStatus } from "@/globalContext/globalContext";

const FormSchema = z.object({
  type: z
    .string({ required_error: "Please select your type." })
    .min(1, "Please select your type."),
  status: z
    .string({ required_error: "Please select your ownership status." })
    .min(1, "Please select your ownership status."),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
});

export function EditHouseholdProfile() {
  const { user } = useGlobalContext();
  const userId = user?.id || "";
  console.log("_____--userId", userId);
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      status: "",
      bio: "",
    },
  });

  // Populate the form with existing bio data
  useEffect(() => {
    if (userData) {
      form.setValue("bio", userData.bio || "");
      form.setValue("type", userData.type || "");
      form.setValue("status", userData.status || "");
    }
  }, [userData, form]);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Update the user data
      await updateUser({
        userId,
        userData: { ...data },
      }).unwrap();
      setToast({ message: "Profile updated successfully", type: "success" });
    } catch (error) {
      console.error("Failed to update profile:", error);
      setToast({ message: "Failed to update profile", type: "error" });
    }
  };

  return (
    <div className="p-8 grid gap-8 content-start border border-[#0000001A] rounded-[12px]">
      <Typography variant="24px/800/32.78px" className="text-black-1">
        Household Profile
      </Typography>
      <Form {...form}>
      {toast && <Toast message={toast.message} type={toast.type} />}
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger smallLabel="Bussiness Type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(HouseholdType).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger smallLabel="Categories of work">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(OwnershipStatus).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    smallLabel={"Bio"}
                    className="w-full rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Tell us about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-fit justify-self-end p-[13px_32px]"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
