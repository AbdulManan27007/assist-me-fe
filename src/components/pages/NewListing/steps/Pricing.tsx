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
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, PriceType } from '@/globalContext/globalContext';
import { Typography } from '@/components/core/Typography';
import { useNewListingContext } from '../newListingContext';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect } from 'react';

const FormSchema = z.object({
  price: z.number().min(1, 'Price is required'),
});

export function Pricing() {
  const { listing, nextStep, setListingData, prevStep } = useNewListingContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      price: listing?.price,
    },
  });

  // Update form when listing data changes
  useEffect(() => {
    if (listing?.price) {
      form.setValue('price', listing.price);
    }
  }, [listing, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        {/* <Typography variant="24px/800/32.78px">Pricing</Typography> */}
        {/* <FormField
          control={form.control}
          name="priceType"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger smallLabel="Service Type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(PriceType).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  smallLabel="Price You’re Willing to Pay"
                  placeholder="A$ 0.00"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center my-3">
          <Checkbox className="w-8 h-8 border-[1px]" />
          <Typography variant="16px/600/21.86px" className="text-black-3">
            Open for Quotations
          </Typography>
        </div>
        <div className="grid gap-5">
          <Button type="submit">Continue</Button>
          <Button type="button" variant="ghost" className='text-accent' onClick={prevStep}>
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
