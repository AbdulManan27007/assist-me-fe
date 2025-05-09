"use client";
import { z } from "zod";
import { useState } from "react";
import Toast from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { Governance } from "@/components/core/Governance";
import { useRouter, useSearchParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { useResetPasswordMutation } from "@/store/api/auth/resetPassword";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z
  .object({
    password: z
      .string({ required_error: "Please type your password." })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function PasswordReset() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setErrorMessage("");
    setSuccessMessage("");

    const email = localStorage.getItem("resetEmail");
    const token = localStorage.getItem("resetToken");

    if (!email || !token) {
      setErrorMessage("Invalid or missing reset credentials.");
      return;
    }

    try {
      const response = await resetPassword({
        email,
        token,
        newPassword: data.password,
      }).unwrap();

      if (response.success) {
        setSuccessMessage(
          response.message || "Password reset successfully. Please login."
        );

        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetToken");

        setTimeout(() => {
          setSuccessMessage("");
          router.push("/sign-in");
        }, 3000);
      } else {
        setErrorMessage(response.message || "Something went wrong.");
      }
    } catch (err: any) {
      console.error("Reset error:", err);
      const msg =
        err?.data?.message || err?.message || "Failed to reset password.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  return (
    <div className="grid justify-center grid-rows-[1fr_auto] justify-items-center items-start md:items-center h-full flex-1">
      <div className="grid gap-8 p-8 max-w-[481px] w-full">
        <div className="grid gap-4">
          <Typography
            variant="32px/700/43.71px"
            className="text-black-1 text-center"
          >
            Reset your password
          </Typography>
          <Typography
            variant="16px/400/21.86px"
            className="text-black-5 text-center"
          >
            Create a new password to your account
          </Typography>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      smallLabel="Password"
                      placeholder="********"
                      type="password"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      smallLabel="Confirm Password"
                      placeholder="********"
                      type="password"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Reset Password"
              )}
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
      <Governance />
    </div>
  );
}
