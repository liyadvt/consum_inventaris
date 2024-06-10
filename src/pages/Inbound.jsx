import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Inbound() {
    const [inbounds, setInbounds] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/inbound-stuffs/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                //console.log(res.data.data);
                setInbounds(res.data.data);
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
        "Total",
        "Date",
        "Proof File",
        "Action"
    ]

    const columnDatabase = {
        "stuff": "name",
        "stuff": "category",
        "total": null,
        "date": null,
        "proof_file": null,
    }

    const buttonData = [
        "edit",
        "delete"
    ]

    const endpoints = {
        "data": "http://localhost:8000/inbound-stuffs/data",
        "detail": "http://localhost:8000/inbound-stuffs/{id}",
        "delete": "http://localhost:8000/inbound-stuffs/delete/{id}",
        "update": "http://localhost:8000/inbound-stuffs/update/{id}",
        "store": "http://localhost:8000/inbound-stuffs/store",

    }

    const judulModal='Inbound';

    return (
        <>
            <Case />
            <div className="w-full h-auto max-w-full  bg-gradient-to-t from-purple-50 via-indigo-100 to-slate-50 ">
            
                <div className="justify-left p-5 w-5 mx-5 h-10">
                    <Link className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="text-xl mb-4" />
                    </Link>
                </div>
                <div className="mt-5">
                    <h1 className="text-indigo-400 text-center tracking-wide text-2xl font-bold">Data <span className="text-indigo-500"> Inbound </span></h1>
                </div>
                <div className="m-10">
                    <Table dataTh={dataThParent} dataTd={inbounds} columnDb={columnDatabase} buttonData={buttonData}></Table>
                </div>
            </div>
        </>
    )
}