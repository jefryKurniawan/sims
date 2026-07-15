import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Tbody, Td, Th, Tr } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Pagination } from "@/Components/Frontend/Pagination";
import { useState } from "react";

export default function StafIndex({ staf }) {
    const {
        data: formData,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        nama: "",
        email: "",
        username: "",
        role: "",
        status: "",
        foto_profile: null,
        nip: "",
        mengajar: "",
        linkidln: "",
        instagram: "",
        website: "",
        facebook: "",
        twitter: "",
        youtube: "",
    });

    const [search, setSearch] = useState("");

    const filteredStaf = staf.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()),
    );

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleDelete = (id) => {
        if (
            window.confirm("Apakah Anda yakin ingin menghapus data staf ini?")
        ) {
            router.delete(route("users.staf.destroy", id), {
                onSuccess: () => {
                    // Optionally show a success message
                },
                onError: (error) => {
                    console.error("Delete error:", error);
                },
            });
        }
    };

    return (
        <>
            <Head title="Data Staf" />
            <div className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Data Staf
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Cari nama atau email..."
                                value={search}
                                onChange={handleSearchChange}
                                className="px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-[200px] sm:w-auto"
                            />
                        </div>
                        <Link
                            href={route("users.staf.create")}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Tambah Staf
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    No
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Nama
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Email
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    NIP
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Mengajar
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Status
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaf.map((sta, index) => (
                                <tr
                                    key={sta.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap flex items-center gap-3">
                                        {sta.foto_profile ? (
                                            <img
                                                src={`/storage/images/profile/${sta.foto_profile}`}
                                                alt="Foto Profil"
                                                className="h-8 w-8 rounded-full object-cover border border-gray-200"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                ?
                                            </div>
                                        )}
                                        <div>{sta.name}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                        {sta.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                        {sta.userDetail?.nip ?? "-"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                        {sta.userDetail?.mengajar ?? "-"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                        <Badge
                                            variant={
                                                sta.status === "Aktif"
                                                    ? "default"
                                                    : "destructive"
                                            }
                                            className="text-xs px-2.5 py-0.5"
                                        >
                                            {sta.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                        <DropdownMenu className="w-[80px]">
                                            <DropdownMenuTrigger className="w-full h-full flex items-center justify-center">
                                                <MoreHorizontal className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48 right-0">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                "users.staf.edit",
                                                                sta.id,
                                                            ),
                                                        )
                                                    }
                                                    className="px-4 py-2 text-sm hover:bg-primary/10"
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(sta.id)
                                                    }
                                                    className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
                                                >
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            {filteredStaf.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-4 py-3 text-center text-gray-500"
                                    >
                                        Tidak ada data staf.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination will be implemented if needed with paginate() */}
                {/* For now, we show all data */}
            </div>
        </>
    );
}
