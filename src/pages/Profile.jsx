import React, { useState, useEffect } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
    const [profile, setProfile] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setProfile(res.data.data);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login'));
                }
            })
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        axios.get('http://localhost:8000/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                localStorage.removeItem('access_token');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <Case>
                <div
                    className="absolute inset-x-0 -top-60 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    ></div>
                </div>
                <div className="flex flex-col items-center mx-auto max-w-2xl pt-20 text-center">
                    <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Hello <span className="text-indigo-400">{profile.username}</span>!
                    </h4>
                    <p className="mt-2 text-lg leading-8 text-pink-300">Welcome to the inventory application</p>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="block w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl shadow-purple-200">
                        <div className="flex flex-col items-center pb-10 pt-10">
                            <FontAwesomeIcon icon="fas fa-user-circle" className="w-20 h-20 mb-3 text-gray-500" />
                            <h5 className="mb-1 text-xl font-medium text-purple-400 dark:text-white">{profile.username}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</span>
                            <div className="flex mt-4 md:mt-6">
                                <Link to="/dashboard" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-indigo-300">
                                    Dashboard
                                </Link>
                                <a onClick={handleLogout} className="py-2 px-4 ms-2 text-sm font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Case>
        </>

    )
}

