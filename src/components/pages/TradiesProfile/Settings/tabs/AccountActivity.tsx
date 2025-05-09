"use client";
import React, { useState } from "react";
import { Typography } from "@/components/core/Typography";
import { EditPencil } from "@/icons/EditPencil";
import { Input } from "@/components/ui/input";

const AccountActivity = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [userData, setUserData] = useState({
    userId: "75854fj49v",
    name: "Golalo Nick",
    email: "n*******55@gmail.com",
  });

  const [locationData, setLocationData] = useState({
    TimeZone: "UTC+05.00 United Kingdom",
    Address: "United Kingdom",
    Phone: "+746 08765443333",
  });

  const handleChange = (e: any, setData: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-16">
      <div className="p-8 border border-gray-200 rounded-xl grid gap-6 relative">
        <div className="flex justify-between items-center">
          <Typography variant="18px/500/24.59px" className="text-black">
            Account
          </Typography>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-[5px] border border-[#E5E5E5] rounded-full"
          >
            <EditPencil />
          </button>
        </div>
        <div className="grid gap-4">
          <p className="flex flex-col">
            <strong>User ID</strong> {isEditing ? (
              <Input
                type="text"
                name="userId"
                value={userData.userId}
                onChange={(e) => handleChange(e, setUserData)}
                className="max-w-full w-full h-[37px] rounded-[6px]"
              /> 
            ) : (
              userData.userId
            )}
          </p>
          <p className="flex flex-col">
            <strong>Name</strong> {isEditing ? (
              <Input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) => handleChange(e, setUserData)}
                className="max-w-full w-full h-[37px] rounded-[6px]"
              />
            ) : (
              userData.name
            )}
          </p>
          <p className="flex flex-col">
            <strong>Email</strong> {isEditing ? (
              <Input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) => handleChange(e, setUserData)}
                className="max-w-full w-full h-[37px] rounded-[6px]"
              />
            ) : (
              userData.email
            )}
          </p>
          <button className="text-red-500">Close my account</button>
        </div>
      </div>
      
      <div className="p-8 border border-gray-200 rounded-xl grid gap-6 relative">
        <div className="flex justify-between items-center">
          <Typography variant="18px/500/24.59px" className="text-black">
            Location
          </Typography>
          <button
            onClick={() => setIsEditingLocation(!isEditingLocation)}
            className="p-[5px] border border-[#E5E5E5] rounded-full"
          >
            <EditPencil />
          </button>
        </div>
        <div className="grid gap-4">
          <p className="flex flex-col">
            <strong>Time Zone</strong> {isEditingLocation ? (
              <Input
                type="text"
                name="TimeZone"
                value={locationData.TimeZone}
                onChange={(e) => handleChange(e, setLocationData)}
                className="max-w-full w-full h-[37px] rounded-[6px]"
              />
            ) : (
              locationData.TimeZone
            )}
          </p>
          <p className="flex flex-col">
            <strong>Address</strong> {isEditingLocation ? (
              <Input
                type="text"
                name="Address"
                value={locationData.Address}
                onChange={(e) => handleChange(e, setLocationData)}
                className="max-w-full w-full h-[37px] rounded-[6px]"
              />
            ) : (
              locationData.Address
            )}
          </p>
          <p className="flex flex-col">
            <strong>Phone</strong> {isEditingLocation ? (
              <Input
                type="email"
                name="Phone"
                value={locationData.Phone}
                onChange={(e) => handleChange(e, setLocationData)}
                className="max-w-full w-full h-[37px] rounded-[6px]"
              />
            ) : (
              locationData.Phone
            )}
          </p>
          <button className="text-red-500">Close my account</button>
        </div>
      </div>
    </div>
  );
};

export default AccountActivity;
