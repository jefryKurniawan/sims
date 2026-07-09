import { Head } from '@/Layout/Head';
import { useForm } from '@inertiajs/inertia-react';
import { useRouter, Link } from '@inertiajs/inertia-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_bank: '',
        kode_bank: '',
        cabang: '',
        rekening_default: '',
    });
    const router = useRouter();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('master-bank.store'), {
            onSuccess: () => {
                reset();
                toast.success('Bank berhasil ditambahkan');
            },
            onError: () => {
                toast.error('Terjadi kesalahan, silakan coba lagi');
            },
        });
    };

    return (
        <>
            <Head title="Tambah Bank" />
            <div className="pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold">Tambah Bank Baru</h1>
                    <Link
                        href={route('master-bank.index')}
                        className={Button}
                        variant="secondary"
                    >
                        Kembali
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="nama_bank">Nama Bank</Label>
                        <Input
                            id="nama_bank"
                            type="text"
                            value={data.nama_bank}
                            onChange={(e) => setData('nama_bank', e.target.value)}
                            disabled={processing}
                            className={errors.nama_bank ? 'border-red-500' : undefined}
                        />
                        {errors.nama_bank && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.nama_bank}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="kode_bank">Kode Bank</Label>
                        <Input
                            id="kode_bank"
                            type="text"
                            value={data.kode_bank}
                            onChange={(e) => setData('kode_bank', e.target.value)}
                            disabled={processing}
                            className={errors.kode_bank ? 'border-red-500' : undefined}
                        />
                        {errors.kode_bank && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.kode_bank}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="cabang">Cabang</Label>
                        <Input
                            id="cabang"
                            type="text"
                            value={data.cabang}
                            onChange={(e) => setData('cabang', e.target.value)}
                            disabled={processing}
                            className={errors.cabang ? 'border-red-500' : undefined}
                        />
                        {errors.cabang && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.cabang}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="rekening_default">Rekening Default</Label>
                        <Input
                            id="rekening_default"
                            type="text"
                            value={data.rekening_default}
                            onChange={(e) => setData('rekening_default', e.target.value)}
                            disabled={processing}
                            className={errors.rekening_default ? 'border-red-500' : undefined}
                        />
                        {errors.rekening_default && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.rekening_default}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}