"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnDef,
    VisibilityState,
    SortingState,
    RowSelectionState
} from "@tanstack/react-table";
import { MoreHorizontal, ChevronDown, Trash, Edit2, CheckCircle2, CircleDotDashed } from "lucide-react";
import { useAuth } from "../contexts/authContext";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
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
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Recipe {
    id: string;
    image: string;
    name: string;
    category: string;
    slug: string;
    status: string;
}

interface User {
    username?: string;
    [key: string]: unknown;  // Utilisez unknown au lieu de any
}

export default function RecetteTable() {
    const { user } = useAuth() as { user: User | null };
    const data: Recipe[] = [
        {
            id: "1",
            image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/tartes-pommes.jpg",
            name: "Pâtes Carbonara",
            category: "Italienne",
            slug: "pates",
            status: "En attente de validation",
        },
        {
            id: "2",
            image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/tartes-pommes.jpg",
            name: "Sushi",
            category: "Japonaise",
            slug: "sushi",
            status: "En attente de validation",
        },
        {
            id: "3",
            image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/tartes-pommes.jpg",
            name: "Tacos",
            category: "Mexicaine",
            slug: "tacos",
            status: "Publiée",
        },
    ];

    const columns: ColumnDef<Recipe>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "slug",
            header: "Slug",
            enableHiding: false,
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <img
                    src={row.getValue("image")}
                    alt={row.getValue("name")}
                    width={24}
                    height={24}
                    className="w-5 h-5 rounded-md object-cover"
                ></img>
            ),
        },
        {
            accessorKey: "name",
            header: "Nom",
            cell: ({ row }) => (
                <Link href={`/${user?.username}/${row.getValue("slug")}`}>
                    {row.getValue("name")}
                </Link>
            ),
        },
        {
            accessorKey: "category",
            header: "Catégorie",
            cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
        },
        {
            accessorKey: "status",
            header: "Statut",
            cell: ({ row }) => (
                <Badge className="gap-1" variant={row.getValue("status") === "Publiée" ? "default" : "destructive"}>
                    {row.getValue("status") === "Publiée" ? <CheckCircle2 width={16} /> : <CircleDotDashed width={16} />}
                    {row.getValue("status")}
                </Badge>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Edit2 className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        slug: false
    });
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    });

    const selectedRowCount = Object.keys(rowSelection).length;

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full max-w-5xl">
            <div className="flex items-center py-4 w-full">
                <Input
                    placeholder="Rechercher une recette..."
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colonnes <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button
                    variant="destructive"
                    className="ml-4"
                    disabled={selectedRowCount === 0}
                >
                    Supprimer ({selectedRowCount})
                </Button>
            </div>
            <div className="rounded-md border w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Aucune recette trouvée.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}