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
import { Textarea } from "@/components/ui/textarea";
import { useNewListingContext } from "../newListingContext";
import { useEffect } from "react";

const FormSchema = z.object({
  price_type: z.string().min(1, "Package Name is required"),
  price_description: z.string().min(1, "Description is required"),
  price: z.preprocess(
    (val) => Number(val), // Convert to number
    z.number().min(1, "Price is required")
  ),
});

export function Pricing() {
  const { services, nextStep, setListingData, prevStep } =
    useNewListingContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      price_type: services?.price_type || "",
      price_description: services?.price_description || "",
      price: services?.price,
    },
  });

  // Update form when listing data changes
  useEffect(() => {
    if (services) {
      form.setValue("price_type", services.price_type || "");
      form.setValue("price_description", services.price_description || "");
      if (services.price !== undefined) {
        form.setValue("price", services.price);
      }
    }
    console.log(services.price);
  }, [services, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        {/* <Typography variant="24px/800/32.78px">Pricing</Typography> */}

        {/* Package Name */}
        <FormField
          control={form.control}
          name="price_type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  smallLabel="Package Name"
                  placeholder="Enter Package Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="price_description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="w-full"
                  smallLabel="Description"
                  placeholder="Enter Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  smallLabel="Price You’re Willing to Pay"
                  placeholder="A$ 0.00"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="grid gap-5">
          <Button type="submit">Continue</Button>
          <Button
            type="button"
            variant="ghost"
            className="text-accent"
            onClick={prevStep}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
