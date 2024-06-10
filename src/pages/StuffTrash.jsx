import React, { useState, useEffect }from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StuffTrash(){
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Action"
    ]

    const [ stuffs, setStuffs ] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8000/stuffs/trash', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        //res : response
        //then ketika berhasil mau ngapain
        .then(res => {
            //abis logou berhasil, hps token di localstorage 
            setStuffs(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const columnDatabase = {
        "name": null,
        "category": null,
    }

    const buttons= [
        "restore",
        "permanent-delete",
    ]

    const endpoints = {
        "restore" : "http://localhost:8000/stuffs/trash/restore/{id}",
        "permanent-delete" : "http://localhost:8000/stuffs/trash/permanent-delete/{id}",
        
    }
    
    const columnDetailModalDelete = ''
    
    const judulModal = ''

    const inputData = {}

    return(
        <>
            <Case/>
            <div className="w-full h-auto max-w-full h-screen-bg-cover bg-gradient-to-t from-purple-50 via-indigo-100 to-slate-50 ">
                <div className="justify-left p-5 w-5 mx-5 h-10">
                    <Link to={'/stuffs'} className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="text-xl mb-4" />
                    </Link>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="mt-5">
                        <h1 className="text-indigo-400 text-center tracking-wide text-2xl font-bold"> Trash <span className="text-indigo-500"> Stuff </span></h1>
                    </div>
                    <div className="m-10">
                        <Table dataTh={dataThParent} dataTd={stuffs} columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModal={judulModal} inputData={inputData}></Table>
                    </div>
                </div>
            </div>
        </>
    )
}