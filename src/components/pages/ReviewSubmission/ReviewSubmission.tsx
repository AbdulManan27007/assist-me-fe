"use client";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useState } from "react";
import  UploadIcon  from "@/icons/UploadIcon";
import Rating from "@mui/material/Rating";
import { useGlobalContext } from "@/globalContext/globalContext";


const FormSchema = z.object({
  review: z.string().min(10, "Please write a detailed review."),
  media: z.any().optional(),
});

export function ReviewSubmission() {
  const { user } = useGlobalContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      review: "",
      media: null,
    },
  });

  const [rating, setRating] = useState(0);
  const handleRating = (index: any) => setRating(index);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log({ ...data, rating });
  };

  return (
    <div className="max-w-[600px] w-full mx-auto py-12 px-8 relative grid gap-6">
      <div className="grid gap-6 w-full mx-auto text-center">
        <Typography variant="32px/700/43.71px" className="text-black-1">
          Review {user?.role === "household" ? "Tradie" : "Household"}
        </Typography>
        <Typography variant="14px/400/21px" className="text-black-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo,
          suscipit eget elit porttitor, volutpat consequat turpis. In interdum
          mauris et urna maximus.
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Typography className="text-black-3" variant="18px/700/24.59px">
              Rating
            </Typography>
            <Rating />
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="text-black-3" variant="18px/700/24.59px">
              Review
            </Typography>

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="18px/700/24.59px" className="text-black-3">
              Media and Pictures (Optional)
            </Typography>
            <div className="border-dashed rounded-[8px] border-2 border-gray-300 p-6 flex flex-col items-center justify-center cursor-pointer gap-2 py-[51px]">
              <UploadIcon className="w-8 h-8 text-gray-400" />
              <Typography variant="16px/400/21.86px" className="text-gray-500 px-[90px] text-center">
                Drag and drop your media and pictures or{" "}
                <span className="text-[#FF7125] font-bold cursor-pointer">click here</span>{" "}
                to upload
              </Typography>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-orange-500 text-white w-full mt-4"
          >
            Review {user?.role === "household" ? "Tradie" : "Household"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
