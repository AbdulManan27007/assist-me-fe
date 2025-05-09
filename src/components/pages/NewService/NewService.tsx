'use client';
import { cn } from '@/lib/utils';
import { VehicleDetails } from './steps/VehicleDetails';
import { CategoryTags } from './steps/CategoryTags';
import { UploadMedia } from './steps/UploadMedia';
import { ReviewDetails } from './steps/ReviewDetails';
import { BasicInfo } from './steps/BasicInfo';
import { Typography } from '@/components/core/Typography';
import { useNewListingContext } from './newListingContext';

const steps = [
  {
    title: 'Basic Information',
    content: <BasicInfo />,
  },
  {
    title: 'Category & Tags',
    content: <CategoryTags />,
  },
  // {
  //   title: 'Contact Information',
  //   content: <ContactInformation />,
  // },
  {
    title: 'Service Images',
    content: <UploadMedia />,
  },
  {
    title: 'Vehicle Details',
    content: <VehicleDetails />,
  },
  {
    title: 'Review Details',
    content: <ReviewDetails />,
  },
];

export function NewService() {
  const { step, setStep } = useNewListingContext();

  return (
    <div className="p-12 mob:py-8 mob:px-0">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr,_1.95fr] gap-20 mob:grid-cols-1 mob:gap-8">
        <div className="grid gap-8 content-start ">
          <Typography variant="32px/700/43.71px" className="mob:pl-6">
            New Services
          </Typography>
          <div className="grid mob:grid-flow-col mob:overflow-x-auto mob:pl-6">
            {steps.map(({ title }, index) => {
              const isPassed = index < step;
              const isActive = index === step;
              const goToStep = () => isPassed && setStep(index);

              return (
                <div
                  key={title}
                  className={cn(
                    'flex items-center gap-4 pb-8 mob:pb-0 mob:pr-8 relative [&:last-child>div:first-of-type]:after:hidden mob:flex-col-reverse mob:items-start',
                    isPassed && 'cursor-pointer'
                  )}
                  onClick={goToStep}
                >
                  <div
                    className={cn(
                      `
                      transition-colors
                      after:transition-colors
                      w-4
                      h-4
                      rounded-full
                      bg-[#FFFFFF]
                      border
                      border-[#0000001A]

                      after:absolute
                      after:w-[1px]
                      after:h-full
                      after:bg-[#0000001A]
                      after:left-2
                      after:top-2
                      after:-translate-x-1/2
                      after:-z-[1] 

                      mob:after:w-full
                      mob:after:h-[1px]
                      mob:after:left-0
                      mob:after:top-auto
                      mob:after:bottom-2
                      mob:after:translate-x-0
                      mob:after:translate-y-1/2
                      `,
                      isPassed && 'bg-black-5 border-none after:bg-black-5',
                      isActive && 'bg-accent border-none after:bg-accent'
                    )}
                  />
                  <Typography
                    variant="18px/500/24.59px"
                    className={cn(
                      'transition-colors text-[#20212580] mob:whitespace-nowrap',
                      isPassed && 'text-black-5',
                      isActive && 'text-accent'
                    )}
                  >
                    {title}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mob:px-6">{steps[step].content}</div>
      </div>
    </div>
  );
}
