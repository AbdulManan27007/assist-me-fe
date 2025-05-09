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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/core/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewListingContext } from "../newListingContext";

// Define the schema
const FormSchema = z.object({
  experience: z
    .string()
    .min(1, "Experience is required")
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" }),
  certified: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Please select certification status" }),
  }),
});

export function ProfessionalInformation() {
  const { listing, nextStep, setListingData, prevStep } = useNewListingContext();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      experience: listing?.experience?.toString() || "",
      certified: listing?.certified === "Yes" || listing?.certified === "No" ? listing.certified : undefined,
    },
  });
  
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const updatedData = {
      ...listing,
      experience: Number(data.experience),
      certified: data.certified, // Store as string to match the state type
    };
    
    setListingData(updatedData);
    nextStep();
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-12">
        <div className="grid gap-5">
          <div>
          <Typography variant="24px/800/32.78px">
            Professional Information
          </Typography>
          <Typography variant="16px/400/21.86px" className="text-gray-500">
            Please provide the your professional information.
          </Typography>
          </div>
          {/* Experience Field */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    full
                    smallLabel="Years of Experience"
                    placeholder="e.g, 5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Certified Field */}
          <FormField
            control={form.control}
            name="certified"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger smallLabel="Certified">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="mt-2">
          Continue
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="text-accent"
          onClick={prevStep}
        >
          Back
        </Button>
      </form>
    </Form>
  );
}