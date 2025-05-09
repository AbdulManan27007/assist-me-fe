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
import { useProfileCreationContext } from "../profileCreationContext";

const FormSchema = z.object({
  name: z
    .string({ required_error: "Please type your name." })
    .min(2, "Name must be at least 2 characters long"),
  username: z
    .string({ required_error: "Please type your username." })
    .min(2, "Username must be at least 2 characters long"),
  phone: z
    .string({ required_error: "Please type your phone number." })
    .min(10, "Phone number must be at least 10 characters long"),
  city: z
    .string({ required_error: "Please type your city." })
    .min(3, "City must be at least 3 characters long"),
  address: z
    .string({ required_error: "Please type your address." })
    .min(3, "Address must be at least 3 characters long"),
});

export const General = () => {
  const { nextStep, setData } = useProfileCreationContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      city: "",
      address: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setData(data);
    nextStep();
  };
  return (
    <div className="grid gap-8 p-8 max-w-[584px] w-full">
      <div className="grid gap-4">
        <Typography
          variant="32px/700/43.71px"
          className="text-black-1 text-center"
        >
          Welcome to Golalo
        </Typography>
        <Typography
          variant="16px/400/21.86px"
          className="text-black-5 text-center"
        >
          We want to get to know you a bit more to personalize your experience
        </Typography>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 grid-cols-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input smallLabel="Name" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    smallLabel="Username"
                    placeholder="Your username"
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

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input smallLabel="City" placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2 col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      smallLabel="Address"
                      placeholder="Your address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-6 py-[1.5px] ">
              <Typography variant="14px/500/19.12px" className="text-black-1 ">
                This information won’t be public
              </Typography>
            </div>
          </div>

          <Button type="submit" className="col-span-2">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
