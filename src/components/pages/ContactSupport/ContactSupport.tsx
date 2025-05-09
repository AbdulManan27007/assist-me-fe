"use client";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowIcon } from "@/icons";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { HelpArticleCategory } from "../Help/ArticlesList";
import { BackButton } from "@/components/core/BackButton";

const FormSchema = z.object({
  about: z.string({
    required_error: "Please select about what your query is about.",
  }),
  subject: z.string({
    required_error: "Please type a subject for your query.",
  }),
  question: z.string({
    required_error: "Please write about your question or issue.",
  }),
});

export function ContactSupport() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      about: "",
      subject: "",
      question: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto py-12 px-8 relative grid mob:gap-6 mob:py-8 mob:px-6">
      <BackButton className={"desk:absolute desk:top-12 desk:left-0"} />
      <div className="grid gap-8 max-w-[481px] w-full mx-auto">
        <Typography
          variant="32px/700/43.71px"
          className="text-black-1 text-center"
        >
          Contact Support
        </Typography>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger smallLabel="What is your query about?">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(HelpArticleCategory).map((category) => (
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
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      full
                      smallLabel="Subject"
                      placeholder="Type a subject for your query"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      smallLabel="How can we help?"
                      placeholder="Write about your question or issue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2 mob:mt-[calc(21*4px)]">
              Contact Support
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
