"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ParentTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(
                    `${process.env.NEXT_PUBLIC_API_URL}/parents`
                );
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const [newParent, setNewParent] = useState({
        name: "",
        kk: "",
        nik: "",
        hp: "",
        address: "",
        rtrw: "",
    });

    const handleChange = (e) => {
        setNewParent({ ...newParent, [e.target.name]: e.target.value });
    };

    const handleAddParent = () => {
        setData([...data, newParent]);
        setNewParent({
            name: "",
            kk: "",
            nik: "",
            hp: "",
            address: "",
            rtrw: "",
        });
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Data Orang Tua
                </h2>
                <label htmlFor="add-parent-modal" className="btn btn-primary">
                    Tambah Data
                </label>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
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
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-gray-100"
                            >
                                <td className="p-3">{item.parent_name}</td>
                                <td className="p-3">{item.kk_number}</td>
                                <td className="p-3">{item.nik}</td>
                                <td className="p-3">{item.phone_number}</td>
                                <td className="p-3">{item.address}</td>
                                <td className="p-3">{`${item.rt}/${item.rw}`}</td>
                                <td className="p-3">
                                    {" "}
                                    <button className="btn btn-ghost mr-2">
                                        Update
                                    </button>
                                    <button className="btn btn-error text-white">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <input
                type="checkbox"
                id="add-parent-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="add-parent-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">Tambah Data Orang Tua</h3>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Nama</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={newParent.name}
                            onChange={handleChange}
                            className="input input-bordered"
                        />

                        <label className="label mt-2">
                            <span className="label-text">Nomor KK</span>
                        </label>
                        <input
                            type="text"
                            name="kk"
                            value={newParent.kk}
                            onChange={handleChange}
                            className="input input-bordered"
                        />

                        <label className="label mt-2">
                            <span className="label-text">NIK</span>
                        </label>
                        <input
                            type="text"
                            name="nik"
                            value={newParent.nik}
                            onChange={handleChange}
                            className="input input-bordered"
                        />

                        <label className="label mt-2">
                            <span className="label-text">Nomor HP</span>
                        </label>
                        <input
                            type="text"
                            name="hp"
                            value={newParent.hp}
                            onChange={handleChange}
                            className="input input-bordered"
                        />

                        <label className="label mt-2">
                            <span className="label-text">Alamat</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={newParent.address}
                            onChange={handleChange}
                            className="input input-bordered"
                        />

                        <label className="label mt-2">
                            <span className="label-text">RT/RW</span>
                        </label>
                        <input
                            type="text"
                            name="rtrw"
                            value={newParent.rtrw}
                            onChange={handleChange}
                            className="input input-bordered"
                        />

                        <button
                            onClick={handleAddParent}
                            className="btn btn-primary mt-4"
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
