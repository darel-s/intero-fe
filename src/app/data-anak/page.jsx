import React from "react";
import BabiesTable from "../components/babies_table";

function parent() {
    return (
        <div className="p-4 md:p-10">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mt-2">
                    Data Anak
                </h1>
                <p className="text-gray-600 mt-2">
                    Berikut adalah daftar data anak yang telah terdaftar
                </p>
                <BabiesTable />
            </div>
        </div>
    );
}

export default parent;
