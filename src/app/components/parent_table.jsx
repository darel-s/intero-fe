"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ParentTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [currentParent, setCurrentParent] = useState(null);

    const fetchData = async () => {
        try {
            const result = await axios(
                `${process.env.NEXT_PUBLIC_API_URL}/parents`
            );
            setData(result.data);
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [newParent, setNewParent] = useState({
        name: "",
        kk: "",
        nik: "",
        hp: "",
        address: "",
        rt: "",
        rw: "",
    });

    const handleChange = (e) => {
        setNewParent({ ...newParent, [e.target.name]: e.target.value });
    };

    const handleAddParent = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/parents`,
                {
                    parent_name: newParent.name,
                    kk_number: newParent.kk,
                    nik: newParent.nik,
                    phone_number: newParent.hp,
                    address: newParent.address,
                    rt: newParent.rt,
                    rw: newParent.rw,
                }
            );

            if (response.status === 200) {
                setData([...data, response.data.parent]);
                setNewParent({
                    name: "",
                    kk: "",
                    nik: "",
                    hp: "",
                    address: "",
                    rt: "",
                    rw: "",
                });
                document.getElementById("add-parent-modal").checked = false;
                toast.success(response.data.msg);
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error");
            toast.error(error.response.data.msg);
        }
    };

    const handleDeleteParent = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/parents/${id}`
            );

            if (response.status === 200) {
                fetchData();
                toast.success(response.data.msg);
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error");
            toast.error(error.response.data.msg);
        }
    };

    const handleUpdateClick = (parent) => {
        setCurrentParent(parent);
        setIsUpdateModalOpen(true);
    };

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
                    Data Orang Tua
                </h2>
                <label
                    htmlFor="add-parent-modal"
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
                            <th className="p-3">Nomor KK</th>
                            <th className="p-3">NIK</th>
                            <th className="p-3">Nomor HP</th>
                            <th className="p-3">Alamat</th>
                            <th className="p-3">RT/RW</th>
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
                                    {item.parent_name}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.kk_number}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.nik}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.phone_number}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.address}
                                </td>
                                <td className="p-3 text-gray-800">{`${item.rt}/${item.rw}`}</td>
                                <td className="p-3">
                                    <button
                                        className="btn btn-error text-white hover:bg-red-600 transition-colors duration-200"
                                        onClick={() =>
                                            handleDeleteParent(item.id)
                                        }
                                    >
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
                id="add-parent-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative bg-white">
                    <label
                        htmlFor="add-parent-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold text-gray-900">
                        Tambah Data Orang Tua
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
                            value={newParent.name}
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Nomor KK
                            </span>
                        </label>
                        <input
                            type="text"
                            name="kk"
                            value={newParent.kk}
                            onChange={handleChange}
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
                            value={newParent.nik}
                            onChange={handleChange}
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
                            value={newParent.hp}
                            onChange={handleChange}
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
                            value={newParent.address}
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">RT</span>
                        </label>
                        <input
                            type="text"
                            name="rt"
                            value={newParent.rt}
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">RW</span>
                        </label>
                        <input
                            type="text"
                            name="rw"
                            value={newParent.rw}
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <button
                            onClick={handleAddParent}
                            className="btn btn-primary mt-4 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentTable;
