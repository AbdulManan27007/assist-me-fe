import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useNewListingContext } from "../newListingContext";
import {
  InPerson,
  Remote,
  Hire,
  ServiceType,
} from "@/globalContext/globalContext";
import { useEffect } from "react";

const FormSchema = z.object({
  service_type: z.string().min(1, "Service Type is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
});

export function CategoryTags() {
  const { services, nextStep, setListingData, prevStep } =
    useNewListingContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      service_type: services?.service_type || "",
      category: services?.category || "",
      tags: services?.tags || [],
    },
  });

  useEffect(() => {
    if (services) {
      form.setValue("service_type", services.service_type || "");
      form.setValue("category", services.category || "");
      form.setValue("tags", services.tags || []);
    }
  }, [services, form]);

  // Reset category if service_type changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "service_type") {
        form.setValue("category", ""); // Reset category
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };

  const categoryMap = {
    [ServiceType.InPerson]: InPerson,
    [ServiceType.Remote]: Remote,
    [ServiceType.Hire]: Hire,
  };

  const selectedType = form.watch("service_type") as ServiceType;
  const categoryOptions = selectedType
    ? Object.values(categoryMap[selectedType] || {})
    : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <div className="grid gap-2">
          <div className="gap-2">
            <Typography variant="24px/800/32.78px">Category & Tags</Typography>
            <Typography variant="16px/400/21.86px" className="text-gray-500">
              Please select your service type & category and tags.
            </Typography>
          </div>
          <Typography variant="16px/500/24px">Service Type</Typography>
          {/* Service Type */}
          <FormField
            control={form.control}
            name="service_type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Service Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ServiceType).map((type) => (
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
        </div>

        {/* Category */}
        <div className="grid gap-2">
          <Typography variant="16px/500/24px">Service Category</Typography>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((category) => (
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
        </div>

        {/* Tags */}
        <div className="grid gap-2">
          <Typography variant="16px/500/24px">Service Tags</Typography>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TagsInput
                    value={field.value || []}
                    onChange={(tags: string[]) => {
                      field.onChange(tags);
                    }}
                    name="tags"
                    placeHolder="Enter tags"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
