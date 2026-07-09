import { Head } from '@/Layout/Head';
import { Link, useRouter } from '@inertiajs/inertia-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/Pagination';
import { useState } from 'react';

export default function Index({ banks }: { banks: any[] }) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const router = useRouter();

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(banks.map(b => b.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        }
    };

    const deleteSelected = () => {
        if (selectedIds.length === 0) return;
        if (!window.confirm('Apakah Anda yakin ingin menghapus bank yang dipilih?')) return;
        // We'll use the POST method with _method=DELETE? Actually we have a separate route for bulk delete?
        // For simplicity, we'll loop (not ideal) or we need to implement a bulk delete route.
        // Since we didn't define a bulk delete route, we'll just delete one by one (not efficient but okay for demo).
        // In a real app, you'd add a destroyMany route.
        alert('Fitur hapus massal belum diimplementasi');
    };

    return (
        <>
            <Head title="Master Bank" />
            <div className="pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold">Master Bank</h1>
                    <div className="space-x-3">
                        <Link
                            href={route('master-bank.create')}
                            className={Button}
                        >
                            Tambah Bank
                        </Link>
                        {selectedIds.length > 0 && (
                            <Button
                                variant="destructive"
                                onClick={deleteSelected}
                            >
                                Hapus Terpilih ({selectedIds.length})
                            </Button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-4">
                                    <Checkbox
                                        checked={selectedIds.length === banks.length}
                                        indeterminate={selectedIds.length > 0 && selectedIds.length < banks.length}
                                        onChange={handleSelectAll}
                                        className="h-4 w-4"
                                    />
                                </TableHead>
                                <TableHead>Nama Bank</TableHead>
                                <TableHead>Kode Bank</TableHead>
                                <TableHead>Cabang</TableHead>
                                <TableHead>Rekening Default</TableHead>
                                <TableHead className="text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banks.map((bank) => (
                                <TableRow key={bank.id} className="hover:bg-gray-50">
                                    <TableCell className="w-4">
                                        <Checkbox
                                            checked={selectedIds.includes(bank.id)}
                                            onChange={(e) => handleSelect(bank.id, e)}
                                            className="h-4 w-4"
                                        />
                                    </TableCell>
                                    <TableCell>{bank.nama_bank}</TableCell>
                                    <TableCell>{bank.kode_bank}</TableCell>
                                    <TableCell>{bank.cabang}</TableCell>
                                    <TableCell>{bank.rekening_default}</TableCell>
                                    <TableCell className="text-sm text-center">
                                        <Link
                                            href={route('master-bank.edit', bank.id)}
                                            className="text-sm text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (
                                                    window.confirm(
                                                        'Apakah Anda yakin ingin menghapus bank ini?'
                                                    )
                                                ) {
                                                    router.delete(
                                                        route('master-bank.destroy', bank.id)
                                                    );
                                                }
                                            }}
                                            className="inline-block"
                                        >
                                            <button
                                                type="submit"
                                                className="text-sm text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        Menampilkan {banks.length} bank
                    </p>
                    {/* Pagination would go here if we were using paginated data */}
                </div>
            </div>
        </>
    );
}