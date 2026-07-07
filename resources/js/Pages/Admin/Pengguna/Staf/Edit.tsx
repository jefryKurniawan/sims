import { Head, useForm, router } from '@inertiajs/inertia-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function StafEdit({ staf }) {
    const { data: formData, setData, put, processing, reset, errors } = useForm({
        name: staf.name ?? '',
        email: staf.email ?? '',
        username: staf.username ?? '',
        password: '',
        foto_profile: null,
        nip: staf.userDetail?.nip ?? '',
        mengajar: staf.userDetail?.mengajar ?? '',
        linkidln: staf.userDetail?.linkidln ?? '',
        instagram: staf.userDetail?.instagram ?? '',
        website: staf.userDetail?.website ?? '',
        facebook: staf.userDetail?.facebook ?? '',
        twitter: staf.userDetail?.twitter ?? '',
        youtube: staf.userDetail?.youtube ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.staf.update', staf.id), {
            onSuccess: () => {
                // Success handled by Inertia
            }
        });
    };

    return (
        <>
            <Head title="Edit Staf" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Staf</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="mb-2">Nama Lengkap</Label>
                        <Input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary"
                            disabled={processing}
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                        >
                            Kembali
                        </Button>
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                            disabled={processing}
                        >
                            {processing ? 'Mengupdate...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}