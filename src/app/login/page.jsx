"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function loginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (Cookies.get("token")) {
            router.push("/");
        }
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
                {
                    email,
                    password,
                }
            );
            const { token } = response.data;

            Cookies.set("token", token);

            router.push("/");
            toast.success("Login berhasil");
        } catch (error) {
            console.error(error);
            toast.error("Login gagal");
        }
    };

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    e-Posyandu
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Dengan Posyandu, kita mendekatkan layanan
                            kesehatan ke jantung komunitas, memastikan semua
                            mendapatkan perhatian yang mereka butuhkan.&rdquo;
                        </p>
                        <footer className="text-sm">Yodhimas Geffananda</footer>
                    </blockquote>
                </div>
            </div>
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Selamat Datang di e-Posyandu
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Silahkan masuk untuk melanjutkan
                        </p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-primary w-full"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Dengan mengklik lanjutkan, Anda setuju dengan kami{" "}
                        <br />
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Syarat dan Ketentuan
                        </Link>{" "}
                        dan{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Kebijakan Privasi
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}

export default loginPage;
