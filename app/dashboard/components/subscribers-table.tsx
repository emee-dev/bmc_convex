"use client";

import * as React from "react";
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
  ChevronDown,
  Filter,
  Mail,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: "Active" | "Suspended" | "Invited" | "Inactive";
  role: "Admin" | "Manager" | "Superadmin" | "Cashier";
};

const data: User[] = [
  {
    id: "1",
    username: "theron.vandervort",
    name: "Theron Vandervort",
    email: "theron.raynor62@yahoo.com",
    phoneNumber: "+19507004811",
    status: "Suspended",
    role: "Admin",
  },
  {
    id: "2",
    username: "carolyne_carter44",
    name: "Carolyne Carter",
    email: "carolyne_haley37@yahoo.com",
    phoneNumber: "+18647600363",
    status: "Active",
    role: "Manager",
  },
  {
    id: "3",
    username: "rashad.mills41",
    name: "Rashad Mills",
    email: "rashad_cronin53@gmail.com",
    phoneNumber: "+19698869892",
    status: "Suspended",
    role: "Superadmin",
  },
  {
    id: "4",
    username: "isabell.runolfsson",
    name: "Isabell Runolfsson",
    email: "isabell.franey@gmail.com",
    phoneNumber: "+15467483476",
    status: "Invited",
    role: "Manager",
  },
  {
    id: "5",
    username: "jessika_borer78",
    name: "Jessika Borer",
    email: "jessika18@yahoo.com",
    phoneNumber: "+17686278470",
    status: "Invited",
    role: "Admin",
  },
  {
    id: "6",
    username: "esteban.zemlak95",
    name: "Esteban Zemlak",
    email: "esteban59@yahoo.com",
    phoneNumber: "+12539650420",
    status: "Suspended",
    role: "Admin",
  },
  {
    id: "7",
    username: "davion.marquardt46",
    name: "Davion Marquardt",
    email: "davion_feest92@yahoo.com",
    phoneNumber: "+18677224171",
    status: "Active",
    role: "Superadmin",
  },
  {
    id: "8",
    username: "antoinette.predovic",
    name: "Antoinette Predovic",
    email: "antoinette_mraz39@gmail.com",
    phoneNumber: "+15225647172",
    status: "Active",
    role: "Cashier",
  },
  {
    id: "9",
    username: "stone.bergnaum",
    name: "Stone Bergnaum",
    email: "stone65@hotmail.com",
    phoneNumber: "+18465739370",
    status: "Inactive",
    role: "Admin",
  },
];

const StatusBadge = ({ status }: { status: User["status"] }) => {
  const variants = {
    Active: "bg-green-100 text-green-800 hover:bg-green-100",
    Suspended: "bg-red-100 text-red-800 hover:bg-red-100",
    Invited: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    Inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };

  return (
    <Badge variant="secondary" className={variants[status]}>
      {status}
    </Badge>
  );
};

const RoleIcon = ({ role }: { role: User["role"] }) => {
  const icons = {
    Admin: <Shield className="h-4 w-4" />,
    Manager: <User className="h-4 w-4" />,
    Superadmin: <ShieldCheck className="h-4 w-4" />,
    Cashier: <Settings className="h-4 w-4" />,
  };

  return (
    <div className="flex items-center gap-2">
      {icons[role]}
      <span>{role}</span>
    </div>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("username")}</div>
    ),
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
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <RoleIcon role={row.getValue("role")} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View user</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function SubscribersTable() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subscribers</h1>
          <p className="text-muted-foreground">
            Manage your newsletter subscribers here.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Mail className="h-4 w-4" />
            Invite User
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter users..."
              value={
                (table.getColumn("username")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("username")?.setFilterValue(event.target.value)
              }
              className="pl-8 max-w-sm"
            />
          </div>
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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
