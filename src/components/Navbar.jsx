import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get(`http://localhost:8000/profile`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setAuthUser(res.data.data);
                setIsLogin(true);
                if (location.pathname === '/login') {
                    navigate('/profile')
                }
            })
            .catch(err => {
                setIsLogin(false);
                // console.log(err.response.status);
                if (err.response.status == 401 && location.pathname != '/login' && location.pathname != '/') {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }, [navigate]);

    return (
        <>
            <nav className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 border-white-200 shadow-inner border-solid border-b dark:bg-gray-900">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative shadow-lg shadow-indigo-500/40 ">
                    {/* User Name on the Left */}
                    <div className="flex items-center z-20">
                        {isLogin == true ? (
                            <span className="text-gray-900 dark:text-white mr-4">
                                <Link
                                    to={'/profile'}
                                    className="text-white bg-primary hover:bg-amber-300 border-solid border-2 border-violet-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
                                >
                                    {authUser.username}
                                </Link>
                            </span>
                        ) : isLogin == false ? (
                            <Link
                                to={'/login'}
                                className="text-white bg-primary hover:bg-amber-300 border-solid border-2 border-violet-300 focus:ring-4 focus:outline-none focus:ring-violet-200 font-medium rounded-full text-sm px-4 py-2"
                            >
                                Login
                            </Link>
                        ) : '' }
                    </div>

                    {/* Logo in Center */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                        <Link className="flex items-center space-x-3">
                            <img src="./public/icon.png" className="h-10" />
                            <span className="self-center text-2xl font-bold dark:text-white">Inventaris</span>
                        </Link>
                    </div>

                    {/* Full Menu on Larger Screens */}
                    <div className="hidden md:flex items-center space-x-4 ml-auto  z-20">
                        {
                            isLogin == true && authUser['role'] === 'admin' ? (
                                    <>
                                        <Link to={'/stuffs'} className="text-white p-2 hover:rounded-full hover:bg-primary active:bg-amber-300 focus:outline-none focus:ring focus:ring-violet-300 font-medium" >Stuff</Link>
                                        <Link to={'/inbounds'} className="text-white p-2 hover:rounded-full hover:bg-primary active:bg-amber-300 focus:outline-none focus:ring focus:ring-violet-300 font-medium">Inbound</Link>
                                        <Link to={'/lendings'} className="text-white p-2 hover:rounded-full hover:bg-primary active:bg-amber-300 focus:outline-none focus:ring focus:ring-violet-300 font-medium">Lending</Link>
                                        <Link to={'/user'} className="text-white p-2 hover:rounded-full hover:bg-primary active:bg-amber-300 focus:outline-none focus:ring focus:ring-violet-300 font-medium">User</Link>
                                    </>
                                ) : isLogin && authUser.role == 'staff' ?(
                                    <Link to={'/lendings'} className="text-white p-2 hover:rounded-full hover:bg-primary active:bg-amber-300 focus:outline-none focus:ring focus:ring-violet-300 font-medium">Lending</Link>
                                ) : ''
                        }
                    </div>

                    {/* Menu Toggle Button and Dropdown for Smaller Screens */}
                    <div className="relative md:hidden z-20">
                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-menu"
                            aria-expanded={isDropdownOpen}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" aria-hidden="true">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            isLogin == true && authUser.role == 'admin' ? (
                                
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                        <ul className="p-3 rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <li>
                                                <Link to={'/stuffs'} className="block px-4 py-2 text-sm text-gray-700 bg-white hover:rounded-lg hover:bg-purple-300" role="menuitem">Stuff</Link>
                                            </li>
                                            <li>
                                                <Link to={'/inbounds-create'} className="block px-4 py-2 text-sm text-gray-700 bg-white hover:rounded-lg hover:bg-purple-300" role="menuitem">Inbound</Link>
                                            </li>
                                            <li>
                                                <Link to={'/lendings'} className="block px-4 py-2 text-sm text-gray-700 bg-white hover:rounded-lg hover:bg-purple-300" role="menuitem">Lending</Link>
                                            </li>
                                            <li>
                                                <Link to="/user" className="block px-4 py-2 text-sm text-gray-700 bg-white hover:rounded-lg hover:bg-purple-300" role="menuitem">User</Link>
                                            </li>
                                        </ul>
                                    </div>
                                ) :  isLogin == true && authUser.role == 'staff' ? (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                        <ul className="p-3 rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <li>
                                                <Link to={'/lendings'} className="block px-4 py-2 text-sm text-gray-700 bg-white hover:rounded-lg hover:bg-purple-300" role="menuitem">Lending</Link>
                                            </li>
                                        </ul>
                                    </div>
                                ) : ''
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}