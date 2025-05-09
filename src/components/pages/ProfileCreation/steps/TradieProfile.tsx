"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useProfileCreationContext } from "../profileCreationContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SearchIcon } from "@/icons";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  categories: z.array(
    z.string({ required_error: "Please select an category." })
  ),
});

export const TradieProfile = () => {
  const { nextStep, setData } = useProfileCreationContext();

  const [search, setSearch] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setData(data);
    nextStep();
  };

  return (
    <div className="grid gap-8 p-8 max-w-[994px] w-full">
      <div className="grid gap-4">
        <Typography
          variant="32px/700/43.71px"
          className="text-black-1 text-center"
        >
          Let’s create your Tradie profile
        </Typography>
        <Typography
          variant="16px/400/21.86px"
          className="text-black-3 text-center"
        >
          What categories of work are you interested in doing?
        </Typography>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        icon={<SearchIcon />}
        className="max-w-[417px] mx-auto"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          <div className="relative after:pointer-events-none after:absolute after:bottom-0 after:inset-x-0 after:h-[128px] after:bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0)_0%,_#FFFFFF_100%)]">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4 max-h-[250px] overflow-y-auto scrollable pr-[16px] pb-[calc(128px/2)]">
                      {categories.map((category) => (
                        <FormItem key={category}>
                          <div className="border border-[#0000001A] rounded-full py-4 px-6 flex gap-2 w-full items-center flex-1">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(category)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, category]);
                                  } else {
                                    field.onChange(
                                      field.value.filter((c) => c !== category)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="flex-1">
                              <Typography
                                variant="16px/700/21.86px"
                                className="text-center"
                              >
                                {category}
                              </Typography>
                            </FormLabel>
                          </div>
                        </FormItem>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
};

const categories = [
  "Accounting",
  "Admin",
  "Alterations",
  "Appliances",
  "Architect",
  "Assembly",
  "Audio Visual",
  "Auto Electrician",
  "Bricklayer",
  "Building & Construction",
  "Business",
  "Car Wash",
  "Carpentry",
  "Carpet Cleaning",
  "Catering",
];
