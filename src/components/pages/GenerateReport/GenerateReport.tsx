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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ArrowIcon } from "@/icons";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { HelpArticleCategory } from "../Help/ArticlesList";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  name: z.string({
    required_error: "Please type a name for your report.",
  }),
  timeframe: z.string({
    required_error: "Please select a timeframe for your report.",
  }),
  format: z.string({
    required_error: "Please select a format for your report.",
  }),
});

export function GenerateReport() {
  const reportTypes = [
    { id: "0", name: "Template 1" },
    { id: "1", name: "User Statistics" },
    { id: "2", name: "Listing Statistics" },
    { id: "3", name: "Revenue Statistics" },
  ];
  const [selectedReport, setSelectedReport] = useState(reportTypes[2]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      timeframe: "",
      format: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="p-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[auto,_1fr] items-start justify-items-center">
        <div
          onClick={() => window.history.back()}
          className="flex items-center gap-1 cursor-pointer"
        >
          <ArrowIcon />
          <Typography variant="18px/700/24.59px" className="text-black-5">
            Back
          </Typography>
        </div>
        <div className="max-w-[584px] w-full grid gap-12">
          <Typography
            variant="32px/700/43.71px"
            className="text-black-1 text-center"
          >
            Generate Report
          </Typography>
          <div className="grid gap-6">
            <Typography variant="24px/800/32.78px" className="text-black-2">
              Select a report
            </Typography>
            <div className="grid gap-2">
              {reportTypes.map((report) => {
                const isSelected = report.id === selectedReport.id;
                return (
                  <div
                    key={report.id}
                    className={cn(
                      "py-4 px-5 border border-[#0000001A] rounded-[12px] cursor-pointer bg-white-1 transition-colors",
                      isSelected && "bg-white-2"
                    )}
                    onClick={() => setSelectedReport(report)}
                  >
                    <Typography
                      variant="16px/400/21.86px"
                      className={cn(
                        "text-black-3 transition-all",
                        isSelected && "text-black-1 font-bold"
                      )}
                    >
                      {report.name}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-6">
            <Typography variant="24px/800/32.78px" className="text-black-2">
              Customize Report
            </Typography>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          smallLabel="Report Name"
                          placeholder="Type a name for your report..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger smallLabel="Timeframe">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["30 days", "60 days", "90 days"].map((category) => (
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
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger smallLabel="Format">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["Excel", "PDF", "CSV"].map((category) => (
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox />
                    <Typography variant="16px/700/21.86px">
                      Save as template
                    </Typography>
                  </label>
                  <Button type="submit" className="mt-2">
                    Generate Report
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
