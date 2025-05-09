import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { Typography } from "../core/Typography";
import {
  ArrowCalendarIcon,
  ArrowDropDownIcon,
  ArrowDropDownOutlinedIcon,
} from "@/icons";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
  return (
    <div className="border-t border-[#0000001A] flex items-center justify-between p-6">
      <div className="flex flex-1 items-center gap-2">
        <Typography variant="14px/400/21px">Rows per page</Typography>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger
            className="min-h-fit h-fit w-fit py-2 px-3 rounded-[4px]"
            icon={<ArrowDropDownOutlinedIcon />}
          >
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        {/* <Typography variant="14px/400/21px" className="text-black-4">
          {1 +
            table.getState().pagination.pageSize *
              table.getState().pagination.pageIndex}
          -
          {table.getState().pagination.pageSize *
            (table.getState().pagination.pageIndex + 1)}{" "}
          of {table.getFilteredRowModel().rows.length}
        </Typography> */}
        <Typography variant="14px/400/21px" className="text-black-4">
          {startRow}-{endRow} of {totalRows}
        </Typography>

        <div className="flex items-center gap-2">
          <Button
            size="ghost"
            variant="ghost"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-50"
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowCalendarIcon
              className="fill-black-1 h-6 w-6"
              direction="left"
            />
          </Button>
          <Button
            size="ghost"
            variant="ghost"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="disabled:opacity-50"
          >
            <span className="sr-only">Go to next page</span>
            <ArrowCalendarIcon className="fill-black-1 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
