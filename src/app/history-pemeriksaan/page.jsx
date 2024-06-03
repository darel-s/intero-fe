import React from "react";
import ParentTable from "../components/parent_table";
import HistoryTable from "../components/history_table";

function History() {
    return (
        <div className="p-4 md:p-10">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mt-2">
                    Riwayat Pemeriksaan
                </h1>
                <p className="text-gray-600 mt-2">
                    Berikut adalah riwayat pemeriksaan yang telah dilakukan
                </p>
                <HistoryTable />
            </div>
        </div>
    );
}

export default History;
