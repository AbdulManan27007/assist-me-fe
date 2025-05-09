"use client";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import signUpBg from "@/assets/signUpBg.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/core/Divider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { LoginMethods } from "@/components/core/LoginMethods";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Toast from "@/components/ui/toast";
import { Logo } from "@/icons";
import { useSignupMutation } from "../../../store/api/auth/signup";

// Define the FormSchema using zod
const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    ...registrationData
  }: z.infer<typeof FormSchema>) {
    setLoading(true);
    if (errorMessage) {
      setErrorMessage("");
    }
    const data = { ...registrationData,};

    try {
      // Call the RTK query for signup
      const response = await signup(data).unwrap();

      if (response.success) {
        setSuccessMessage("User registered successfully, Please verify your email.");
        const { id, email } = response.data;
        localStorage.setItem("userEmail", email);

        // Make another call to pin verification endpoint if necessary
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/pin/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setSuccessMessage("");
        router.push("/email-verify");
      } else {
        throw new Error(response.message || "An unknown error occurred.");
      }
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "An unknown error occurred.";
      setErrorMessage(message);
        console.error("Error:", message);
      } finally {
        setLoading(false);
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
 
    

  return (
    <div className="grid sm:grid-cols-[1fr,_1fr] lg:grid-cols-[1.3fr,_1fr] xl:grid-cols-[1.8fr,_1fr] overflow-y-auto min-h-screen">
      {/* Left Section (Background Image and Text) */}
      <div className="hidden sm:block relative h-full">
        <div className="absolute inset-0 w-full h-full">
          <Image
            priority
            width={0}
            height={0}
            src={signUpBg}
            alt="sign up background"
            className="w-full h-full object-cover"
          />
        </div>
        <Link href="/" className="absolute top-12 left-10 lg:left-[120px]">
          <Logo fillColorSecondary="#ffffff" width="134" height="64" />
        </Link>
        <Typography
          variant="48px/300/57.6px"
          className="absolute bottom-8 left-[20px] md:left-[64px] text-white-1 [text-shadow:_2px_12px_0px_#00000033]"
        >
          Connecting <span className="font-bold">Homes</span>
          <br />
          with <span className="font-bold">Trusted</span> Hands
        </Typography>
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col p-[8px_20px] md:p-[2px_64px] content-start gap-6 overflow-y-auto items-center justify-center h-full">
        <div className="grid gap-8">
          <Link href="/" className="grid place-items-center">
            <Logo className="sm:hidden" width="101" height="48" />
          </Link>
          <Typography variant="32px/700/43.71px" className="text-black-1 text-center">
            Sign up to AssistMeIn
          </Typography>
          {/* <LoginMethods />
          <Divider text="OR" /> */}
          
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        smallLabel="Name"
                        placeholder="Your Name"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Submit Button */}
              <Button type="submit" className="mt-2" disabled={loading || isLoading}>
                {loading || isLoading ? <CircularProgress color="inherit" /> : "Sign up"}
              </Button>

              {/* Error and Success Messages */}
              {errorMessage && <Toast message={errorMessage} type="error" />}
              {successMessage && <Toast message={successMessage} type="success" />}

              {/* Terms and Conditions */}
              <Typography
                variant="14px/400/21px"
                className="text-black-5 text-center [&>span]:font-semibold [&>span]:text-black-1"
              >
                By proceeding, I agree to AssistMeIn's{" "}
                <span> Terms & Conditions</span>,
                <span>Community Guidelines</span>, & <span>Privacy Policy</span>
              </Typography>
            </form>
          </Form>
        </div>

        {/* Login Link */}
        <Typography variant="18px/400/27px" className="text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="inline-block">
            <Typography as="span" variant="18px/700/24.59px" className="text-accent">
              Log in
            </Typography>
          </Link>
        </Typography>
      </div>
    </div>
  );
}
