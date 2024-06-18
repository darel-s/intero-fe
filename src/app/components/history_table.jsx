"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";

const HistoryTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [babyNames, setBabyNames] = useState([]);
    const [formValues, setFormValues] = useState({
        baby_id: "",
        check_date: "",
        weight: "",
        height: "",
        head_circumference: "",
        exclusive_breastfeeding: "Tidak",
        vit_a: "Tidak",
        pmba: "",
        puskesmas_location: "17",
    });

    useEffect(() => {
        const fetchBabyNames = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/babies/location/17`
                );
                setBabyNames(response.data);
            } catch (error) {
                console.error("Failed to fetch baby names", error);
            }
        };

        fetchBabyNames();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/babyhistories`
            );
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDelete = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await axios.delete(
                `${apiUrl}/babyhistories/${id}`
            );
            if (response.status === 200) {
                toast.success("Baby history deleted successfully.");
                fetchData();
            } else {
                toast.error("Failed to delete the baby history.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while deleting the data.");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        const formattedFormValues = {
            ...formValues,
            exclusive_breastfeeding:
                formValues.exclusive_breastfeeding === "Ya" ? 1 : 0,
            vit_a: formValues.vit_a === "Ya" ? 1 : 0,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/babyhistories`,
                formattedFormValues
            );
            toast.success("Baby history created successfully");
            document.getElementById("add-parent-modal").checked = false;
            fetchData();
            setFormValues({
                baby_id: "",
                check_date: "",
                weight: "",
                height: "",
                head_circumference: "",
                exclusive_breastfeeding: "Tidak",
                vit_a: "Tidak",
                pmba: "",
                puskesmas_location: "17",
            });
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving the data");
        }
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
                            <th className="p-3">ASI Eksklusif</th>
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
                                    <button
                                        onClick={() =>
                                            handleDelete(item.id_check)
                                        }
                                        className="btn btn-error text-white hover:bg-red-600 transition-colors duration-200"
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
                        Tambah Data Pemeriksaan Bayi
                    </h3>
                    <form
                        className="form-control mt-4"
                        onSubmit={handleFormSubmit}
                    >
                        <label className="label">
                            <span className="label-text text-gray-900">
                                Nama
                            </span>
                        </label>
                        <select
                            name="baby_id"
                            className="input input-bordered bg-white text-gray-900"
                            value={formValues.baby_id}
                            onChange={handleInputChange}
                        >
                            {babyNames.map((baby) => (
                                <option key={baby.id} value={baby.id}>
                                    {baby.baby_name}
                                </option>
                            ))}
                        </select>

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Tanggal Pemeriksaan
                            </span>
                        </label>
                        <input
                            type="date"
                            name="check_date"
                            className="input input-bordered bg-white text-gray-900"
                            value={formValues.check_date}
                            onChange={handleInputChange}
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Berat (kg)
                            </span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="weight"
                            className="input input-bordered bg-white text-gray-900"
                            value={formValues.weight}
                            onChange={handleInputChange}
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Tinggi (cm)
                            </span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="height"
                            className="input input-bordered bg-white text-gray-900"
                            value={formValues.height}
                            onChange={handleInputChange}
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Lingkar Kepala (cm)
                            </span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="head_circumference"
                            className="input input-bordered bg-white text-gray-900"
                            value={formValues.head_circumference}
                            onChange={handleInputChange}
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                ASI Eksklusif
                            </span>
                        </label>
                        <select
                            name="exclusive_breastfeeding"
                            className="select select-bordered bg-white text-gray-900"
                            value={formValues.exclusive_breastfeeding}
                            onChange={handleInputChange}
                        >
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Vitamin A
                            </span>
                        </label>
                        <select
                            name="vit_a"
                            className="select select-bordered bg-white text-gray-900"
                            value={formValues.vit_a}
                            onChange={handleInputChange}
                        >
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                PMBA
                            </span>
                        </label>
                        <input
                            type="text"
                            name="pmba"
                            className="input input-bordered bg-white text-gray-900"
                            value={formValues.pmba}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary mt-4 text-white"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HistoryTable;
