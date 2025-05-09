import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import DragAndDrop from "@/components/ui/DragAndDrop";
import { Typography } from "@/components/core/Typography";
import { useProfileCreationContext } from "../profileCreationContext";

const FormSchema = z.object({
  picture: z.string().min(1, { message: "Please upload a picture." }),
});

export const Picture = () => {
  const { nextStep, setData } = useProfileCreationContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setData(data);
    nextStep();
  };

  const handleSkip = () => {
    nextStep();
  };

  return (
    <div className="grid gap-8 p-8 max-w-[584px] w-full">
      <div className="grid gap-4">
        <Typography
          variant="32px/700/43.71px"
          className="text-black-1 text-center"
        >
          Profile Picture
        </Typography>
        <Typography
          variant="16px/400/21.86px"
          className="text-black-5 text-center"
        >
          Would you like to add a profile picture?
        </Typography>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DragAndDrop {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-6">
            <Button type="submit">Continue</Button>
            <Button variant="ghost" size="ghost" onClick={handleSkip}>
              Skip for now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
