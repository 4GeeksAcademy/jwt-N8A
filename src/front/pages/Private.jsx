// include logout button
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login") //no token = no access
        }
    }, [navigate])

    return (
        <div className="text-center mt-5">
            <h1>Welcome to the inner circle!</h1>
            <p>If you can see this, you're logged in ✅</p>

            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>

        </div>
    )
}