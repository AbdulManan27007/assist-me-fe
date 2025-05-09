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
import { useNewListingContext } from "../newListingContext";

const FormSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
});

export function ContactInformation() {
  const { services, nextStep, setListingData } = useNewListingContext(); // Use services instead of listing
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: services?.email || "",  // Updated
      phone: services?.phone || "",  // Updated
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <Typography variant="24px/800/32.78px">Contact Information</Typography>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  smallLabel="Email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  smallLabel="Phone"
                  placeholder="04XX XXX XXX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
