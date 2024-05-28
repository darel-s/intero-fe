import React from "react";
import ParentTable from "../components/parent_table";

function parent() {
    return (
        <div className="p-4 md:p-10">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mt-2">
                    Data Orang Tua
                </h1>
                <p className="text-gray-600 mt-2 mb-8">
                    Berikut adalah daftar data orang tua yang telah terdaftar
                </p>
                <ParentTable />
            </div>
        </div>
    );
}

export default parent;
