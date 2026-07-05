import { useForm } from "@inertiajs/inertia-react";
import { useState, useCallback, useRef } from "react";
import { Download, FileDown, FileUp, UploadCloud, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Judul modal, misal "Import GTK" */
  title: string;
  /** Route download template xlsx */
  templateRouteXlsx: string;
  /** Route download template csv */
  templateRouteCsv: string;
  /** Route POST import */
  importRoute: string;
}

export default function ImportModal({
  open,
  onClose,
  title,
  templateRouteXlsx,
  templateRouteCsv,
  importRoute,
}: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    file: null as File | null,
  });
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (f: File | null) => {
      if (!f) return;
      const ext = f.name.split(".").pop()?.toLowerCase();
      if (!["xlsx", "xls", "csv"].includes(ext ?? "")) {
        alert("Hanya file .xlsx, .xls, atau .csv");
        return;
      }
      setData("file", f);
      setDragOver(false);
    },
    [setData],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files?.[0] ?? null);
    },
    [handleFile],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.file) return;
    const formData = new FormData();
    formData.append("file", data.file);
    post(importRoute, {
      data: formData as any,
      forceFormData: true,
      onSuccess: () => reset(),
    });
    // jangan langsung tutup — biarkan flash message nampil di belakang
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-lg mx-4 animate-in fade-in-0 slide-in-from-bottom-6 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-heading">{title}</h2>
          <button
            onClick={() => { onClose(); reset(); }}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Dropzone */}
          <form onSubmit={handleSubmit}>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInput.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                dragOver
                  ? "border-school-red bg-red-50"
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              }`}
            >
              <input
                ref={fileInput}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />

              {data.file ? (
                <div className="text-sm text-gray-700">
                  <FileUp className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
                  <span className="font-medium">{data.file.name}</span>{" "}
                  <span className="text-gray-400">({(data.file.size / 1024).toFixed(1)} KB)</span>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  <UploadCloud className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium text-gray-600">Drag & drop file di sini</p>
                  <p className="text-xs mt-1">atau klik untuk memilih .xlsx / .csv</p>
                </div>
              )}
            </div>
            {errors.file && <p className="mt-1.5 text-xs text-red-600">{errors.file}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={!data.file || processing}
              className="mt-4 w-full py-2.5 text-sm font-semibold text-white bg-school-red rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {processing ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Mengimpor...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">Import Data</span>
              )}
            </button>
          </form>

          {/* Download template */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              Download template untuk diisi:
            </p>
            <div className="flex gap-3">
              <a
                href={templateRouteXlsx}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition text-sm font-medium"
              >
                <FileDown className="w-4 h-4" />
                Template Excel (.xlsx)
              </a>
              <a
                href={templateRouteCsv}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-lg hover:bg-cyan-100 transition text-sm font-medium"
              >
                <FileDown className="w-4 h-4" />
                Template CSV (.csv)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}