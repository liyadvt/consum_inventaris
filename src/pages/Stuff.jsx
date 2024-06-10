import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stuff() {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     getStuffs()
    // }, []);

    const [stuffs, setStuffs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    navigate('/login?message' + encodeURIComponent('Anda belum login!'));
                }
            })
    }, []);

    const dataThParent = [
        "No",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"
    ]

    const columnDatabase = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec",
    }

    const endpoints = {
        "data": "http://localhost:8000/stuffs/data",
        "detail": "http://localhost:8000/stuffs/{id}",
        "delete": "http://localhost:8000/stuffs/delete/{id}",
        "update": "http://localhost:8000/stuffs/update/{id}",
        "store": "http://localhost:8000/stuffs/store",

    }

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash"
    ]

    const columnDetailModalDelete = 'name';

    const inputData = {
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag" : "select",
            "type" : "select",
            "option" : ["HTL", "KLN", "Sarpras/Teknisi"]
        },
    }

    const judulModal = 'Stuff'

    return (
        <>
            <Case />
            <div className="w-full h-auto max-w-full h-screen-bg-cover bg-gradient-to-t from-purple-50 via-indigo-100 to-slate-50 ">
                <div className="justify-left p-5 w-5 mx-5 h-10">
                    <Link to={'/dashboard'} className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="text-xl mb-4" />
                    </Link>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="mt-5">
                        <h1 className="text-indigo-400 text-center tracking-wide text-2xl font-bold">Data <span className="text-indigo-500"> Stuff </span></h1>
                    </div>
                    <div className="m-10">
                        <Table dataTh={dataThParent} dataTd={stuffs} columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModal={judulModal} inputData={inputData}></Table>
                    </div>
                </div>

            </div>


        </>


    )
}