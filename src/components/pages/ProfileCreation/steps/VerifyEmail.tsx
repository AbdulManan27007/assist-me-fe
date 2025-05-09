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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import verifyEmailImg from "@/assets/verifyEmail.svg";
import { Typography } from "@/components/core/Typography";
import { useEffectOnMount } from "@/lib/useEffectOnMount";
import { useProfileCreationContext } from "../profileCreationContext";

const FormSchema = z.object({
  pin: z.string({ required_error: "Please type your pin." }),
});

export const VerifyEmail = () => {
  const { data, createProfile } = useProfileCreationContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffectOnMount(() => {
    const id = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("id"))
      ?.split("=")
      .at(-1);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/pin/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  });

  const onSubmit = ({ pin }: z.infer<typeof FormSchema>) => {
    const email = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("email"))
      ?.split("=")
      .at(-1);

    const id = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("id"))
      ?.split("=")
      .at(-1);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pin, email }),
    })
      .then((res) => res.json())
      .then(() => createProfile().then(() => router.push("/profile")))
      .catch((error) => console.error("Error:", error));
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
          Welcome to Golalo
        </Typography>
        <Typography
          variant="16px/400/21.86px"
          className="text-black-5 text-center"
        >
          We sent you a message to your email with a{" "}
          <span className="font-bold text-black-1">
            code to verify your email
          </span>
          . Please check your inbox and spam folder and insert the code below
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Verify</Button>
        </form>
      </Form>
    </div>
  );
};
