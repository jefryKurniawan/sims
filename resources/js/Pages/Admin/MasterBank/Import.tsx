import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Import() {
	const { data, setData, post, processing, reset, errors } = useForm({
		file: null,
	});

	const [open, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const closeModal = () => {
		setOpen(false);
		reset();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("master-bank.import"), {
			onSuccess: () => {
				closeModal();
				// Optionally show success toast
			},
			onError: () => {
				// errors already set by Inertia
			},
		});
	};

	return (
		<>
			<Head title="Import Master Bank" />
			<div className="p-4 lg:p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900">
						Import Master Bank
					</h1>
					<p className="text-sm text-gray-500">
						Unggah file Excel/CSV untuk mengimpor data master bank secara
						massal.
					</p>
					<div className="mt-2 flex items-center gap-3">
						<button
							onClick={openModal}
							className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
						>
							Impor Master Bank
						</button>
						<a
							href={route("master-bank.template")}
							className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
						>
							Download Template
						</a>
					</div>
				</div>

				{/* Modal */}
				<div
					className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${open ? "bg-black/50 backdrop-blur-sm" : "hidden"}`}
				>
					<div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
						<div className="flex items-start justify-between mb-4">
							<h2 className="text-xl font-semibold text-gray-900">
								Impor Master Bank
							</h2>
							<button
								type="button"
								onClick={closeModal}
								className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label
									htmlFor="file"
									className="block text-sm font-medium mb-1"
								>
									File Excel/CSV <span className="text-destructive">*</span>
								</Label>
								<input
									id="file"
									type="file"
									accept=".xlsx,.xls,.csv"
									onChange={(e) => setData("file", e.target.files[0] ?? null)}
									className="block w-full text-sm text-gray-900 border border-input/30 rounded-md shadow-sm px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
								/>
								{errors.file && (
									<p className="mt-1 text-sm text-destructive">{errors.file}</p>
								)}
							</div>

							<div className="flex justify-end gap-3">
								<button
									type="button"
									onClick={closeModal}
									className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
								>
									Batal
								</button>
								<button
									type="submit"
									className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md disabled:opacity-50 hover:bg-primary/90"
									disabled={processing}
								>
									{processing ? "Mengimpor..." : "Impor"}
								</button>
							</div>
						</form>
					</div>
				</div>

			</div>
		</>
	);
}
