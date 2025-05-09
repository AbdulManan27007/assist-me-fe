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
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";

const FormSchema = z
  .object({
    current_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine(
    (data) => {
      return data.current_password !== data.new_password;
    },
    {
      message: "New password must be different from the current password",
      path: ["new_password"],
    }
  );

export function ChangePassword() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="grid gap-8 p-6 border border-gray-200 rounded-xl ">
      <Typography variant="24px/800/32.78px">Change Password</Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full"
                    smallLabel="Current Password"
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full"
                    smallLabel="New Password"
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
