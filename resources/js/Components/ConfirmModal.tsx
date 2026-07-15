import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
    open: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "warning" | "primary";
    onConfirm: () => void;
    onCancel: () => void;
    // Optional input field for reason/textarea
    inputType?: "text" | "textarea";
    inputPlaceholder?: string;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    inputRequired?: boolean;
    confirmButtonText?: string;
}

export default function ConfirmModal({
    open,
    title = "Konfirmasi",
    message,
    confirmLabel = "Hapus",
    cancelLabel = "Batal",
    variant = "danger",
    onConfirm,
    onCancel,
    inputType,
    inputPlaceholder,
    inputValue,
    onInputChange,
    inputRequired = false,
    confirmButtonText,
}: ConfirmModalProps) {
    if (!open) return null;

    const isInputValid =
        !inputRequired || (inputValue && inputValue.trim().length > 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-card dark:bg-card border border-border dark:border-border rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
                {/* Header */}
                <div className="px-5 pt-5 pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                                    variant === "danger"
                                        ? "bg-destructive/10 text-destructive"
                                        : variant === "warning"
                                          ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                                          : "bg-primary/10 text-primary"
                                }`}
                            >
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">
                                {title}
                            </h3>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground">{message}</p>
                    {inputType && (
                        <div className="mt-4">
                            {inputType === "textarea" ? (
                                <textarea
                                    value={inputValue || ""}
                                    onChange={(e) =>
                                        onInputChange?.(e.target.value)
                                    }
                                    placeholder={inputPlaceholder}
                                    required={inputRequired}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring resize-none"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={inputValue || ""}
                                    onChange={(e) =>
                                        onInputChange?.(e.target.value)
                                    }
                                    placeholder={inputPlaceholder}
                                    required={inputRequired}
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-foreground bg-accent hover:bg-accent/80 rounded-lg transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={inputRequired && !isInputValid}
                        className={`px-4 py-2 text-sm font-medium text-primary-foreground rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                            variant === "danger"
                                ? "bg-destructive hover:bg-destructive/90 focus:ring-destructive"
                                : variant === "warning"
                                  ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500"
                                  : "bg-primary hover:bg-primary/90 focus:ring-primary"
                        } ${inputRequired && !isInputValid ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {confirmButtonText || confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
