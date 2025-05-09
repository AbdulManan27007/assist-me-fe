import React from "react";
import { Button } from "@/components/ui/button";

const BillingInfo = () => {
  return (
    <div className="max-w-[741px] p-6 mob:p-2 bg-transparent">
      <form className="space-y-4">
        {[
          "Full Name",
          "Company Name",
          "Country",
          "State/Region",
          "Address",
          "City",
          "Postal Code",
          "Tax ID",
        ].map((label) => (
          <input
            key={label}
            type="text"
            placeholder={label}
            className="w-full p-3 border border-gray-300 bg-[#F8F8F8] rounded-md focus:outline-none focus:ring-1 "
          />
        ))}
        <p className="text-sm text-gray-600 mt-3">
          You will find your invoices under the Billing history tab.
        </p>
        <div className="flex items-center mt-3">
          <input type="checkbox" id="taxDocs" className="w-4 h-4 mr-2" />
          <label htmlFor="taxDocs" className="text-sm text-gray-700">
            I want to receive tax documents digitally (including <strong>Form 1111-R</strong>)
          </label>
        </div>
        <Button type="submit" className="mt-4 rounded-md  w-full sm:w-auto">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default BillingInfo;
