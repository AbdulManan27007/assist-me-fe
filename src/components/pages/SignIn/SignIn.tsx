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
import signInBg from "@/assets/signInBg.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/core/Divider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { LoginMethods } from "@/components/core/LoginMethods";
import { useRouter } from "next/navigation";
import { Logo } from "@/icons";
import { useGlobalContext } from "@/globalContext/globalContext";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "@/components/ui/toast";
import { useState } from "react";

// Import RTK mutation
import { useLoginMutation } from "../../../store/api/auth/login";

const FormSchema = z.object({
  email: z
    .string({ required_error: "Please type your email." })
    .email(),
  password: z
    .string({ required_error: "Please type your password." })
    .min(8, "Password must be at least 8 characters long"),
});

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { setUser } = useGlobalContext();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
	  console.log("Form Schema:", data);

    setErrorMessage("");
    try {
      const response = await login(data).unwrap();
      
      const { user: userDetails, accessToken } = response.data;
      
      setUser(userDetails);
      
      // Set cookies
      document.cookie = `accessToken=${accessToken}; path=/; samesite=lax; max-age=86400`;
      document.cookie = `email=${data.email}; path=/; samesite=lax; max-age=86400`;
      document.cookie = `id=${userDetails.id}; path=/; samesite=lax; max-age=86400`;
      document.cookie = `is_verified=${userDetails.isVerified}; path=/; samesite=lax; max-age=86400`;
      
      setSuccessMessage("Login successful");
      setTimeout(() => {
        setSuccessMessage("");
        router.push("/");
      }, 1000);
      
    } catch (err: any) {
      console.error("Login Error:", err);
      setErrorMessage(err?.data?.message || "Something went wrong .");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="grid sm:grid-cols-[1fr,_1fr] lg:grid-cols-[1fr,_1.8fr] h-screen">
      <div className="grid p-[8px_20px] md:p-[2px_64px] content-between sm:content-center gap-12 ">
        <div className="grid gap-8">
          <Link href="/" className="grid place-items-center">
            <Logo className="sm:hidden mt-4" width="101" height="48" />
          </Link>
          <Typography variant="32px/700/43.71px" className="text-black-1 text-center">
            Login
          </Typography>
          {/* <LoginMethods />
          <Divider text="OR" /> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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

              <div className="grid gap-2">
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
                <div className="px-6 py-[1.5px] ">
                  <Link href="/forgot-password">
                    <Typography variant="14px/700/19.12px" className="text-black-1">
                      Forgot password?
                    </Typography>
                  </Link>
                </div>
              </div>

              <Button type="submit" className="mt-2" disabled={isLoading}>
                {isLoading ? <CircularProgress color="inherit" /> : "Login"}
              </Button>

              {errorMessage && <Toast message={errorMessage} type="error" />}
              {successMessage && <Toast message={successMessage} type="success" />}
            </form>
          </Form>
        </div>

        <Typography variant="18px/400/27px" className="text-center">
          New to AssistMeIn?{" "}
          <Link href="/sign-up" className=" inline-block">
            <Typography as="span" variant="18px/700/24.59px" className="text-accent">
              Sign up
            </Typography>
          </Link>
        </Typography>
      </div>

      <div className="hidden sm:block relative">
        <div className="absolute inset-0 w-full h-full">
          <Image
            priority
            width={0}
            height={0}
            src={signInBg}
            alt="sign up background"
            className="w-full h-full object-cover"
          />
        </div>
        <Link href="/" className="absolute top-16 left-10 lg:left-[120px]">
          <Logo fillColorSecondary="#ffffff" width="134" height="64" />
        </Link>
        <Typography
          variant="48px/300/57.6px"
          className="absolute bottom-16 left-10 lg:left-[120px] text-white-1 [text-shadow:_2px_12px_0px_#00000033] md:text-4xl lg:text-5xl font-light"
        >
          Connecting <span className="font-bold">Homes</span>
          <br />
          with <span className="font-bold">Trusted</span> Hands
        </Typography>
      </div>
    </div>
  );
}