"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Award,
  ChevronDown,
  Medal,
  Repeat,
  Settings,
  Trophy,
  Zap,
} from "lucide-react";
import * as React from "react";

type Donation = {
  _id: string;
  creatorId: string;
  amount: number;
  is_monthly: boolean;
  name?: string;
  email: string;
  message?: string;
  tier: "Gold" | "Silver" | "Bronze";
};

const data: Donation[] = [
  {
    _id: "don_001",
    creatorId: "user_abc123",
    amount: 100,
    is_monthly: true,
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Thanks for your great work!",
    tier: "Gold",
  },
  {
    _id: "don_002",
    creatorId: "user_xyz456",
    amount: 25,
    is_monthly: false,
    name: "John Smith",
    email: "john.smith@example.com",
    tier: "Silver",
  },
  {
    _id: "don_003",
    creatorId: "user_def789",
    amount: 5,
    is_monthly: true,
    name: "Anonymous",
    email: "anon@example.com",
    message: "Small token of appreciation 🙌",
    tier: "Bronze",
  },
  {
    _id: "don_004",
    creatorId: "user_qwe321",
    amount: 60,
    is_monthly: false,
    name: "Emily R.",
    email: "emily.r@example.com",
    tier: "Silver",
  },
  {
    _id: "don_005",
    creatorId: "user_asd654",
    amount: 250,
    is_monthly: true,
    name: "Anonymous",
    email: "goldfan@example.com",
    message: "This project deserves more support!",
    tier: "Gold",
  },
  {
    _id: "don_006",
    creatorId: "user_zxc987",
    amount: 10,
    is_monthly: false,
    name: "Anonymous",
    email: "someone@example.com",
    tier: "Bronze",
  },
];

const IsRecurringBadge = ({
  isMonthly,
}: {
  isMonthly: Donation["is_monthly"];
}) => {
  return (
    <Badge
      variant="secondary"
      className={`flex items-center gap-1 ${
        isMonthly
          ? "bg-green-100 text-green-800 hover:bg-green-100"
          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
      }`}
    >
      {isMonthly ? <Repeat className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
      {isMonthly ? "Recurring" : "One-time"}
    </Badge>
  );
};

const TierIcon = ({ tier }: { tier: Donation["tier"] }) => {
  const icons = {
    Bronze: <Medal className="h-4 w-4 text-[#cd7f32]" />,
    Silver: <Award className="h-4 w-4 text-[#c0c0c0]" />,
    Gold: <Trophy className="h-4 w-4 text-[#ffd700]" />,
  };

  return (
    <div className="flex items-center gap-2">
      {icons[tier]}
      <span>{tier}</span>
    </div>
  );
};

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "is_monthly",
    header: "Recurring",
    cell: ({ row }) => (
      <IsRecurringBadge isMonthly={row.getValue("is_monthly")} />
    ),
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => <TierIcon tier={row.getValue("tier")} />,
  },
];

export function NewsletterTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Donation List</h1>
          <p className="text-muted-foreground">Recent donations are here</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Settings className="h-4 w-4" />
              View
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
