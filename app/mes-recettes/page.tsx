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
    SortingState,
    VisibilityState,
} from "@tanstack/react-table";
import { MoreHorizontal, ChevronDown, Trash, Edit2, CheckCircle2, Utensils, Plus } from "lucide-react";

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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { confirm } from "@/hooks/confirm/ConfirmGlobal";
import { useRecipe } from "../contexts/recipeContext";

interface Recipe {
    id: number;
    image: string;
    label: string;
    slug: string;
    category?: {
        label: string;
    };
    user: {
        username: string;
    };
}

export default function RecetteTable() {
    const { recipes, loading, deleteRecipe: deleteRecipeHandler } = useRecipe();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

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
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => <img src={row.getValue("image")} alt={row.getValue("label")} width={24} height={24} className="w-5 h-5 rounded-md object-cover" />,
        },
        {
            accessorKey: "label",
            header: "Nom",
            cell: ({ row }) => (
                <Button href={`/${row.original.user.username}/${row.original.slug}`} variant={"link"}>
                    {row.getValue("label")}
                </Button>
            ),
        },
        {
            accessorKey: "category",
            header: "Catégorie",
            cell: ({ row }) => {
                const category = row.getValue("category") as { label: string } | undefined;
                return <Badge variant="outline">{category?.label || "Non spécifié"}</Badge>;
            },
        },
        {
            accessorKey: "status",
            header: "Statut",
            cell: () => (
                <Badge className="gap-1">
                    <CheckCircle2 width={16} />
                    Publiée
                </Badge>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit2 /> Modifier</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                            <Trash /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const handleDelete = async (id: number) => {
        try {
            const confirmed = await confirm({
                title: "Voulez-vous vraiment supprimer cette recette ?",
                content: "Cette recette et son contenu seront supprimés définitivement.",
            });

            if (confirmed) {
                await deleteRecipeHandler(id);
                toast.success("Recette supprimée avec succès!");
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression de la recette.");
            console.error("Erreur lors de la suppression de la recette:", error);
        }
    };

    const table = useReactTable({
        data: recipes,
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
                <Input placeholder="Rechercher une recette..." className="max-w-sm" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colonnes <ChevronDown />
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
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            [...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-5 w-5 rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-5 rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
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
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Utensils className="h-8 w-8 text-gray-400" />
                                        <div className="text-lg font-medium">Aucune recette trouvée</div>
                                        <div className="text-sm text-gray-500">
                                            Vous n'avez pas encore créé de recette.
                                        </div>
                                        <Button variant="outline" href="/ajouter-une-recette" className="mt-2">
                                            <Plus className="mr-2 h-4 w-4" /> Créer ma première recette
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
