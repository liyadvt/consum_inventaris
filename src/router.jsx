import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import Inbound from "./pages/Inbound";
import StuffTrash from "./pages/StuffTrash";
import Lending from "./pages/Lending";

export const router = createBrowserRouter([
    { path: '/', element:<App />},
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile/>},
    { path: '/dashboard', element: <Dashboard/>},
    { path: '/stuffs', element: <Stuff/>},
    { path: '/inbounds', element: <Inbound/>},
    { path: '/stuff-trash', element: <StuffTrash/>},
    { path: '/lendings', element: <Lending/>}
])