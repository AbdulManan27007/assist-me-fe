import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar-custom-tradies";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import  UploadIcon  from "@/icons/UploadIcon";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useGlobalContext } from "@/globalContext/globalContext";

const FormSchema = z.object({
  category: z
    .string({ required_error: "Please select your category." })
    .min(1, "Please select your category."),
  experience: z
    .string({ required_error: "Please type your experience." })
    .min(1, "Please type your experience."),
  business: z
    .string({ required_error: "Please enter your business." })
    .min(3, "Business must be at least 3 characters long"),
  location: z
    .string({ required_error: "Please enter your location." })
    .min(3, "Location must be at least 3 characters long"),
});

export function EditTradieProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useGlobalContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: user?.categoriesHired?.[0]?.title || "", // Fallback to an empty string if undefined or empty
      experience: user?.tradieExperience || "", // Fallback to an empty string if undefined
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  if (!user) return null;

  return (
    <div className="p-8 mob:p-4 grid gap-8 content-start border border-[#0000001A] rounded-[12px]">
      <Typography variant="24px/800/32.78px" className="text-black-1">
        Tradie Profile
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    full
                    smallLabel="Business name"
                    placeholder="Your business name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger smallLabel="Categories of work">
                      <SelectValue placeholder="Accounting, Accounting, Accounting" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {user.categoriesHired?.map(
                      (
                        { id, title } // Optional chaining here as well
                      ) => (
                        <SelectItem key={id} value={title}>
                          {title}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    full
                    smallLabel="Location"
                    placeholder="Your location"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    smallLabel="Your experience"
                    placeholder="Write about your experience in your field..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Typography variant="18px/700/24.59px" className="text-black-3">
            Portfolio
            </Typography>
            <div className="border-dashed bg-[#F8F8F8] rounded-[8px] border-2 border-gray-300  flex flex-col items-center justify-center cursor-pointer gap-2 py-[40px]">
              <UploadIcon className="w-8 h-8 text-gray-400" />
              <Typography
                variant="16px/400/21.86px"
                className="text-gray-500 px-[90px] mob:px-3 text-center"
              >
                Drag and drop your media and pictures or{" "}
                <span className="text-[#FF7125] font-bold cursor-pointer">
                  click here
                </span>{" "}
                to upload
              </Typography>
            </div>
          </div>

         {/* Availability Button to Open Modal */}
      <span className="flex justify-end cursor-pointer">
        <Typography
          variant="16px/700/21.86px"
          className="text-[#FF7125]"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Availability
        </Typography>
      </span>

      {/* Availability Modal */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full max-w-[741px] flex flex-col">
            <Typography variant="24px/800/32.78px" className="text-black-1">
              Availability
            </Typography>
            <Calendar />
            <Button className="" onClick={() => setIsModalOpen(false)}>
              Save
            </Button>
          </DialogContent>
        </Dialog>
      )}
          <Button
            className="w-fit justify-self-end p-[13px_32px]"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
