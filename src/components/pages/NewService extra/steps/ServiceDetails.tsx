import { z } from 'zod';
import { Form, FormItem, FormField, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { CalendarWithDaysIcon } from '@/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@/globalContext/globalContext';
import { InputChips } from '@/components/ui/input-chips';
import { Typography } from '@/components/core/Typography';
import { useNewListingContext } from '../newListingContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar-custom';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const FormSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
});

export function ServiceDetails() {
  const { services, nextStep, setListingData } = useNewListingContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: services?.title || '',
      category: services?.category || '',
      location: services?.location || '',
      description: services?.description || '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-12">
        <div className="grid gap-5">
          {/* <Typography variant="24px/800/32.78px">Service Details</Typography> */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    full
                    smallLabel="Title"
                    placeholder="Service Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger smallLabel="Category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Category).map((category) => (
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    smallLabel="Description"
                    placeholder="Write about what you need done in this listing as complete as you can..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger smallLabel="Location">
                      <SelectValue placeholder="e.g. 123 Main Street, Sydney" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['Sydney', 'Melbourne', 'Brisbane'].map((category) => (
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

        </div>

        <Button type="submit" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
}
