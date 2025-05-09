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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useNewListingContext } from "../newListingContext";

const FormSchema = z.object({
  title: z.string().min(1, "Title required"),
  price: z.number().min(0, "Price required"),
  description: z.string().min(1, "Description required"),
});

export function BasicInfo() {
  const { services, nextStep, setListingData } = useNewListingContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: services?.title || "",
      price: services?.price ? Number(services.price) : 0,
      description: services?.description || "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-12">
        <div className="grid gap-5">
          <div>
          <Typography variant="24px/800/32.78px">Basic Information</Typography>
          <Typography variant="16px/400/21.86px" className="text-gray-500">
            Please provide the basic information.
          </Typography>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    full
                    smallLabel="Title"
                    placeholder="Service Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    smallLabel="Description"
                    placeholder="Write about what you need done in this listing as complete as you can..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full"
                    smallLabel="Price of the service"
                    placeholder="A$ 0.00"
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
}
