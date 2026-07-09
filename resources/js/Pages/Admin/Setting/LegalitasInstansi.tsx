import { Head } from '@/Layout/Head';
import { useForm } from '@inertiajs/inertia-react';
import { useRouter } from '@inertiajs/inertia-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from '@inertiajs/inertia-react';

export default function LegalitasInstansi({ profileSekolah, setting }: { profileSekolah: any; setting: any }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        // fields not used in this form but needed for submit
        nama_sekolah: profileSekolah?.nama_sekolah ?? '',
        alamat: profileSekolah?.alamat ?? '',
        logo_url: profileSekolah?.logo ?? '',
        facebook: profileSekolah?.facebook ?? '',
        twitter: profileSekolah?.twitter ?? '',
        instagram: profileSekolah?.instagram ?? '',
        npsn: setting?.npsn ?? '',
        akreditasi: setting?.akreditasi ?? '',
        nama_kepala_sekolah: setting?.nama_kepala_sekolah ?? '',
        nip_kepala_sekolah: setting?.nip_kepala_sekolah ?? '',
        tema: setting?.tema ?? 'navy',
        hero_media_type: setting?.hero_media_type ?? 'foto',
        hero_media_url: setting?.hero_media_url ?? '',
    });

    const router = useRouter();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('settings.update'), {
            onSuccess: () => {
                toast.success('Pengaturan berhasil disimpan.');
                router.visit(route('settings'));
            },
            onError: () => {
                toast.error('Terjadi kesalahan, silakan coba lagi');
            },
        });
    };

    return (
        <>
            <Head title="Legalitas Instansi" />
            <div className="pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold">Legalitas Instansi</h1>
                    <Link href={route('settings')} className={Button} variant="secondary">
                        Kembali
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="npsn">NPSN</Label>
                        <Input
                            id="npsn"
                            type="text"
                            value={data.npsn}
                            onChange={(e) => setData('npsn', e.target.value)}
                            disabled={processing}
                            className={errors.npsn ? 'border-red-500' : undefined}
                        />
                        {errors.npsn && (
                            <p className="text-sm text-red-600 mt-1">{errors.npsn}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="akreditasi">Akreditasi</Label>
                        <Input
                            id="akreditasi"
                            type="text"
                            value={data.akreditasi}
                            onChange={(e) => setData('akreditasi', e.target.value)}
                            disabled={processing}
                            className={errors.akreditasi ? 'border-red-500' : undefined}
                        />
                        {errors.akreditasi && (
                            <p className="text-sm text-red-600 mt-1">{errors.akreditasi}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="nama_kepala_sekolah">Nama Kepala Sekolah</Label>
                        <Input
                            id="nama_kepala_sekolah"
                            type="text"
                            value={data.nama_kepala_sekolah}
                            onChange={(e) => setData('nama_kepala_sekolah', e.target.value)}
                            disabled={processing}
                            className={errors.nama_kepala_sekolah ? 'border-red-500' : undefined}
                        />
                        {errors.nama_kepala_sekolah && (
                            <p className="text-sm text-red-600 mt-1">{errors.nama_kepala_sekolah}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="nip_kepala_sekolah">NIP Kepala Sekolah</Label>
                        <Input
                            id="nip_kepala_sekolah"
                            type="text"
                            value={data.nip_kepala_sekolah}
                            onChange={(e) => setData('nip_kepala_sekolah', e.target.value)}
                            disabled={processing}
                            className={errors.nip_kepala_sekolah ? 'border-red-500' : undefined}
                        />
                        {errors.nip_kepala_sekolah && (
                            <p className="text-sm text-red-600 mt-1">{errors.nip_kepala_sekolah}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}