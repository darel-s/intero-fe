"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const BabiesTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [startDate, setStartDate] = useState(new Date());
    const [parents, setParents] = useState([]);

    const token = Cookies.get("token");
    const decodedToken = parseJwt(token);
    const puskesmasId = decodedToken.puskesmas_location;

    const [babyData, setBabyData] = useState({
        baby_name: "",
        birth_date: "",
        gender: "",
        nik: "",
        parent_id: "",
        birth_weight: "",
        birth_height: "",
        condition_id: 1,
        puskesmas_location: puskesmasId,
    });

    const handleChange = (e) => {
        let value = e.target.value;

        setBabyData({
            ...babyData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/babies`,
                babyData
            );

            toast.success("Data berhasil disimpan");
            document.getElementById("add-babies-modal").checked = false;
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

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

    useEffect(() => {
        const token = Cookies.get("token");
        const parsedToken = parseJwt(token);
        const puskesmasId = parsedToken.puskesmas_location;

        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/parents/location/${puskesmasId}`
        )
            .then((response) => response.json())
            .then((data) => setParents(data))
            .catch((error) => console.error(error));
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios(
                `${process.env.NEXT_PUBLIC_API_URL}/babies`
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/babies/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            toast.success("Baby deleted successfully");
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the baby");
        }
    };

    return (
        <div className="container mx-auto mt-10 min-h-screen p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Data Anak</h2>
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
                            <th className="p-3">NIK</th>
                            <th className="p-3">Tanggal Lahir</th>
                            <th className="p-3">Jenis Kelamin</th>
                            <th className="p-3">Nama Orang Tua</th>
                            <th className="p-3">Berat Lahir</th>
                            <th className="p-3">Tinggi Lahir</th>
                            <th className="p-3">Kondisi</th>
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
                                    {item.baby_name}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.nik}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {format(
                                        new Date(item.birth_date),
                                        "dd-MM-yyyy"
                                    )}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.gender}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.Parent.parent_name}
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.birth_weight} kg
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.birth_height} cm
                                </td>
                                <td className="p-3 text-gray-800">
                                    {item.HealthCondition.condition}
                                </td>
                                <td className="p-3">
                                    <button
                                        className="btn btn-error text-white hover:bg-red-600 transition-colors duration-200"
                                        onClick={() => handleDelete(item.id)}
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
                            name="baby_name"
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
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Tanggal Lahir
                            </span>
                        </label>
                        <input
                            type="date"
                            name="birth_date"
                            value={babyData.birth_date}
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <div className="flex flex-col mt-2">
                            <label className="label mr-2 flex items-center">
                                <span className="label-text text-gray-900">
                                    Jenis Kelamin
                                </span>
                            </label>
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        onChange={handleChange}
                                        className="radio radio-primary"
                                    />
                                    <span className="ml-2 text-black">
                                        Laki-laki
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        onChange={handleChange}
                                        className="radio radio-primary"
                                    />
                                    <span className="ml-2 text-black">
                                        Perempuan
                                    </span>
                                </label>
                            </div>
                        </div>

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Nama Orang Tua
                            </span>
                        </label>
                        <select
                            name="parent_id"
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        >
                            <option value="">Pilih Orang Tua</option>
                            {parents.map((parent) => (
                                <option key={parent.id} value={parent.id}>
                                    {parent.parent_name}
                                </option>
                            ))}
                        </select>

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Berat Lahir
                            </span>
                        </label>
                        <input
                            type="text"
                            name="birth_weight"
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <label className="label mt-2">
                            <span className="label-text text-gray-900">
                                Tinggi Lahir
                            </span>
                        </label>
                        <input
                            type="text"
                            name="birth_height"
                            onChange={handleChange}
                            className="input input-bordered bg-white text-gray-900"
                        />

                        <button
                            className="btn btn-primary mt-4 text-white"
                            onClick={handleSubmit}
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BabiesTable;
