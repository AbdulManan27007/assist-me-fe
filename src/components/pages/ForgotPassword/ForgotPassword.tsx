"use client";
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
import { Governance } from "@/components/core/Governance";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/store/api/auth/forgotPassword";

const FormSchema = z.object({
  email: z.string({ required_error: "Please type your email." }).email(),
});

export function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (errorMessage) setErrorMessage("");

    try {
      await forgotPassword(data).unwrap();
      localStorage.setItem("resetEmail", data.email);
      setSuccessMessage("Password reset email sent");
      setTimeout(() => {
        setSuccessMessage("");
        router.push("/reset-complete");
      }, 3000);
    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Some error occurred.");
      console.error("Error:", error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <div className="grid gap-8 p-8 max-w-[481px] w-full flex-grow items-start md:items-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Typography
              variant="32px/700/43.71px"
              className="text-black-1 text-center"
            >
              Forgot password
            </Typography>
            <Typography
              variant="16px/400/21.86px"
              className="text-black-5 text-center"
            >
              Please provide your registered email below and we will send you
              an email with OTP to reset your password
            </Typography>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        smallLabel="Email"
                        placeholder="email@example.com"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : "Continue"}
              </Button>

              {errorMessage && (
                <Toast message={errorMessage} type="error" duration={4000} />
              )}
              {successMessage && (
                <Toast message={successMessage} type="success" duration={4000} />
              )}
            </form>
          </Form>
        </div>
      </div>
      <Governance />
    </div>
  );
}
