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
import { DataTable } from "@/components/ui/data-table";
import { Typography } from "@/components/core/Typography";
import { Category, Location } from "@/globalContext/globalContext";
import { DeleteIcon, EditIcon, SearchIcon, VisibilityIcon } from "@/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCard } from "@/components/core/InfoCard";
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/users/userApi";
import { GetUser } from "@/store/type";
import { UserProfileViewModal } from "@/components/ui/UserProfileViewModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Toast from "@/components/ui/toast";
import { UserProfileEditModal } from "@/components/ui/UserProfileEditModal";

export function UserManagement() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [search, setSearch] = useState("");
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState<GetUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<GetUser | null>(null);
  const [userToEdit, setUserToEdit] = useState<GetUser | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
      }, 400);
  
      return () => clearTimeout(handler);
    }, [search]);

  const handleOpenModal = (user: GetUser) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  const filteredUsers = users
    ? users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];

  const handleDeleteClick = (user: GetUser) => {
    setUserToDelete(user);
  };

   const confirmDelete = async () => {
     if (userToDelete) {
      try {
        await deleteUser(userToDelete.id).unwrap();
        setToast({ message: "User deleted successfully!", type: "success" });
      } catch (error) {
        setToast({ message: "Failed to delete user!", type: "error" });
        console.error("Error deleting user:", error);
      }
      setUserToDelete(null);
      setTimeout(() => {
        setToast(null);
      }, 4000);
    }
  };

  const handleEditClick = (user: GetUser) => {
    setUserToEdit(user);
  };

  const handleEditSuccess = () => {
    setToast({ message: "User updated successfully!", type: "success" });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleEditError = (error: any) => {
    setToast({ 
      message: error.data?.message || "Failed to update user!", 
      type: "error" 
    });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const tabs = [
    {
      name: "Tradies",
      users: filteredUsers?.filter((user) => user.role === "tradie") || [],
    },
    {
      name: "Households",
      users: filteredUsers?.filter((user) => user.role === "household") || [],
    },
  ];

  const bundleActions = [
    { id: "0", name: "Delete" },
    { id: "1", name: "Edit" },
    { id: "2", name: "Duplicate" },
  ];

  const [bundleAction, setBundleAction] = useState(bundleActions[0].id);

  const columns: ColumnDef<(typeof tabs)[number]["users"][number]>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => <ColumnHeader column={column} title="Username" />,
      cell: ({ row }) => (
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <Typography variant="14px/400/21px" className="whitespace-nowrap">
            {row.original.username}
          </Typography>
        </label>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    },
    {
      accessorKey: "category",
      header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    },
    {
      accessorKey: "address",
      header: ({ column }) => <ColumnHeader column={column} title="Location" />,
    },
    {
      accessorKey: "ratings",
      header: ({ column }) => <ColumnHeader column={column} title="Ratings" />,
    },
    {
      accessorKey: "reviews",
      header: ({ column }) => <ColumnHeader column={column} title="Reviews" />,
    },
    {
      accessorKey: "inProgress",
      header: ({ column }) => (
        <ColumnHeader column={column} title="In Progress" />
      ),
    },
    {
      accessorKey: "completed",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Completed" />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => <></>,
      cell: ({ row }) => (
        <div className="flex items-center gap-3 justify-end">
          <VisibilityIcon className="w-5 h-5 fill-black-1 hover:cursor-pointer" onClick={() => handleOpenModal(row.original)}
          />

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
    <div className="p-0 sm:p-8 md:p-12">
      <div className="max-w-[1200px] mx-auto border border-[#0000001A] rounded-[20px]">
        <Tabs defaultValue={tabs.at(0)?.name}>
          <TabsList className="grid w-full p-[24px_24px_0px_24px] border-[#0000001A]">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                <div className="flex items-center gap-1.5 pb-4 text-inherit ">
                  <Typography
                    variant="16px/700/21.86px"
                    className="text-inherit"
                  >
                    {tab.name}
                  </Typography>
                  <div className="bg-[color-mix(in_srgb,_currentColor_20%,_transparent)] rounded-[4px] mob:px-1 px-2.5 py-1.5 text-inherit">
                    <Typography
                      variant="14px/600/19.12px"
                      className="text-inherit"
                    >
                      {tab.users.length}
                    </Typography>
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="py-8 px-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
            {/* <label className="flex items-center gap-3 cursor-pointer">
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
            </label> */}
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
              <div className="block">
                <DataTable columns={columns} data={tab.users} isLoading={isLoading} error={error}/>
              </div>
              {/* <div className="sm:hidden">
                <div className="px-6 grid gap-3">
                  {tab.users
                    .filter((user) =>
                      user.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map(({ id, ...userWithoutId }) => (
                      <InfoCard key={id} data={userWithoutId} />
                    ))}
                </div>
              </div> */}
            </TabsContent>
          ))}
        </Tabs>
      </div>

       <UserProfileViewModal isOpen={!!selectedUser} onClose={handleCloseModal} user={selectedUser} />

        {userToDelete && (
          <div className="flex items-center justify-center my-auto">
            <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setUserToDelete(null)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    Yes, Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {userToEdit && (
          <UserProfileEditModal
            isOpen={!!userToEdit}
            onClose={() => setUserToEdit(null)}
            user={userToEdit}
            onSuccess={handleEditSuccess}
            onError={handleEditError}
          />
        )}

        {toast && <Toast message={toast.message} type={toast.type} duration={4000}/>}

    </div>
  );
}