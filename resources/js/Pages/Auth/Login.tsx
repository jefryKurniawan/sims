import { useForm, usePage } from "@inertiajs/inertia-react";
import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Head } from "@/Layout/Head";
import GuestLayout from "@/Layout/GuestLayout";
import type { PageProps } from "@/types";
import { gsap } from "gsap";

export default function Login() {
    const { flash } = usePage().props as unknown as PageProps;
    const [showPassword, setShowPassword] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const rememberInputRef = useRef<HTMLInputElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post("/auth/login");
    }

    // GSAP animations on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate form container (white card)
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
            // Stagger inputs and button
            gsap.fromTo(
                [emailInputRef.current, passwordInputRef.current, rememberInputRef.current, submitButtonRef.current].filter(Boolean),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
            );
            // Animate flash messages if any
            if (flash.error || flash.success) {
                gsap.from(".flash-message", {
                    opacity: 0,
                    y: 10,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        }, formRef.current);
        return () => ctx.revert();
    }, [flash.error, flash.success]);

    // Input focus animation
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        gsap.to(e.target, { scale: 1.02, duration: 0.2 });
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        gsap.to(e.target, { scale: 1, duration: 0.2 });
    };

    // Button hover animation
    const handleButtonEnter = () => {
        if (!submitButtonRef.current || processing) return;
        gsap.to(submitButtonRef.current, { scale: 1.05, duration: 0.2 });
    };
    const handleButtonLeave = () => {
        if (!submitButtonRef.current || processing) return;
        gsap.to(submitButtonRef.current, { scale: 1, duration: 0.2 });
    };
    const handleButtonPress = () => {
        if (!submitButtonRef.current || processing) return;
        gsap.to(submitButtonRef.current, { scale: 0.98, duration: 0.1 });
    };
    const handleButtonRelease = () => {
        if (!submitButtonRef.current || processing) return;
        gsap.to(submitButtonRef.current, { scale: 1, duration: 0.2 });
    };

    return (
        <div>
            <Head title="Login" />
            <div ref={formRef} className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 border-2 border-yellow-200 rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Masuk ke Akun Anda
                </h2>

                {flash.error && (
                    <div className="flash-message mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
                        {flash.error}
                    </div>
                )}

                {flash.success && (
                    <div className="flash-message mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            ref={emailInputRef}
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition duration-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="admin@sekolahku.sch.id"
                            required
                            autoFocus
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                ref={passwordInputRef}
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-2.5 pr-10 border rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition duration-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-0 bottom-0 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
                                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            ref={rememberInputRef}
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData("remember", e.target.checked)}
                            className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            Ingat saya
                        </label>
                    </div>

                    <button
                        type="submit"
                        ref={submitButtonRef}
                        disabled={processing}
                        onMouseEnter={handleButtonEnter}
                        onMouseLeave={handleButtonLeave}
                        onMouseDown={handleButtonPress}
                        onMouseUp={handleButtonRelease}
                        className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-white font-medium rounded-lg text-sm transition duration-200 transform disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {processing ? "Memproses..." : "Masuk"}
                    </button>
                </form>
            </div>
        </div>
    );
}

Login.layout = GuestLayout;