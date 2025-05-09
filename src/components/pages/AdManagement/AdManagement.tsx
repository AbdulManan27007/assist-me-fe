"use client";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/ui/table";
import { InfoCard } from "@/components/core/InfoCard";
import { DataTable } from "@/components/ui/data-table";
import { Typography } from "@/components/core/Typography";
import { Category, Location } from "@/globalContext/globalContext";
import { DeleteIcon, EditIcon, SearchIcon, VisibilityIcon } from "@/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleListing, useDeleteListingMutation, useGetListingsQuery } from "@/store/adminDashboard/listingsApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Toast from "@/components/ui/toast";
import { AdEditModal } from "@/components/ui/AdEditModal";
import { AdViewModal } from "@/components/ui/AdViewModal";

export function AdManagement() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, isLoading, error } = useGetListingsQuery({ 
    page: 1, 
    // limit: 10, 
    sortBy: "id", 
    sortOrder: "asc" 
  });
  const [deleteAd] = useDeleteListingMutation();
  const [selectedAd, setSelectedAd] = useState<SingleListing | null>(null);
  const [adToDelete, setAdToDelete] = useState<SingleListing | null>(null);
  const [adToEdit, setAdToEdit] = useState<SingleListing | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

    // Open View Modal
    const handleOpenModal = (ad: SingleListing) => setSelectedAd(ad);
    const handleCloseModal = () => setSelectedAd(null);

      // Handle Delete Ad
  const handleDeleteClick = (ad: SingleListing) => {
    setAdToDelete(ad);
  };

  const confirmDelete = async () => {
    if (adToDelete) {
      try {
        await deleteAd(adToDelete.id).unwrap();
        setToast({ message: "Ad deleted successfully!", type: "success" });
      } catch (error) {
        setToast({ message: "Failed to delete ad!", type: "error" });
        console.error("Error deleting ad:", error);
      }
      setAdToDelete(null);
      setTimeout(() => {
        setToast(null);
      }, 4000);
    }
  };


  // Handle Edit Ad
  const handleEditClick = (ad: SingleListing) => {
    setAdToEdit(ad);
  };

  const handleEditSuccess = () => {
    setToast({ message: "Ad updated successfully!", type: "success" });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleEditError = (error: any) => {
    setToast({ 
      message: error.data?.message || "Failed to update ad!", 
      type: "error" 
    });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };



  const filteredListings = data?.listings
    ? {
        active: data.listings.active.filter((listing) =>
          listing.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        ),
        inactive: data.listings.inactive.filter((listing) =>
          listing.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        ),
      }
    : { active: [], inactive: [] };

  const tabs = [
    {
      name: "Active",
      listings: filteredListings.active || [],
    },
    {
      name: "Inactive",
      listings: filteredListings.inactive || [],
    },
  ];

  const bundleActions = [
    { id: "0", name: "Delete" },
    { id: "1", name: "Edit" },
    { id: "2", name: "Duplicate" },
  ];

  const [bundleAction, setBundleAction] =
    useState<(typeof bundleActions)[number]["id"]>();

  const columns: ColumnDef<(typeof tabs)[number]["listings"][number]>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => <ColumnHeader column={column} title="Title" />,
      cell: ({ row }) => (
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <Typography
            variant="14px/400/21px"
            className="whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {row.original.title}
          </Typography>
        </label>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    },
    {
      accessorKey: "location",
      header: ({ column }) => <ColumnHeader column={column} title="Location" />,
    },
    {
      accessorKey: "price_type",
      header: ({ column }) => <ColumnHeader column={column} title="Type" />,
    },
    {
      accessorKey: "price",
      header: ({ column }) => <ColumnHeader column={column} title="Pricing" />,
      cell: ({ row }) => (
        <Typography variant="14px/400/21px">
          A$ {row.original.price}
        </Typography>
      ),
    },
    {
      accessorKey: "start_date",
      header: ({ column }) => <ColumnHeader column={column} title="Date" />,
      cell: ({ row }) => (
        <Typography variant="14px/400/21px">
          {new Intl.DateTimeFormat("en-AU").format(new Date(row.original.start_date))}
        </Typography>
      ),
    },
    {
      accessorKey: "end_date",
      header: ({ column }) => <ColumnHeader column={column} title="Expiry" />,
      cell: ({ row }) => (
        <Typography variant="14px/400/21px">
          {new Intl.DateTimeFormat("en-AU").format(new Date(row.original.end_date))}
        </Typography>
      ),
    },
    {
      accessorKey: "household_name",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Household" />
      ),
    },
    {
      accessorKey: "tradie_name",
      header: ({ column }) => <ColumnHeader column={column} title="Tradie" />,
    },
    {
      accessorKey: "id",
      header: () => <></>,
      cell: ({ row }) => (
        <div className="flex items-center gap-3 justify-end">
          <VisibilityIcon className="w-5 h-5 fill-black-1 hover:cursor-pointer" onClick={() => handleOpenModal(row.original)} />

          <EditIcon
            className="w-5 h-5 fill-black-1 hover:cursor-pointer"
            onClick={() => handleEditClick(row.original)}
          />

          <DeleteIcon
            className="w-5 h-5 fill-destructive cursor-pointer"
            onClick={() => handleDeleteClick(row.original)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="desk:p-12">
      <div className="max-w-[1200px] mx-auto desk:border border-[#0000001A] rounded-[20px]">
        <Tabs defaultValue={tabs.at(0)?.name}>
          <TabsList className="grid w-full p-[24px_24px_0px_24px] border-[#0000001A]">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                <div className="flex items-center gap-1.5 pb-4 text-inherit">
                  <Typography
                    variant="16px/700/21.86px"
                    className="text-inherit"
                  >
                    {tab.name}
                  </Typography>
                  <div className="bg-[color-mix(in_srgb,_currentColor_20%,_transparent)] rounded-[4px] px-2.5 py-1.5 text-inherit">
                    <Typography
                      variant="14px/600/19.12px"
                      className="text-inherit"
                    >
                      {tab.listings.length}
                    </Typography>
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="py-8 px-6 flex items-center justify-between mob:grid mob:gap-6 mob:justify-stretch">
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox />

              <Select
                onValueChange={setBundleAction}
                defaultValue={bundleAction}
              >
                <SelectTrigger className="bg-transparent border-none outline-none py-0 pl-0 pr-[24px] w-fit [&>svg]:right-0">
                  <Typography variant="16px/400/21.86px">
                    {bundleAction
                      ? bundleActions.find(
                          (action) => action.id === bundleAction
                        )?.name
                      : "Select Bundle action"}
                  </Typography>
                </SelectTrigger>
                <SelectContent>
                  {bundleActions.map((action) => (
                    <SelectItem key={action.id} value={action.id}>
                      {action.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <Input
              value={search}
              icon={<SearchIcon className="fill-black-1" />}
              placeholder="Search..."
              className="w-full sm:max-w-[300px] h-[56px]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.name}>
              <div className="mob:hidden">
                <DataTable columns={columns} data={tab.listings}  isLoading={isLoading} error={error}/>
              </div>

              <div className="desk:hidden">
                <div className="px-6 grid gap-3">
                  {tab.listings.map(({ id, ...listingWithoutId }) => (
                    <InfoCard key={id} data={listingWithoutId} />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <AdViewModal isOpen={!!selectedAd} onClose={handleCloseModal} ad={selectedAd} />

      {adToDelete && (
        <Dialog open={!!adToDelete} onOpenChange={() => setAdToDelete(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete <strong>{adToDelete.title}</strong>?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setAdToDelete(null)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>Yes, Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {adToEdit && <AdEditModal isOpen={!!adToEdit} onClose={() => setAdToEdit(null)} ad={adToEdit} onSuccess={handleEditSuccess} onError={handleEditError} />}

      {toast && <Toast message={toast.message} type={toast.type} duration={4000} />}
    </div>
  );
}
