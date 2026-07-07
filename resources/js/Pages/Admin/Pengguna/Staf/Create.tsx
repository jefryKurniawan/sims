import { Head, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function StafCreate() {
    const { data: formData, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        username: '',
        password: '',
        foto_profile: null,
        nip: '',
        mengajar: '',
        linkidln: '',
        instagram: '',
        website: '',
        facebook: '',
        twitter: '',
        youtube: '',
    });

    const handleFotoProfileChange = (e) => {
        if (e.target.files[0]) {
            setData('foto_profile', e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.staf.store'), {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <>
            <Head title="Tambah Staf" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Staf Baru</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Simplified form fields */}
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
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}