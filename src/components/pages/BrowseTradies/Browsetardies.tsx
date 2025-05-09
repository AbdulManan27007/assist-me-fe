"use client";
import { SearchIcon, StarIcon, ArrowDropDownIcon, FiltersIcon } from "@/icons";
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
} from "@/globalContext/globalContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popup } from "./PopUp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Range } from "@/components/core/FindListingRange";
import { cn, daysAgo, formatDate } from "@/lib/utils";
import { Typography } from "@/components/core/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import RatingWithCheckbox from "../../ui/Rating";
import Badge from "../../ui/Badge";
import { useGetTradieListQuery } from "@/store/household/tradielist";



export function Browsetardies() {
  const [sortingMethod, setSortingMethod] = useState(SortingMethod.MOST_RECENT);
  const [visiblePopupId, setVisiblePopupId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    location?: string;
    category?: string;
  }>({
    location: undefined,
    category: undefined,
  });

  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  // Fetch tradie data using the API
  const {
    data: tradieData,
    error,
    isLoading,
  } = useGetTradieListQuery(undefined);

  // Filter and sort the tradie data
  const filteredTradies = tradieData
    ?.filter((tradie: any) => {
      return (
        (filters.category ? tradie.type === filters.category : true) &&
        (filters.location ? tradie.city === filters.location : true) &&
        (search
          ? tradie.name.toLowerCase().includes(search.toLowerCase())
          : true)
      );
    })
    .sort((a: any, b: any) => {
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

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const togglePopup = (id: number) => {
    if (visiblePopupId === id) {
      setVisiblePopupId(null); // Close the popup if it's already visible
    } else {
      setVisiblePopupId(id); // Open the popup for the clicked item
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Calculate paginated tradies
  const totalPages = Math.ceil(filteredTradies?.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTradies = filteredTradies?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          color="inherit"
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#FF7125",
            },
          }}
        />
      </Box>
    );
  if (error) return <p>Error fetching tasks</p>;

  return (
    <>
      <div className="p-[38px] mob:py-8 mob:px-6 bg-black-1">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mob:grid-cols-1">
          <Typography variant="32px/700/43.71px" className="text-white-1">
            Find Tradies
          </Typography>
          <div className="mob:grid mob:grid-cols-[1fr,_auto] mob:gap-4">
            <div>
              <Input
                full
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-[500px] mob:max-w-full"
                variant="dark"
                placeholder="Search..."
                icon={<SearchIcon />}
              />
            </div>
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
                    Filter Tradies
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
                  <div className="space-y-4">
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-2"
                    >
                      Rating
                    </Typography>
                    <RatingWithCheckbox />
                    <Button className="w-full "> View 30 results</Button>
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
              Filter Household
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

            <div className="space-y-4">
              <Typography variant="18px/700/24.59px" className="text-black-2">
                Rating
              </Typography>
              <RatingWithCheckbox />
              <Button className="w-full "> View 30 results</Button>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between mob:grid mob:gap-4">
              <Typography variant="24px/800/32.78px" className="text-black-2">
                {filteredTradies?.length} result
                {filteredTradies?.length > 1 ? "s" : ""}
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
            <div className="grid grid-cols-3 mob:grid-cols-1 gap-4 mx-auto">
              {currentTradies?.map((tradie: any) => {
                const badgeText = tradie.is_online
                  ? "Available now"
                  : "Available next week";
                const badgeColor = tradie.is_online ? "green" : "gray";

                return (
                  <div key={tradie.id}>
                    <div className="w-[236px] grid gap-4 border border-[#0000001A] rounded-[12px] p-6 mob:p-6 mob:gap-0 justify-center items-center">
                      <div className="flex flex-col justify-center items-center mob:grid mob:justify-stretch mob:gap-4">
                        <div className="relative flex flex-col items-center justify-center gap-3">
                          <img
                            src={tradie.picture || "/images/profile.png"}
                            alt={tradie.name}
                            className="w-[120px] h-[120px] rounded-full"
                          />
                          <Typography
                            variant="18px/600/24.59px"
                            className="text-black-2"
                          >
                            {tradie.name}
                          </Typography>
                          <div
                            className="absolute top-0 right-0 cursor-pointer"
                            onClick={() => handleFavoriteToggle(tradie.id)}
                          >
                            <Image
                              src={
                                favorites[tradie.id]
                                  ? "/icons/Heart_Fill.svg"
                                  : "/icons/Heart.svg"
                              }
                              width={15}
                              height={15}
                              alt="HeartIcon"
                            />
                          </div>
                          <div className="flex items-center">
                            <StarIcon />
                            <Typography
                              variant="14px/400/21px"
                              className="text-black-2"
                            >
                              {tradie.rating || "N/A"}
                            </Typography>
                            <Typography
                              variant="14px/400/21px"
                              className="text-black-2 opacity-60"
                            >
                              ({tradie.total_jobs || 0})
                            </Typography>
                          </div>
                          <Typography
                            variant="14px/400/21px"
                            className="text-black-2 opacity-60"
                          >
                            {tradie.total_jobs || 0} completed jobs
                          </Typography>
                          <Typography
                            variant="16px/400/24px"
                            className="text-black-5 truncate-lines-3 text-center"
                          >
                            {tradie.about_me}
                          </Typography>
                          <span className="w-fit">
                            <Badge color={badgeColor}>{badgeText}</Badge>
                          </span>
                          <Typography
                            variant="16px/400/21.86px"
                            className="text-black-5 truncate-lines-3 text-center"
                          >
                            <span className="text-[16px] text-black-2 font-bold ">
                              A${tradie.total_earnings}
                            </span>
                            /hour
                          </Typography>
                          <Button
                            onClick={() => {
                              togglePopup(tradie.id);
                              console.log("_____tradieId", tradie.id);
                            }}
                          >
                            Invite to Listing
                          </Button>
                          <Popup
                            isVisible={visiblePopupId === tradie.id}
                            onClose={() => {
                              console.log("_____userId", tradie.id);
                              togglePopup(tradie.id);
                            }}
                            userId={tradie.id}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <Pagination className="flex items-center">
            <PaginationContent className="flex space-x-2">
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  className="rounded-full px-4 py-2"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
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

              {currentPage > 4 && (
                <PaginationItem>
                  <PaginationLink className="text-[#495057] px-4 py-2">
                    ...
                  </PaginationLink>
                </PaginationItem>
              )}

              {Array.from({ length: 4 }, (_, index: any) => {
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

              {currentPage < totalPages - 3 && (
                <PaginationItem>
                  <PaginationLink className="text-[#495057] px-4 py-2">
                    ...
                  </PaginationLink>
                </PaginationItem>
              )}

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
                  className="rounded-full px-4 py-2"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
