import { Head } from '@/Layout/Head';
import { useForm } from '@inertiajs/inertia-react';
import { useRouter } from '@inertiajs/inertia-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from '@inertiajs/inertia-react';

export default function DataInstansi({ profileSekolah, setting }: { profileSekolah: any; setting: any }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        nama_sekolah: profileSekolah?.nama_sekolah ?? '',
        alamat: profileSekolah?.alamat ?? '',
        logo_url: profileSekolah?.logo ?? '',
        facebook: profileSekolah?.facebook ?? '',
        twitter: profileSekolah?.twitter ?? '',
        instagram: profileSekolah?.instagram ?? '',
        // fields not used in this form but needed for submit
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
            <Head title="Data Instansi" />
            <div className="pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold">Data Instansi</h1>
                    <Link href={route('settings')} className={Button} variant="secondary">
                        Kembali
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="nama_sekolah">Nama Sekolah</Label>
                        <Input
                            id="nama_sekolah"
                            type="text"
                            value={data.nama_sekolah}
                            onChange={(e) => setData('nama_sekolah', e.target.value)}
                            disabled={processing}
                            className={errors.nama_sekolah ? 'border-red-500' : undefined}
                        />
                        {errors.nama_sekolah && (
                            <p className="text-sm text-red-600 mt-1">{errors.nama_sekolah}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            id="alamat"
                            type="text"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            disabled={processing}
                            className={errors.alamat ? 'border-red-500' : undefined}
                        />
                        {errors.alamat && (
                            <p className="text-sm text-red-600 mt-1">{errors.alamat}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="logo_url">Logo URL</Label>
                        <Input
                            id="logo_url"
                            type="text"
                            value={data.logo_url}
                            onChange={(e) => setData('logo_url', e.target.value)}
                            disabled={processing}
                            className={errors.logo_url ? 'border-red-500' : undefined}
                        />
                        {errors.logo_url && (
                            <p className="text-sm text-red-600 mt-1">{errors.logo_url}</p>
                        )}
                        {data.logo_url && (
                            <div className="mt-2">
                                <img
                                    src={data.logo_url}
                                    alt="Preview logo"
                                    className="max-w-xs rounded border"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                            id="facebook"
                            type="text"
                            value={data.facebook}
                            onChange={(e) => setData('facebook', e.target.value)}
                            disabled={processing}
                            className={errors.facebook ? 'border-red-500' : undefined}
                        />
                        {errors.facebook && (
                            <p className="text-sm text-red-600 mt-1">{errors.facebook}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                            id="twitter"
                            type="text"
                            value={data.twitter}
                            onChange={(e) => setData('twitter', e.target.value)}
                            disabled={processing}
                            className={errors.twitter ? 'border-red-500' : undefined}
                        />
                        {errors.twitter && (
                            <p className="text-sm text-red-600 mt-1">{errors.twitter}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                            id="instagram"
                            type="text"
                            value={data.instagram}
                            onChange={(e) => setData('instagram', e.target.value)}
                            disabled={processing}
                            className={errors.instagram ? 'border-red-500' : undefined}
                        />
                        {errors.instagram && (
                            <p className="text-sm text-red-600 mt-1">{errors.instagram}</p>
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