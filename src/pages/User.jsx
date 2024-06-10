import React from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function User({}) {

    return(
        <>
            <Case/>
            <div className="w-full h-auto max-w-full h-screen-bg-cover bg-gradient-to-t from-purple-50 via-indigo-100 to-slate-50 ">
                <div className="justify-left p-5 w-5 mx-5 h-10">
                    <Link className="text-gray-600 hover:text-gray-800">
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