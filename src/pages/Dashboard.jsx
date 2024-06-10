import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Dashboard() {
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState([]);
    const [stuffs, setStuffs] = useState([]);
    const [users, setUsers] = useState([]);
    const [lendingGrouped, setLendingGrouped] = useState([]);
    const [checkProses, setCheckProses] = useState(false); //usestate buat pengkondisian

    const navigate = useNavigate();

    useEffect(() => {
        getDataStuffs();
        getDataUsers();
        getDataLendings();
    }, [checkProses]);

    useEffect(() => {
        axios.get(`http://localhost:8000/profile`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setIsLogin(true);
                setAuthUser(res.data.data);
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
    
    function getDataStuffs() {
        axios.get('http://localhost:8000/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data)
            })

            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
                }
            })
    }

    function getDataUsers() {
        axios.get('http://localhost:8000/users', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setUsers(res.data.data)
            })

            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
                }
            })
    }

    function getDataLendings() {
        axios.get('http://localhost:8000/lendings', { //axios memproses request lendings
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                const data = res.data.data;
                //mengelompokkan data berdasarkan date_time
                const groupedData = {};
                data.forEach((entry) => {
                    const date = new Date(entry.date_time);
                    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                    if (!groupedData[formattedDate]) {
                        groupedData[formattedDate] = [];
                    }
                    groupedData[formattedDate].push(entry);
                });

                //membuat struktur array baru yang berisi date (tanggal terformat sebelumnya)
                const processedData = Object.keys(groupedData).map((date) => ({
                    date,
                    totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
                }));
                //simpan data pada state
                setLendingGrouped(processedData);
                //mengubah state checkProses menjadi true untuk men-trigger useEffect
                setCheckProses(true);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            });
    }

    return (
        <>
            <Case />
            <div class="w-full h-auto max-w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-100 via-purple-100 to-white">

                <div className="justify-left p-5 w-5 h-10">
                    <Link to={'/profile'} className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="text-xl mb-4" />
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center m-10">
                    {
                        isLogin && authUser["role"] == 'admin' ? (
                            <>
                                <div className="p-4 w-1/2">
                                    <div className="flex rounded-lg h-full hover:bg-pink-300 shadow-lg shadow-inner shadow-gray-400 bg-pink-200 p-8 flex-col">
                                        <div className="flex items-center mb-3">
                                            <div
                                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full shadow-md shadow-indigo-300 bg-indigo-400 text-white flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                </svg>
                                            </div>
                                            <h2 className="text-white dark:text-white text-lg font-medium">Data <span className="text-indigo-400">Stuff</span></h2>
                                        </div>
                                        <div className="flex flex-col justify-between flex-grow">
                                            <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 w-1/2">
                                    <div className="flex rounded-lg h-full hover:bg-pink-300 shadow-lg shadow-inner shadow-gray-400 bg-pink-200 p-8 flex-col">
                                        <div className="flex items-center mb-3">
                                            <div
                                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full shadow-md shadow-indigo-300 bg-indigo-400 text-white flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                </svg>
                                            </div>
                                            <h2 className="text-white dark:text-white text-lg font-medium">Data <span className="text-indigo-400">User</span></h2>
                                        </div>
                                        <div className="flex flex-col justify-between flex-grow">
                                            <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : ''
                    }

                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={lendingGrouped}
                        margin={
                            {
                                top: 10,
                                left: 10,
                                right: 20,
                                bottom: 10
                            }
                        }
                    >
                        <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                        <XAxis dataKey="date"></XAxis>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="totalStuff" fill="#2563eb"></Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>

    )
}