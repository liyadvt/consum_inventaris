import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ModalAdd({ isOpen, closeModal, inputData, endpoints, judulModal }) {
    

    if (!isOpen) {
        return null;
    }

    const [dataDetail, setDataDetail] = useState({});
    //const [error, setError] = useState({});    

    function handleStore(e) {
        //digunakan untuk event onsubmit agar halaman tidak ter refresh ketika klik button
        e.preventDefault();
        axios.post(endpoints['store'], dataDetail, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setDataDetail(dataSebelumnya => ({
            ...dataSebelumnya,
            [name]:value
        }))
    }



    return (
        <>
            <div id="crud-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center bg-purple-200 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-indigo-400 dark:text-white">
                                Add Data {judulModal}
                            </h3>
                            <button onClick={closeModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleStore} class="p-4 md:p-5">
                            {
                                Object.entries(inputData).map(([index, item]) => (

                                    <div className="mb-6">
                                        {
                                            item.type == "select" ? (
                                                <div class="col-span-2 ">
                                                    <label for={index} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
                                                    <select name={index} id={index} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange}>
                                                        <option hidden selected disabled>Select {index}</option>
                                                        {
                                                            item['option'].map((opt, index) => (
                                                                <option value={opt}>{opt}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            ) : (
                                                <div class="col-span-2">
                                                    <label for={index} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
                                                    <input type={item.type} name={index} id={index} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} />
                                                </div>
                                                
                                            )

                                        }
                                    </div>
                                ))
                            }


                            <button type="submit" class="text-white inline-flex items-center bg-indigo-400 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                                Update {judulModal}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}