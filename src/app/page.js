import Image from "next/image";
import ParentTable from "./components/parent_table";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-800 mt-10">
                Data Orang Tua
            </h1>
            <p className="text-gray-600 mt-2 mb-8">
                Berikut adalah daftar data orang tua yang telah terdaftar
            </p>
            <ParentTable />
        </div>
    );
}
