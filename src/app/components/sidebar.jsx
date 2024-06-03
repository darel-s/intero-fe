"use client";

import { useState } from "react";
import {
    FaBars,
    FaHome,
    FaUser,
    FaChild,
    FaHistory,
    FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Sidebar = () => {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("dashboard");

    const handleMenuClick = (menu) => {
        setSelected(menu);
        switch (menu) {
            case "dashboard":
                router.push("/");
                break;
            case "dataOrangTua":
                router.push("/data-orang-tua");
                break;
            case "dataAnak":
                router.push("/data-anak");
                break;
            case "historyPemeriksaan":
                router.push("/history-pemeriksaan");
                break;
            default:
                break;
        }
    };

    const handleLogoutClick = () => {
        Cookies.remove("token");

        router.push("/login");
    };

    return (
        <div className="sticky top-0 h-screen">
            <div
                className={`bg-white h-screen flex flex-col justify-between ${
                    isCollapsed ? "w-16" : "w-64"
                } transition-all duration-300`}
            >
                <div>
                    <button
                        className="p-4 focus:outline-none"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <FaBars size={24} />
                    </button>
                    <nav className="mt-10">
                        <ul>
                            <li
                                className={`flex items-center p-4 cursor-pointer ${
                                    selected === "dashboard"
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700"
                                } ${isCollapsed ? "justify-center" : ""}`}
                                onClick={() => handleMenuClick("dashboard")}
                            >
                                <FaHome
                                    className={`mr-4 ${
                                        selected === "dashboard"
                                            ? ""
                                            : "text-gray-500"
                                    }`}
                                />
                                {!isCollapsed && "Dashboard"}
                            </li>
                            <li
                                className={`flex items-center p-4 cursor-pointer ${
                                    selected === "dataOrangTua"
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700"
                                } ${isCollapsed ? "justify-center" : ""}`}
                                onClick={() => handleMenuClick("dataOrangTua")}
                            >
                                <FaUser
                                    className={`mr-4 ${
                                        selected === "dataOrangTua"
                                            ? ""
                                            : "text-gray-500"
                                    }`}
                                />
                                {!isCollapsed && "Data Orang Tua"}
                            </li>
                            <li
                                className={`flex items-center p-4 cursor-pointer ${
                                    selected === "dataAnak"
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700"
                                } ${isCollapsed ? "justify-center" : ""}`}
                                onClick={() => handleMenuClick("dataAnak")}
                            >
                                <FaChild
                                    className={`mr-4 ${
                                        selected === "dataAnak"
                                            ? ""
                                            : "text-gray-500"
                                    }`}
                                />
                                {!isCollapsed && "Data Anak"}
                            </li>
                            <li
                                className={`flex items-center p-4 cursor-pointer ${
                                    selected === "historyPemeriksaan"
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700"
                                } ${isCollapsed ? "justify-center" : ""}`}
                                onClick={() =>
                                    handleMenuClick("historyPemeriksaan")
                                }
                            >
                                <FaHistory
                                    className={`mr-4 ${
                                        selected === "historyPemeriksaan"
                                            ? ""
                                            : "text-gray-500"
                                    }`}
                                />
                                {!isCollapsed && "History Pemeriksaan"}
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="p-4">
                    <button
                        className="btn btn-ghost w-full flex items-center justify-center"
                        onClick={handleLogoutClick}
                    >
                        <FaSignOutAlt
                            className={`mr-2 ${
                                isCollapsed ? "hidden" : "block"
                            }`}
                        />
                        {!isCollapsed && "Logout"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
