import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
// import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";

export default function Table({ dataTh, dataTd, columnDb, buttonData, endpoints, columnDetail, judulModal, inputData }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [endpointsReplaced, setEndpointsReplaced] = useState({});

    function handleModalDelete(id) {
        //ambil data endpoint
        const endpointsDetail = endpoints['detail'];
        const endpointsDelete = endpoints['delete'];
        //replace / ganti id dari endpoint dengan id yang di klik
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const deleteReplaced = endpointsDelete.replace('{id}', id);

        //simpan di object baru
        const replaced = {
            "detail": detailReplaced,
            "delete": deleteReplaced
        }

        //kirim ke state
        setEndpointsReplaced(replaced);
        //ubah state agar modal tampil
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        //ambil data endpoint
        const endpointsDetail = endpoints['detail'];
        const endpointsUpdate = endpoints['update'];
        //replace / ganti id dari endpoint dengan id yang di klik
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const updateReplaced = endpointsUpdate.replace('{id}', id);

        //simpan di object baru
        const replaced = {
            "detail": detailReplaced,
            "update": updateReplaced
        }

        //kirim ke state
        setEndpointsReplaced(replaced);
        //ubah state agar modal tampil
        setIsOpenModalEdit(true);

    }

    function handleModalAdd(id) {
        const replaced = {
            "store": endpoints['store']
        }
        setEndpointsReplaced(replaced)
        setIsOpenModalAdd(true)
    }

    const navigate = useNavigate();
    function handleRestore(id) {
        //ubah {id} menjadi id yang di klik
        let endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                //ketika berhasil arahkan pada page ini
                navigate('/stuffs')
            })
            .catch(err => {
                console.log(err)
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }

    return (
        <>
            <div class="relative shadow-pink-100  overflow-x-auto shadow-md sm:rounded-lg">
                <div className="float-right justify-end ">
                    {
                        buttonData.includes("create") ? (
                            <button type="button" onClick={handleModalAdd} class="text-white bg-sky-300 hover:bg-sky-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">Create</button>
                        ) : ''
                    }
                    {
                        buttonData.includes("trash") ? (
                            <Link to={'/stuff-trash'} class="text-white bg-sky-300 hover:bg-sky-400 focus:ring-4 focus:ring-sky-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">Trash</Link>
                        ) : ''
                    }
                </div>

                <table class="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-indigo-400 uppercase bg-pink-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                dataTh.map((data, index) => (
                                    <th scope="col" class="px-6 text-center py-3" key={index}>
                                        {data}
                                    </th>
                                ))
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(dataTd).map(([index, value]) => (
                                <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-700">
                                    <td class="px-6 text-center font-semibold text-purple-400  py-4">
                                        {parseInt(index) + 1}.
                                    </td>
                                    {
                                        Object.entries(columnDb).map(([i, v]) => (
                                            <td class="px-6 text-center py-4"> {
                                                !v ? value[i] : value[i.replace(/[!@#$%^&*]/, '')] ? value[i.replace(/[!@#$%^&*]/, '')][v] : '0'
                                            }</td>
                                        ))
                                    }
                                    <td class="px-6 py-4 text-center">
                                        {
                                            buttonData.includes("edit") ? (
                                                <button onClick={() => handleModalEdit(value.id)} type="button" class="text-white shadow-gray-700 shadow-sm bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-1 text-center me-2 mb-2">Edit</button>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("delete") ? (
                                                <button type="button" onClick={() => handleModalDelete(value.id)}
                                                    class="text-white shadow-gray-700 shadow-sm bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-orange-700 font-medium rounded-full text-sm px-3 py-1 text-center me-2 mb-2">Delete</button>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("restore") ? (
                                                <button onClick={() => handleRestore(value.id)} type="button" class="text-white shadow-gray-700 shadow-sm bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-1 text-center me-2 mb-2">Restore</button>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("detail") ? (
                                                <button onClick={() => handleRestore(value.id)} type="button" class="text-white shadow-gray-700 shadow-sm bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-1 text-center me-2 mb-2">Detail</button>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("permanent-delete") ? (
                                                <button type="button" 
                                                    class="text-white shadow-gray-700 shadow-sm bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-orange-700 font-medium rounded-full text-sm px-3 py-1 text-center me-2 mb-2">Delete permanent</button>
                                            ) : ''
                                        }


                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointsReplaced} columnDetail={columnDetail}></ModalDelete>
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} endpoints={endpointsReplaced} columnDetail={columnDetail} judulModal={judulModal} inputData={inputData}></ModalEdit>
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModal} inputData={inputData} endpoints={endpointsReplaced} ></ModalAdd>
        </>
    )
}