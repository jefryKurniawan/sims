import { Head } from '@/Layout/Head';
import { useForm } from '@inertiajs/inertia-react';
import { useRouter } from '@inertiajs/inertia-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from '@inertiajs/inertia-react';

export default function KonfigurasiWeb({ profileSekolah, setting }: { profileSekolah: any; setting: any }) {
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
            <Head title="Konfigurasi Web" />
            <div className="pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold">Konfigurasi Web</h1>
                    <Link href={route('settings')} className={Button} variant="secondary">
                        Kembali
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label>Pilih Tema</Label>
                        <select
                            value={data.tema}
                            onChange={(e) => setData('tema', e.target.value)}
                            disabled={processing}
                            className={errors.tema ? 'border-red-500' : ''}
                        >
                            <option value="navy">Navy (Default)</option>
                            <option value="emerald">Emerald</option>
                        </select>
                        {errors.tema && (
                            <p className="text-sm text-red-600 mt-1">{errors.tema}</p>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <Label>Jenis Media Hero</Label>
                        <div className="flex space-x-4">
                            <Label htmlFor="hero_foto" className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="hero_foto"
                                    name="hero_media_type"
                                    value="foto"
                                    checked={data.hero_media_type === 'foto'}
                                    onChange={(e) => setData('hero_media_type', e.target.value)}
                                    disabled={processing}
                                    className={errors.hero_media_type ? 'border-red-500' : ''}
                                />
                                Foto
                            </Label>
                            <Label htmlFor="hero_video" className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="hero_video"
                                    name="hero_media_type"
                                    value="video"
                                    checked={data.hero_media_type === 'video'}
                                    onChange={(e) => setData('hero_media_type', e.target.value)}
                                    disabled={processing}
                                    className={errors.hero_media_type ? 'border-red-500' : ''}
                                />
                                Video
                            </Label>
                        </div>
                        {errors.hero_media_type && (
                            <p className="text-sm text-red-600 mt-1">{errors.hero_media_type}</p>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <Label>Upload Media Hero</Label>
                        <input
                            type="file"
                            accept={data.hero_media_type === 'foto'
                                ? 'image/webp,image/avif,image/jpeg,image/png'
                                : 'video/mp4,video/webm'}
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    // In real app you would upload to storage and set URL
                                    // For demo we just set a placeholder
                                    setData('hero_media_url', URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Maksimal {data.hero_media_type === 'foto' ? '200KB' : '5MB'}.
                            Format yang diizinkan: {data.hero_media_type === 'foto'
                                ? 'WebP, AVIF, JPEG, PNG'
                                : 'MP4, WebM'}
                        </p>
                        {data.hero_media_url && (
                            <div className="mt-2">
                                {data.hero_media_type === 'foto' ? (
                                    <img
                                        src={data.hero_media_url}
                                        alt="Preview"
                                        className="max-w-xs rounded border"
                                    />
                                ) : (
                                    <video
                                        src={data.hero_media_url}
                                        controls
                                        className="max-w-xs rounded border"
                                    />
                                )}
                            </div>
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