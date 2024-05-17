import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
    { path: '/', element:<App />},
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile/>},
    { path: '/dashboard', element: <Dashboard/>},
])