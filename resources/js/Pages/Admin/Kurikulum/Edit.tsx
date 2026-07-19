import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

interface KurikulumItem {
	id: number;
	nama: string;
	aktif: boolean;
	keterangan: string | null;
}

export default function Edit() {
	const { kurikulum, flash } = usePage().props as any;
	const item: KurikulumItem = kurikulum;

	const { data, setData, put, processing, errors } = useForm({
		nama: item.nama || "",
		aktif: item.aktif || false,
		keterangan: item.keterangan || "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		put(route("admin.kurikulum.update", item.id));
	};

	const handleDelete = () => {
		if (confirm("Hapus kurikulum ini?")) {
			Inertia.delete(route("admin.kurikulum.destroy", item.id));
		}
	};

	return (
		<>
			<Head title={`Edit Kurikulum - ${item.nama}`} />
			<div className="p-4 lg:p-6 max-w-2xl">
				<div className="mb-6">
					<Link
						href={route("admin.kurikulum.index")}
						className="text-sm text-primary hover:underline"
					>
						&larr; Kembali
					</Link>
					<h1 className="text-2xl font-bold text-gray-900 mt-2">
						Edit Kurikulum
					</h1>
				</div>

				{flash?.success && (
					<div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
						{flash.success}
					</div>
				)}

				<form
					onSubmit={handleSubmit}
					className="bg-white rounded-lg border p-6 space-y-4"
				>
					<div>
						<label
							htmlFor="nama"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Nama Kurikulum
						</label>
						<input
							id="nama"
							type="text"
							value={data.nama}
							onChange={(e) => setData("nama", e.target.value)}
							className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-primary"
							required
						/>
						{errors.nama && (
							<p className="text-xs text-red-600 mt-1">{errors.nama}</p>
						)}
					</div>

					<div className="flex items-center gap-2">
						<input
							id="aktif"
							type="checkbox"
							checked={data.aktif}
							onChange={(e) => setData("aktif", e.target.checked)}
							className="rounded border-gray-300 text-primary focus:ring-primary"
						/>
						<label
							htmlFor="aktif"
							className="text-sm font-medium text-gray-700"
						>
							Aktifkan sebagai kurikulum utama
						</label>
					</div>

					<div>
						<label
							htmlFor="keterangan"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Keterangan (opsional)
						</label>
						<textarea
							id="keterangan"
							value={data.keterangan}
							onChange={(e) => setData("keterangan", e.target.value)}
							className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-primary"
							rows={3}
						/>
					</div>

					<div className="flex gap-2 pt-2">
						<button
							type="submit"
							disabled={processing}
							className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
						>
							{processing ? "Menyimpan..." : "Update"}
						</button>
						<button
							type="button"
							onClick={handleDelete}
							className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
						>
							Hapus
						</button>
						<Link
							href={route("admin.kurikulum.index")}
							className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
						>
							Batal
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
