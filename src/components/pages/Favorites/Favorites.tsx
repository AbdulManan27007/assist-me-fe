"use client";
import { Typography } from "@/components/core/Typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Category,
  Location,
  SortingMethod,
  MOCK_TRADIES,
} from "@/globalContext/globalContext";
import { Button } from "@/components/ui/button";
import { ArrowDropDownIcon, FiltersIcon, SearchIcon } from "@/icons";
import { useState } from "react";
import { TradieCard } from "./TradieCard";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Range } from "@/components/core/Range";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function Favorites() {
  const [sortingMethod, setSortingMethod] = useState(SortingMethod.MOST_RECENT);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    location?: string;
    category?: string;
  }>({
    location: undefined,
    category: undefined,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Adjust the number of items per page as needed

  // Filtered tradies
  const filteredTradies = MOCK_TRADIES.filter((tradie) => {
    return (
      (filters.category
        ? tradie.categoriesHired.some((cat) => cat.title === filters.category)
        : true) &&
      (filters.location ? tradie.location === filters.location : true) &&
      (search ? tradie.name.toLowerCase().includes(search.toLowerCase()) : true)
    );
  });

  // Calculate paginated tradies
  const totalPages = Math.ceil(filteredTradies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTradies = filteredTradies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <div className="p-[38px] mob:py-8 mob:px-6 bg-black-1">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between mob:grid mob:gap-6 mob:justify-stretch">
          <Typography variant="32px/700/43.71px" className="text-white-1">
            Favorites
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
              Filter Tradies
            </Typography>
            <div className="grid gap-3">
              <Typography variant="24px/800/32.78px" className="text-black-2">
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
              <Typography variant="24px/800/32.78px" className="text-black-2">
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
              <Button className="mt-8">View 30 results</Button>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <Typography variant="24px/800/32.78px" className="text-black-2">
                {filteredTradies.length} Tradies
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
              {currentTradies.map((tradie) => (
                <TradieCard key={tradie.id} {...tradie} />
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className=" rounded-full px-4 py-2"
                    />
                  </PaginationItem>

                  {/* First Page Number */}
                  {currentPage > 3 && (
                    <PaginationItem>
                      <PaginationLink
                        className="text-[#495057] hover:bg-[#F5F5F5] rounded-full px-4 py-2"
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Ellipsis if needed */}
                  {currentPage > 4 && (
                    <PaginationItem>
                      <PaginationLink className="text-[#495057] px-4 py-2">
                        ...
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Page Numbers */}
                  {Array.from({ length: 4 }, (_, index) => {
                    const pageNumber = currentPage - 2 + index;
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            className={`${
                              currentPage === pageNumber
                                ? "bg-[#FF8534] text-white"
                                : "text-[#495057] hover:bg-[#F5F5F5] rounded-full"
                            } px-4 py-2`}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  {/* Ellipsis if needed */}
                  {currentPage < totalPages - 3 && (
                    <PaginationItem>
                      <PaginationLink className="text-[#495057] px-4 py-2">
                        ...
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Last Page Number */}
                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationLink
                        className="text-[#495057] hover:bg-[#F5F5F5] rounded-full px-4 py-2"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className="rounded-full px-4 py-2"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
