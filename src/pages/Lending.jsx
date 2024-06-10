import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Lending() {

    const dataThParent = [
        "No",
        "Name",
        "Date Time",
        "Name Lender",
        "Staff",
        "Notes",
        "Total",
        "Action"
    ]

    const [ lendings, setlendings ] = useState({});
    const [ stuffs, setStuffs] = useState([]);
    const [ stuffsName, setStuffsName] = useState([]);
    const [ users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/lendings/data', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        //res : response
        //then ketika berhasil mau ngapain
        .then(res => {
            //abis logou berhasil, hps token di localstorage 
            setlendings(res.data.data)
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/stuffs/', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        //res : response
        //then ketika berhasil mau ngapain
        .then(res => {
            //abis logou berhasil, hps token di localstorage 
            const filteredStuffs = res.data.data.filter(stuff => stuff.stuff_stock !== null);
            const stuffNames = filteredStuffs.map(stuff => stuff.id);
            setStuffs(stuffNames);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/users/', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })
    
        //res : response
        //then ketika berhasil mau ngapain
        .then(res => {
            //abis logou berhasil, hps token di localstorage 
            setUsers(res.data.data.map(user => user.username))
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, []);

    const columnDatabase = {
        "stuff": "name",
        "date_time": null,
        "name": null,
        "user": "username",
        "notes": null,
        "total_stuff": null,
    }

    const buttons = [
        "delete",
        "create",
        "detail"
    ]

    const endpoints = {
        "detail" : "http://localhost:8000/lendings/{id}",
        "delete" : "http://localhost:8000/lendings/delete/{id}",
        "store"  : "http://localhost:8000/lendings/store",
    }
    
    const columnDetailModalDelete = 'date_time'
    
    const judulModal = 'Lending'

    const inputData = {
            "stuff_id" : {
                "type" : "select",
                "option" : stuffs,
            },
            // "stuff_id" : {
            //     "type" : "text",
            //     "option" : null,
            // },
            "date_time" : {
                "type" : "datetime-local",
                "option" : null, 
            },
            "name" : {
                "type" : "text",
                "option" : null,
            },
            "notes" : {
                "type" : "text",
                "option" : null,
            },
            "total_stuff" : {
                "type" : "number",
                "option" : null,
            },
            
            "user_id" : {
                "type" : "select",
                "option" : users,
            },
            
    }


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
                        <h1 className="text-indigo-400 text-center tracking-wide text-2xl font-bold">Data <span className="text-indigo-500"> Lending </span></h1>
                    </div>
                    <div className="m-10">
                        <Table dataTh={dataThParent} dataTd={lendings} columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModal={judulModal} inputData={inputData}></Table>
                    </div>
                </div>

            </div>


        </>


    )
}