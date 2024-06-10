import React, { useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = new URLSearchParams(location.search).get('message');

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/login', values)
            .then(res => {
                localStorage.setItem('access_token', res.data.data.access_token);
                navigate('/profile');
            })
            .catch(err => {
                setError(err.response.data);
            })
    }


    return (
<>
    <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="max-w-screen-sm bg-white rounded-lg shadow-lg shadow-indigo-500/40  overflow-hidden flex md:flex-row flex-col">
                <div className="sm:w-1/2 px-6 py-8 flex flex-col justify-center">
                    <Link to={'/'} className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="text-xl mb-4" />
                    </Link>
                    <h2 className="text-3xl font-bold text-center text-violet-900 py-2 mb-4">Login</h2>
                    {errorMessage && (
                        <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 " role="alert">
                            <p className="font-bold"> Gagal memproses halaman </p>
                            <p className="text-sm">{errorMessage}</p>
                        </div>
                    )}
                    {Object.keys(error).length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 ">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 mb-4">
                                <ul>
                                    {Object.entries(error).map(([key, value]) => (
                                        <li key={key}>{key !== "status" && value}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <form className="space-y-4" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900"> Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" placeholder="name@gmail.com" onChange={e => setValues({ ...values, email: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" onChange={e => setValues({ ...values, password: e.target.value })} />
                        </div>
                        <button onClick={handleLogin} type="button" class="text-white bg-amber-200 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-amber-200 dark:hover:bg-amber-700 dark:focus:ring-amber-800">Login</button>
                    </form>
                </div>
                <div className="sm:w-1/2 bg-cover bg-center rounded-r-lg shadow-lg">
                    <img src="/login.png" alt="Login" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </div>
</>

    );
};