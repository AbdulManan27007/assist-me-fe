"use client";
import Image from "next/image";
import { z } from "zod";
import emailCheck from "@/assets/emailCheck.svg";
import { Typography } from "@/components/core/Typography";
import { Governance } from "@/components/core/Governance";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
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
import { useState, useEffect } from "react";
import Toast from "@/components/ui/toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useForgotPasswordOTPMutation } from "../../../store/api/auth/forgotpasswordOTP";
import { useForgotPasswordMutation } from "../../../store/api/auth/forgotPassword";

const FormSchema = z.object({
  pin: z
    .string({ required_error: "Please type your pin." })
    .min(5, "PIN must be 5 digits"),
});

export function ResetComplete() {
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [verifyAccount, { isLoading, isSuccess, isError, error }] =
    useForgotPasswordOTPMutation();
  const [resendOTP, { isLoading: isResending }] = useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("Email verified successfully");
      setTimeout(() => {
        setSuccessMessage("");
        router.push("/reset-password");
      }, 2000);
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError && error && "data" in error) {
      // Customize based on your backend error shape
      const errData = error as any;
      setErrorMessage(errData.data?.message || "Verification failed.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  }, [isError, error]);

  const onSubmit = async ({ pin }: z.infer<typeof FormSchema>) => {
    if (pin.length !== 5) {
      setPinErrorMessage("Please type your pin.");
      return;
    }

    setPinErrorMessage("");
    setErrorMessage("");
    setSuccessMessage("");

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      setErrorMessage("Email not found. Please try again.");
      return;
    }

    try {
      const response = await verifyAccount({ code: pin, email }).unwrap();
      if (response?.data?.token) {
        localStorage.setItem("resetToken", response.data.token);
      }
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  const handleResendOTP = async () => {
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      setErrorMessage("Email not found. Please sign up again.");
      return;
    }

    try {
      const response = await resendOTP({ email }).unwrap();
      if (response?.message) {
        setSuccessMessage(response.message);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err: any) {
      console.error("Resend OTP error:", err);

      const backendMessage =
        err?.data?.message || "Failed to resend verification email.";
      setErrorMessage(backendMessage);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="grid justify-center grid-rows-[1fr_auto] justify-items-center items-start md:items-center h-full flex-1">
      <div className="grid gap-6 p-12 max-w-[483px] w-full justify-center items-center mx-auto">
        <div className="mx-auto">
          <Image
            priority
            src={emailCheck.src}
            alt="email"
            width={200}
            height={200}
          />
        </div>
        <div className="grid gap-4">
          <Typography
            variant="32px/700/43.71px"
            className="text-black-1 text-center"
          >
            Check your email
          </Typography>
          <Typography
            variant="16px/400/21.86px"
            className="text-black-5 text-center [&>span]:font-bold [&>span]:text-black-5"
          >
            We sent you <span>email with a OTP code</span>. Please check your
            inbox and spam folder and insert the code below
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
                    <InputOTP maxLength={5} {...field}>
                      <InputOTPGroup className="flex gap-[10px] sm:gap-4 justify-between sm:justify-center mx-auto">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-1/6 min-w-[35px]"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {pinErrorMessage && (
              <Typography className="text-destructive">
                {pinErrorMessage}
              </Typography>
            )}
            {errorMessage && <Toast message={errorMessage} type="error" />}
            {successMessage && (
              <Toast message={successMessage} type="success" duration={3000} />
            )}
            <div className="px-6 py-[1px] text-center">
              <Typography variant="14px/400/19.12px" className="text-black-1">
                Didn’t receive the code?{" "}
              </Typography>
              <Typography
                variant="14px/700/19.12px"
                onClick={!isResending ? handleResendOTP : undefined}
                className={`text-primary cursor-pointer hover:underline ${
                  isResending && "opacity-50 pointer-events-none"
                }`}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </Typography>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <Governance />
    </div>
  );
}
