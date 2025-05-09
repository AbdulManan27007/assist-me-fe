"use client";
import { useState, useEffect } from "react";
import {
  MoreIcon,
  SearchIcon,
  CalendarIcon,
  HourGlassIcon,
  ArrowDropDownIcon,
  FiltersIcon,
} from "@/icons";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
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
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Range } from "@/components/core/FindListingRange";
import { cn, daysAgo, formatDate } from "@/lib/utils";
import { Typography } from "@/components/core/Typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import RatingWithCheckbox from "../../ui/Rating";
import Badge from "../../ui/Badge";
import { useGetListingsQuery } from "@/store/adminDashboard/listingsApi";
import { CircularProgress } from "@mui/material";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  category: string | null;
}

export const CategoryDetails: React.FC<Props> = ({ category }) => {
  const [sortingMethod, setSortingMethod] = useState(SortingMethod.MOST_RECENT);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    location: undefined,
    category: undefined,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  interface SingleListing {
    id: number;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
    category: string;
    description: string;
    images: string[];
    price: number;
    price_type: string;
    hired_tradie_id: number | null;
    household_name: string | null;
    created_at: string;
  }

  const [filteredListings, setFilteredListings] = useState<SingleListing[]>([]);
  const [totalFilteredListings, setTotalFilteredListings] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const applyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };
  
  // Use mock data instead of API data
  // useEffect(() => {
  //   if (!isLoading) {
  //     Use MOCK_LISTINGS.inactive as a replacement for data.listings.inactive
  //     let filtered = MOCK_LISTINGS.filter((listing: SingleListing) => {
  //       return (
  //         (filters.category ? listing.category === filters.category : true) &&
  //         (filters.location ? listing.location === filters.location : true) &&
  //         (debouncedSearch
  //           ? listing.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  //             listing.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  //           : true)
  //       );
  //     });

  //     filtered = [...filtered].sort((a, b) => {
  //       if (sortingMethod === SortingMethod.MOST_RECENT) {
  //         return b.id - a.id;
  //       } else {
  //         return a.id - b.id;
  //       }
  //     });

  //     // Update filtered listings and total count
  //     setFilteredListings(filtered as unknown as SingleListing[]);
  //     setTotalFilteredListings(filtered.length);

  //     const pages = Math.max(1, Math.ceil(filtered.length / limit));
  //     setTotalPages(pages);

  //     if (page > pages && pages > 0) {
  //       setPage(pages);
  //     }
  //   }
  // }, [isLoading, filters, debouncedSearch, limit, page, sortingMethod]);

  const getCurrentPageListings = () => {
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalFilteredListings);
    return filteredListings.slice(startIndex, endIndex);
  };

  // Current page listings
  const paginatedListings = getCurrentPageListings();

  // Function to refresh data (replacement for refetch)
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle page change with smooth scrolling
  const handlePageChange = (newPage: number) => {
    if (newPage === page || newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let pages = [];

    // Always include page 1
    pages.push(1);

    // Add pages around current page
    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add the pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(-2); // -2 represents second ellipsis (different key)
    }

    // Always include last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setFilters({ location: undefined, category: undefined });
    setPage(1);
  };

  return (
    <Suspense fallback={<div>Loading category details...</div>}>
      <div className="p-[38px] mob:py-8 mob:px-6 bg-black-1">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between mob:grid mob:gap-6 mob:justify-stretch">
          <Typography variant="32px/700/43.71px" className="text-white-1">
            Find Services {category}
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
                    Services Filter 
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
                              applyFilters({
                                ...filters,
                                category: filters.category === category ? undefined : category,
                              });
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
                      onValueChange={(location) => {
                        applyFilters({
                          ...filters,
                          location: location === "all" ? undefined : location,
                        });
                      }}
                      value={filters.location || "all"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location">
                          <Typography
                            variant="16px/400/21.86px"
                            className="text-black-5"
                          >
                            {filters.location || "All Locations"}
                          </Typography>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {Object.values(Location).map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-2"
                    >
                      Location Radius
                    </Typography>
                    <Typography
                      variant="18px/500/24.59px"
                      className="text-[#767676]"
                    >
                      Up to 20 miles away
                    </Typography>
                    <Range min={0} max={20} />
                  </div>
                  <div className="space-y-4">
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-2"
                    >
                      Rating
                    </Typography>
                    <RatingWithCheckbox />
                    <Button className="w-full" onClick={() => refreshData()}>
                      Apply Filters
                    </Button>
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
              Services Filter
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
                        applyFilters({
                          ...filters,
                          category: filters.category === category ? undefined : category,
                        });
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
                Location
              </Typography>
              <Select
                onValueChange={(location) => {
                  applyFilters({
                    ...filters,
                    location: location === "all" ? undefined : location,
                  });
                }}
                value={filters.location || "all"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location">
                    <Typography
                      variant="16px/400/21.86px"
                      className="text-black-5"
                    >
                      {filters.location || "All Locations"}
                    </Typography>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {Object.values(Location).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-2">
                Location Radius
              </Typography>
              <Typography variant="18px/500/24.59px" className="text-[#767676]">
                Up to 20 miles away
              </Typography>
              <Range min={0} max={20} />
            </div>
            <div className="space-y-4">
              <Typography variant="18px/700/24.59px" className="text-black-2">
                Rating
              </Typography>
              <RatingWithCheckbox />
              <Button className="w-full" onClick={() => refreshData()}>
                Apply Filters
              </Button>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between mob:grid mob:gap-4">
              <Typography variant="24px/800/32.78px" className="text-black-2">
                {totalFilteredListings} listing{totalFilteredListings !== 1 ? "s" : ""}
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
                          onClick={() => {
                            setSortingMethod(method);
                            setPage(1); // Reset to first page on sort change
                          }}
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
            {isLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: limit }).map((_, index) => (
                  <div
                    key={index}
                    className="grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        <Skeleton width={100} height={24} />
                        <Skeleton width={200} height={32} />
                      </div>
                      <div className="flex items-center gap-6">
                        <Skeleton width={100} height={24} />
                        <Skeleton width={24} height={24} />
                      </div>
                    </div>
                    <Skeleton width={100} height={24} />
                    <Skeleton width="100%" height={72} />
                    <div className="grid gap-3">
                      <Skeleton width={120} height={24} />
                      <div className="flex gap-2">
                        {[1, 2, 3].map((_, imgIndex) => (
                          <Skeleton
                            key={imgIndex}
                            width={80}
                            height={80}
                            className="rounded-[12px]"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <Skeleton width={100} height={32} />
                      <Skeleton width={150} height={24} />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedListings.length === 0 ? (
              <div className="text-center py-16">
                <Typography variant="18px/600/24.59px" className="text-black-5">
                  No Services found matching your criteria.
                </Typography>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {paginatedListings.map(
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
                    price_type: priceType,
                    hired_tradie_id: hiredTradieId,
                    household_name: householdName,
                    created_at,
                  }) => (
                    <div key={id}>
                      <div className="grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6 mob:gap-6">
                        <div className="flex items-start justify-between mob:grid mob:justify-stretch mob:gap-4">
                          <div className="flex flex-col gap-2">
                            <span className="w-fit">
                              <Badge color="green">Active</Badge>
                            </span>
                            <Typography
                              variant="24px/800/32.78px"
                              className="mob:row-start-2"
                            >
                              {title}
                            </Typography>
                          </div>
                          <div className="flex items-center gap-6 mob:justify-between mob:w-full">
                            <div className="flex items-center gap-2">
                              <Typography
                                variant="16px/600/21.86px"
                                className="text-black-5"
                              >
                                {location}
                              </Typography>
                              <div />
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
                              <div>
                                <Typography
                                  variant="14px/500/19.12px"
                                  className="text-black-4"
                                >
                                  @Household
                                </Typography>
                                <Typography
                                  variant="18px/600/24.59px"
                                  className="text-black-2"
                                >
                                  {householdName || "Anonymous"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 justify-end mob:justify-start mob:grid">
                            <Link href={`/tradies-before-applying/${id}`}>
                              <Button
                                size="ghost"
                                variant="ghost"
                                className="justify-start"
                              >
                                View listing
                              </Button>
                            </Link>
                            <Link href={`/tradies-apply-for-listing/${id}`}>
                              <Button>Apply for listing</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Pagination Controls - Only show if we have data and more than 1 page */}
            {!isLoading && totalFilteredListings > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent className="flex items-center space-x-1">
                    {/* Previous Button */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(page - 1)}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full cursor-pointer",
                          page === 1 ? "text-gray-400 cursor-not-allowed" : ""
                        )}
                        aria-disabled={page === 1}
                      />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {getPageNumbers().map((pageNum, index) => {
                      // Handle ellipsis
                      if (pageNum < 0) {
                        return (
                          <PaginationItem key={`ellipsis-${pageNum}`}>
                            <span className="w-10 h-10 flex items-center justify-center text-[#495057]">
                              ...
                            </span>
                          </PaginationItem>
                        );
                      }

                      return (
                        <PaginationItem key={`page-${pageNum}`}>
                          <button
                            onClick={() => handlePageChange(pageNum)}
                            className={cn(
                              "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                              page === pageNum
                                ? "bg-[#FF8534] text-white"
                                : "text-[#495057] hover:bg-[#f0f0f0]"
                            )}
                            aria-label={`Go to page ${pageNum}`}
                            aria-current={page === pageNum ? "page" : undefined}
                          >
                            {pageNum}
                          </button>
                        </PaginationItem>
                      );
                    })}

                    {/* Next Button */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(page + 1)}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full cursor-pointer",
                          page === totalPages ? "text-gray-400 cursor-not-allowed" : ""
                        )}
                        aria-disabled={page === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
      </Suspense>
  );
}