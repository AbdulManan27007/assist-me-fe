import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [upiProvider, setUpiProvider] = useState("");

  const paymentOptions = [
    { id: 1, name: "Credit/Debit card", icon: "💳" },
    { id: 2, name: "UPI", icon: "🏦" },
    { id: 3, name: "Paypal", icon: "💰" },
  ];

  const toggleMethod = (id: any) => {
    setSelectedMethod(selectedMethod === id ? null : id);
  };

  return (
    <div className="max-w-[639px] w-full p-4 mob:p-0">
      {/* Payment Methods List */}
      <div className="border border-gray-300 rounded-lg p-4 bg-transparent space-y-5">
        {paymentOptions.map((option) => (
          <div key={option.id} className="py-3">
            {/* Payment Method Header */}
            <div className="flex justify-between items-center ">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{option.icon}</span>
                <span className="text-black-3">{option.name}</span>
              </div>
              <Button
                className="px-12 rounded-md "
                onClick={() => toggleMethod(option.id)}
              >
                {selectedMethod === option.id ? "Close" : "Add"}
              </Button>
            </div>

            {/* Conditional Inputs Display */}
            {selectedMethod === option.id && (
              <div className="mt-5 space-y-4">
                {option.id === 2 ? ( // UPI Fields
                  <div className="flex space-x-2">
                    <Select value={upiProvider} onValueChange={setUpiProvider} >
                    <SelectTrigger className="max-w-2/4 w-full bg-transparent rounded-[6px] !h-[37px] min-h-[unset]">
                    <SelectValue placeholder="Select UPI" className="text-sm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Google Pay" className="text-sm">
                          Google Pay UPI
                        </SelectItem>
                        <SelectItem value="EasyPaisa" className="text-sm">
                        EasyPaisa UPI</SelectItem>
                        <SelectItem value="JazzCash" className="text-sm">JazzCash UPI</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      className="w-full bg-transparent !h-[37px] min-h-[unset] rounded-[6px] placeholder:text-sm"
                      placeholder="Enter UPI ID"
                      type="text"
                    />
                  </div>
                ) : option.id === 1 ? ( // Credit/Debit Card Fields
                  <div className="space-y-4 ">
                    <p>
                      <Input
                        className="bg-transparent h-[37px] rounded-[6px] placeholder:text-sm"
                        placeholder="Enter your name..."
                      />
                    </p>
                    <p>
                      <Input
                        className="bg-transparent h-[37px] rounded-[6px]  placeholder:text-sm  "
                        placeholder="Enter card number"
                        type="password"
                      />
                    </p>
                    <div className="flex  space-x-2 mob:space-x-0 mob:flex-col mob:gap-4">
                      <Input
                        placeholder="CVV"
                        type="password"
                        className="max-w-1/3 w-full bg-transparent h-[37px] rounded-[6px]  placeholder:text-sm "
                      />
                      <Input
                        placeholder="Expiry Date"
                        className="max-w-full w-full bg-transparent h-[37px] rounded-[6px] placeholder:text-sm"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
