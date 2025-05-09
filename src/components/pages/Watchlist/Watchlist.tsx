"use client";
import {
  MoreIcon,
  SearchIcon,
  CalendarIcon,
  HourGlassIcon,
  ArrowDropDownIcon,
  FiltersIcon,
} from "@/icons";
import Image from "next/image";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Category,
  Location,
  SortingMethod,
  MOCK_LISTINGS,
} from "@/globalContext/globalContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Range } from "@/components/core/Range";
import { cn, daysAgo, formatDate } from "@/lib/utils";
import { Typography } from "@/components/core/Typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Watchlist() {
  const [sortingMethod, setSortingMethod] = useState(SortingMethod.MOST_RECENT);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    location?: string;
    category?: string;
  }>({
    location: undefined,
    category: undefined,
  });

  const minPrice = MOCK_LISTINGS.reduce(
    (min, listing) => Math.min(min, Number(listing.price)),
    Number(MOCK_LISTINGS[0]?.price) || 0
  );

  const maxPrice = MOCK_LISTINGS.reduce(
    (max, listing) => Math.max(max, Number(listing.price)),
    Number(MOCK_LISTINGS[0]?.price) || 0
  );

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  const filteredListings = MOCK_LISTINGS.filter((listing) => {
    return (
      (filters.category ? listing.category === filters.category : true) &&
      (filters.location ? listing.location === filters.location : true) &&
      (search
        ? listing.title.toLowerCase().includes(search.toLowerCase())
        : true) &&
      Number(listing.price) >= priceRange.min &&
      Number(listing.price) <= priceRange.max
    );
  }).sort((a, b) => {
    switch (sortingMethod) {
      case SortingMethod.MOST_RECENT:
        return (
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
      case SortingMethod.LEAST_RECENT:
        return (
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
    }
  });

  return (
    <>
      <div className="p-[38px] mob:py-8 mob:px-6 bg-black-1">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between mob:grid mob:gap-6 mob:justify-stretch">
          <Typography variant="32px/700/43.71px" className="text-white-1">
            Watchlist
          </Typography>
          <div className="mob:grid mob:grid-cols-[1fr,_auto] mob:gap-4">
            <Input
              full
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-[500px] mob:max-w-full"
              variant="dark"
              placeholder="Search..."
              icon={<SearchIcon />}
            />

            <Popover>
              <PopoverTrigger className="desk:hidden">
                <div className="desk:hidden h-14 w-14 rounded-[12px] border border-[#FFFFFF26] grid place-content-center bg-[#FFFFFF0D]">
                  <FiltersIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent
                collisionPadding={24}
                align="end"
                className="desk:hidden w-fit max-w-[calc(100dvw-24px*2)]"
              >
                <div className="grid gap-8">
                  <Typography
                    variant="24px/800/32.78px"
                    className="text-black-2"
                  >
                    Filter Listings
                  </Typography>
                  <div className="grid gap-3">
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-2"
                    >
                      Category
                    </Typography>
                    <div className="bg-white-2 p-4 pb-0 rounded-[12px] flex flex-wrap max-w-full">
                      <div className="flex gap-2 flex-wrap max-h-[284px] overflow-y-auto scrollable pb-4">
                        {Object.values(Category).map((category) => (
                          <div
                            key={category}
                            className={cn(
                              "py-3 px-5 border-[1.5px] border-[#0000001A] w-fit rounded-full cursor-pointer transition-colors",
                              filters.category === category &&
                                "bg-[rgba(0,0,0,0.05)]"
                            )}
                            onClick={() => {
                              setFilters((prev) => ({
                                ...prev,
                                category,
                              }));
                            }}
                          >
                            <Typography
                              variant="14px/400/21px"
                              className="text-black-3"
                            >
                              {category}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-2"
                    >
                      Pricing
                    </Typography>
                    <Range
                      min={minPrice}
                      max={maxPrice}
                      changeMin={(value) =>
                        setPriceRange((prev) => ({ ...prev, min: value }))
                      }
                      changeMax={(value) =>
                        setPriceRange((prev) => ({ ...prev, max: value }))
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-2"
                    >
                      Location
                    </Typography>
                    <Select
                      onValueChange={(location) =>
                        setFilters({ ...filters, location })
                      }
                      defaultValue={filters.location}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location">
                          <Typography
                            variant="16px/400/21.86px"
                            className="text-black-5"
                          >
                            {filters.location}
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Location).map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="p-12 mob:py-8 mob:px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr_1.95fr] items-start gap-16 mob:grid-cols-1 mob:gap-12">
          <div className="grid gap-8 mob:hidden">
            <Typography variant="24px/800/32.78px" className="text-black-2">
              Filter Listings
            </Typography>
            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-2">
                Category
              </Typography>
              <div className="bg-white-2 p-4 pb-0 rounded-[12px]">
                <div className="flex gap-2 flex-wrap max-h-[284px] overflow-y-auto scrollable pb-4">
                  {Object.values(Category).map((category) => (
                    <div
                      key={category}
                      className={cn(
                        "py-3 px-5 border-[1.5px] border-[#0000001A] w-fit rounded-full cursor-pointer transition-colors",
                        filters.category === category && "bg-[rgba(0,0,0,0.05)]"
                      )}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          category,
                        }));
                      }}
                    >
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-3"
                      >
                        {category}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-2">
                Pricing
              </Typography>
              <Range
                min={minPrice}
                max={maxPrice}
                changeMin={(value) =>
                  setPriceRange((prev) => ({ ...prev, min: value }))
                }
                changeMax={(value) =>
                  setPriceRange((prev) => ({ ...prev, max: value }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-2">
                Location
              </Typography>
              <Select
                onValueChange={(location) =>
                  setFilters({ ...filters, location })
                }
                defaultValue={filters.location}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location">
                    <Typography
                      variant="16px/400/21.86px"
                      className="text-black-5"
                    >
                      {filters.location}
                    </Typography>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Location).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between mob:grid mob:gap-4">
              <Typography variant="24px/800/32.78px" className="text-black-2">
                {filteredListings.length} listing
                {filteredListings.length > 1 ? "s" : ""}
              </Typography>
              <div className="flex items-center gap-3">
                <Typography variant="14px/500/19.12px">Sort by</Typography>
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Typography variant="16px/700/21.86px">
                        {sortingMethod}
                      </Typography>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.values(SortingMethod).map((method) => (
                        <DropdownMenuItem
                          key={method}
                          onClick={() => setSortingMethod(method)}
                        >
                          {method}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ArrowDropDownIcon />
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {filteredListings.map(
                ({
                  id,
                  title,
                  location,
                  start_date,
                  end_date,
                  category,
                  description,
                  images,
                  price,
                  priceType,
                  hiredTradie,
                  nextTask,
                }) => (
                  <div key={id}>
                    <div className="grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6 mob:gap-6">
                      <div className="flex items-start justify-between mob:grid mob:justify-stretch mob:gap-4">
                        <Typography
                          variant="24px/800/32.78px"
                          className="mob:row-start-2"
                        >
                          {title}
                        </Typography>
                        <div className="flex items-center gap-6 mob:justify-between mob:w-full">
                          <div className="flex items-center gap-2">
                            <Typography
                              variant="16px/600/21.86px"
                              className="text-black-5"
                            >
                              {location}
                            </Typography>
                            <div className="h-1 w-1 rounded-full bg-black-5" />
                            <Typography
                              variant="16px/600/21.86px"
                              className="text-black-5"
                            >
                              {daysAgo(start_date)} days ago
                            </Typography>
                          </div>
                          <MoreIcon />
                        </div>
                      </div>
                      <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                        <Typography
                          variant="14px/400/21px"
                          className="text-black-5"
                        >
                          {category}
                        </Typography>
                      </div>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-5 truncate-lines-3"
                      >
                        {description}
                      </Typography>
                      <div className="grid gap-3 mob:hidden">
                        <Typography
                          variant="18px/700/24.59px"
                          className="text-black-4"
                        >
                          Uploaded media
                        </Typography>
                        <div className="flex gap-2">
                          {images.map((image, index) => (
                            <Image
                              key={index}
                              priority
                              src={image}
                              alt={`uploaded media ${index}`}
                              width={80}
                              height={80}
                              className="rounded-[12px]"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-6 mob:grid mob:gap-4">
                        <div className="flex flex-1 items-end gap-2">
                          <Typography variant="24px/800/32.78px">
                            A$ {price}
                          </Typography>
                          <Typography
                            variant="16px/400/21.86px"
                            className="text-black-5"
                          >
                            {priceType}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <HourGlassIcon />
                          <Typography
                            variant="16px/700/21.86px"
                            className="text-black-4"
                          >
                            {(() => {
                              const daysLeft = daysAgo(start_date);
                              if (daysLeft > 6) {
                                const weeks = Math.floor(daysLeft / 7);
                                return `Ends in ${weeks} ${
                                  weeks === 1 ? "week" : "weeks"
                                }`;
                              } else {
                                return `Ends in ${daysLeft} ${
                                  daysLeft === 1 ? "day" : "days"
                                }`;
                              }
                            })()}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon />
                          <Typography
                            variant="16px/700/21.86px"
                            className="text-black-4"
                          >
                            {formatDate(start_date, "short")} -{" "}
                            {formatDate(end_date, "short")}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="border border-t-0 border-[#0000001A] rounded-[0_0_12px_12px] p-6">
                      <div className="grid grid-cols-2 items-center mob:grid-cols-1 mob:gap-6">
                        <div className="grid gap-3">
                          <Typography
                            variant="14px/500/19.12px"
                            className="text-black-5"
                          >
                            Client
                          </Typography>
                          <div className="flex items-center gap-3">
                            <img
                              src={hiredTradie.avatar}
                              alt={hiredTradie.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <Typography
                                variant="18px/600/24.59px"
                                className="text-black-2"
                              >
                                {hiredTradie.name}
                              </Typography>
                              <Typography
                                variant="14px/500/19.12px"
                                className="text-black-4"
                              >
                                @{hiredTradie.tag}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 justify-end mob:justify-start mob:grid">
                          <Button
                            size="ghost"
                            variant="ghost"
                            className="justify-start"
                          >
                            View listing
                          </Button>
                          <Button>Apply for listing</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
