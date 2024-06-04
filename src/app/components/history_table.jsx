"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";

const HistoryTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const fetchData = async () => {
        try {
            const result = await axios(
                `${process.env.NEXT_PUBLIC_API_URL}/babyhistories`
            );
            console.log(result.data);
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto mt-10 min-h-screen p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    Riwayat Pemeriksaan
                </h2>
                <label
                    htmlFor="add-babies-modal"
                    className="btn border-black bg-white text-black hover:bg-gray-100 hover:text-gray-900"
                >
                    Tambah Data
                </label>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-900">
                            <th className="p-3">Nama</th>
                            <th className="p-3">Tanggal Pemeriksaan</th>
                            <th className="p-3">Berat</th>
                            <th className="p-3">Tinggi</th>
                            <th className="p-3">Lingkaran Kepala</th>
                            <th className="p-3">ASI Ekslusif</th>
                            <th className="p-3">Vitamin A</th>
                            <th className="p-3">PMBA</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-gray-100"
                            >
                                <td className="p-3 text-gray-800">
                                    {item.Baby.baby_name}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {format(
                                        new Date(item.check_date),
                                        "dd-MM-yyyy"
                                    )}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.weight} kg
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.height} cm
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.head_circumference} cm
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.exclusive_breastfeeding
                                        ? "Ya"
                                        : "Tidak"}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.vit_a ? "Ya" : "Tidak"}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.pmba}
                                </td>
                                <td className="p-3">
                                    <button className="btn btn-error text-white hover:bg-red-600 transition-colors duration-200">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-4">
                <div className="btn-group">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn ${
                                currentPage === index + 1
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-white text-blue-500  border-blue-500 hover:bg-blue-100"
                            } mx-1 transition-colors duration-200`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <input
                type="checkbox"
                id="add-babies-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative bg-white">
                    <label
                        htmlFor="add-babies-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold text-gray-900">
                        Tambah Data Bayi
                    </h3>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text text-gray-900">
                                Nama
                            </span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                NIK
                            </span>
                        </label>
                        <input
                            type="text"
                            name="kk"
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                NIK
                            </span>
                        </label>
                        <input
                            type="text"
                            name="nik"
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Nomor HP
                            </span>
                        </label>
                        <input
                            type="text"
                            name="hp"
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Alamat
                            </span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">RT</span>
                        </label>
                        <input
                            type="text"
                            name="rt"
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">RW</span>
                        </label>
                        <input
                            type="text"
                            name="rw"
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <button className="btn btn-primary mt-4 text-white">
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryTable;
