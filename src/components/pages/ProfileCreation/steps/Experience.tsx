import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { useProfileCreationContext } from "../profileCreationContext";

const FormSchema = z.object({
  experience: z.string().min(1, "Please type your experience."),
});

export const Experience = () => {
  const { is_verified, data, nextStep, setData, createProfile } =
    useProfileCreationContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      experience: "",
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setData(formData);
    is_verified
      ? createProfile().then(() => router.push("/profile"))
      : nextStep();
  }

  return (
    <div className="grid gap-8 p-8 max-w-[584px] w-full">
      <div className="grid gap-4">
        <Typography
          variant="32px/700/43.71px"
          className="text-black-1 text-center"
        >
          Tell us more about your experience in your field
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write about your experience in your field..."
                    className="h-[208px]"
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
    </div>
  );
};
