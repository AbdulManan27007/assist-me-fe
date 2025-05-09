import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Typography } from "@/components/core/Typography";

const Balances = () => {
  return (
    <div className="max-w-[639px] w-full space-y-4 p-4 mob:p-1 mx-0 mob:mx-auto">
      {/* Available Balances Section */}
      <div className="rounded-lg p-4 shadow-md ">
        <div className="flex flex-wrap justify-between items-center gap-2 ">
          <Typography variant="20px/700/28px" className="text-black-3 mb-4 md:mb-6">
            Available Balances
          </Typography>
          <Button className=" px-4 py-2 rounded w-full sm:w-auto">
            Withdraw
          </Button>
        </div>
        <Typography variant="32px/500/24.71px" className="text-[#1D822C] mb-4 mob:mt-4">
          $2500
        </Typography>
        <RadioGroup>
          <div className="space-y-2 mt-2">
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="radio" name="payment" className="form-radio" />
              <Typography variant="17px/500/26.59px" className="text-black-2 mob:text-sm">
                Direct to Local Bank (IDR) - Account ending in 6958
              </Typography>
            </label>
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="radio" name="payment" className="form-radio" defaultChecked />
              <Image src="/images/paypal.svg" height={21} width={75} alt="Paypal Logo" />
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Billings Section */}
      <div className="rounded-lg p-4 shadow-md bg-white">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <Typography variant="20px/700/28px" className="text-black-3 mb-4 md:mb-6">
            Billings
          </Typography>
          <Button className="px-[40px] py-2 rounded w-full sm:w-auto">Pay</Button>
        </div>
        <Typography variant="32px/500/24.71px" className="text-[#7C241A] mb-4 mob:mt-4">
          $0
        </Typography>
      </div>
    </div>
  );
};

export default Balances;
