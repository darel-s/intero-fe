"use client";

import { useEffect, useState } from "react";
import {
    FaUser,
    FaChild,
    FaHeartbeat,
    FaSmile,
    FaFrown,
    FaBalanceScale,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { JWT } from "jose";
import axios from "axios";

export default function Home() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [stats, setStats] = useState({});

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            router.push("/login");
        } else {
            fetchPuskesmasStats();
        }
    }, []);

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            router.push("/login");
        }
    }, []);

    function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }

    const fetchPuskesmasStats = async () => {
        const token = Cookies.get("token");

        const decodedToken = parseJwt(token);
        const puskesmasId = decodedToken.puskesmas_location;

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/puskesmas-stats/${puskesmasId}`
            );

            const {
                parent_count,
                baby_count,
                healthy_baby_count,
                baby_history_count,
                stuntingBabyCount,
                gizi_buruk_baby_count,
            } = response.data;

            // Set the stats state variable with the data from the response
            setStats({
                parent_count,
                baby_count,
                healthy_baby_count,
                baby_history_count,
                stuntingBabyCount,
                gizi_buruk_baby_count,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">
                Selamat datang di e-Posyandu
            </h1>
            <p className="mb-10 text-gray-800">
                e-Posyandu adalah platform digital untuk memantau kesehatan anak
                dan orang tua. Kami menyediakan data real-time dan laporan
                kesehatan yang dapat diakses kapan saja dan di mana saja.
            </p>

            <div className="flex flex-wrap gap-4">
                <div className="stat flex-1 min-w-[250px] bg-white shadow-lg p-4 rounded-lg">
                    <div className="stat-figure text-blue-500">
                        <FaUser className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title text-gray-800">
                        Jumlah Orang Tua
                    </div>
                    <div className="stat-value text-blue-500">
                        {stats.parent_count}
                    </div>
                    <div className="stat-desc text-gray-600">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-lg p-4 rounded-lg">
                    <div className="stat-figure text-purple-500">
                        <FaChild className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title text-gray-800">Jumlah Anak</div>
                    <div className="stat-value text-purple-500">
                        {stats.baby_count}
                    </div>
                    <div className="stat-desc text-gray-600">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-lg p-4 rounded-lg">
                    <div className="stat-figure text-teal-500">
                        <FaHeartbeat className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title text-gray-800">
                        Jumlah Pemeriksaan
                    </div>
                    <div className="stat-value text-teal-500">
                        {stats.baby_history_count}
                    </div>
                    <div className="stat-desc text-gray-600">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-lg p-4 rounded-lg">
                    <div className="stat-figure text-green-500">
                        <FaSmile className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title text-gray-800">
                        Jumlah Anak Sehat
                    </div>
                    <div className="stat-value text-green-500">
                        {stats.healthy_baby_count}
                    </div>
                    <div className="stat-desc text-gray-600">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-lg p-4 rounded-lg">
                    <div className="stat-figure text-yellow-500">
                        <FaBalanceScale className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title text-gray-800">
                        Jumlah Anak Stunting
                    </div>
                    <div className="stat-value text-yellow-500">
                        {stats.stuntingBabyCount}
                    </div>
                    <div className="stat-desc text-gray-600">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-lg p-4 rounded-lg">
                    <div className="stat-figure text-red-500">
                        <FaFrown className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title text-gray-800">
                        Jumlah Anak Kurang Gizi
                    </div>
                    <div className="stat-value text-red-500">
                        {stats.gizi_buruk_baby_count}
                    </div>
                    <div className="stat-desc text-gray-600">Data terbaru</div>
                </div>
            </div>
        </div>
    );
}
