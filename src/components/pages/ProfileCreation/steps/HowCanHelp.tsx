"use client";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useProfileCreationContext } from "../profileCreationContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/globalContext/globalContext";

const FormSchema = z.object({
  role: z.string({ required_error: "Please choose an option." }),
});

export const HowCanHelp = () => {
  const { nextStep, setData } = useProfileCreationContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setData(data);
    nextStep();
  };

  const options = [
    {
      value: UserRole.Tradie,
      label: "I want to work as a tradie",
    },
    {
      value: UserRole.Household,
      label: "I want to hire tradie services for my household",
    },
  ];

  return (
    <div className="grid gap-8 p-8 max-w-[584px] w-full">
      <Typography
        variant="32px/700/43.71px"
        className="text-black-1 text-center"
      >
        How can Golalo help you?
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-4"
                  >
                    {options.map((option) => (
                      <FormItem key={option.value}>
                        <div className="border border-[#0000001A] rounded-full py-4 px-6 flex gap-2 w-full items-center flex-1">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="flex-1">
                            <Typography
                              variant="16px/700/21.86px"
                              className="text-center"
                            >
                              {option.label}
                            </Typography>
                          </FormLabel>
                        </div>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
};
