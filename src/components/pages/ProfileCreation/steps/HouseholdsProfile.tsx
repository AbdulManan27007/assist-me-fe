import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import {
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import verifyEmailImg from "@/assets/verifyEmail.svg";
import { Typography } from "@/components/core/Typography";
import { useProfileCreationContext } from "../profileCreationContext";
import { HouseholdType, OwnershipStatus } from "@/globalContext/globalContext";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  type: z
    .string({ required_error: "Please select your type." })
    .min(1, "Please select your type."),
  status: z
    .string({ required_error: "Please select your ownership status." })
    .min(1, "Please select your ownership status."),
});

export function HouseholdsProfile() {
  const router = useRouter();
  const { data, is_verified, nextStep, setData, createProfile } = useProfileCreationContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      status: "",
    },
  });

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    console.log(formData);
    setData(formData);
    is_verified
      ? createProfile().then(() => router.push("/profile"))
      : nextStep();
  };

  return (
    <div className="grid gap-8 p-8 max-w-[584px] w-full">
      <Image
        priority
        src={verifyEmailImg.src}
        alt="Verify email image"
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="grid gap-4">
        <Typography
          variant="32px/700/43.71px"
          className="text-black-1 text-center"
        >
          Let’s create your Household’s profile
        </Typography>
        <Typography
          variant="16px/400/21.86px"
          className="text-black-5 text-center"
        >
          We want to get to know your household a bit more to personalize your
          experience
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger smallLabel="Household Type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(HouseholdType).map((category) => (
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

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger smallLabel="Property Ownership Status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(OwnershipStatus).map((category) => (
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

          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
}
