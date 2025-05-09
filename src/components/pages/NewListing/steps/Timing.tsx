import { z } from 'zod';
import { Form, FormItem, FormField, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { CalendarWithDaysIcon } from '@/icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/components/core/Typography';
import { useNewListingContext } from '../newListingContext';

const FormSchema = z.object({
  start_date: z.string().min(1),
  end_date: z.string().min(1),
  duration: z.string().min(1),
});

export function Timing() {
  const { listing, nextStep, setListingData } = useNewListingContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start_date: listing?.start_date || '',
      end_date: listing?.end_date || '',
      duration: listing?.duration || '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    form.setValue('start_date', date?.from ? format(date.from, 'dd.MM.yy') : '');
    form.setValue('end_date', date?.to ? format(date.to, 'dd.MM.yy') : '');
  }, [date]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <Typography variant="24px/800/32.78px">Timing</Typography>
        <FormField
          control={form.control}
          name="start_date"
          render={() => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <Input
                        readOnly
                        smallLabel="Date range for the work"
                        placeholder="01.01.24 - 05.01.24"
                        icon={<CalendarWithDaysIcon />}
                        value={
                          date
                            ? `${date.from ? format(date.from, 'dd.MM.yy') : ''} ${
                                date?.to ? `- ${format(date.to, 'dd.MM.yy')}` : ''
                              }`
                            : ''
                        }
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      // className={`
                      // [&_*]:text-black-1
                      // [&_*]:fill-black-1
                      //   w-full
                      // ![&>td:hover]:bg-black-1/10
                      // [&_*[aria-selected]]:bg-black-1/10
                      //   [&_*[aria-selected]]:rounded-none
                      //   [&_*:has([aria-selected].day-range-start)]:rounded-l-[8px]
                      //   [&_*:has([aria-selected].day-range-end)]:rounded-r-[8px]
                      //   [&_*:has([aria-selected])]:bg-transparent
                      // `}
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger smallLabel="How long the listing will be live">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...Array.from({ length: 6 }, (_, i) => `${i + 1} day${i + 1 > 1 ? 's' : ''}`),
                    '1 week',
                  ].map((category) => (
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
  );
}
