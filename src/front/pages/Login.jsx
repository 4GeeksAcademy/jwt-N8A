import React from "react";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer()
    const [identifier, setIdentifier] = useState("") // email XOR username 
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: identifier.includes("@") ? identifier : "",
                    username: !identifier.includes("@") ? identifier : "",
                    password
                }),
            });

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "login failed.")
            } else {
                sessionStorage.setItem("token", data.access_token);
                window.location.href = "/private"
            }
        } catch (err) {
            setError("Network error or invalid response.")
        }
    }

    return (
        <div className="text-center mt-5">
            {/* <h1 className="display-4">Hello Rigo!!</h1>
            <p className="lead">
                <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
            </p> */}
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                            <div className="card border border-light-subtle rounded-4">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 className="h4 text-center">Login</h2>
                                            <h3 className="fs-6 fw-normal text-secondary text-center m-0">Enter your username or email, and your password to enter</h3>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit} action="#!">
                                        <div className="row gy-3 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="user"
                                                        id="user"
                                                        placeholder="Username OR Email"
                                                        value={identifier}
                                                        onChange={(e) => setIdentifier(e.target.value)}
                                                        required />
                                                    <label for="user" className="form-label">Username or email</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        id="password"
                                                        value={password}
                                                        placeholder="Password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required />
                                                    <label for="password" className="form-label">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button className="btn bsb-btn-xl btn-primary" type="submit">Sign in</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    {error && <p style={{ color: "red" }}>{error}</p>}
                                    <div className="row">
                                        <div className="col-12">
                                            <hr className="mt-5 mb-4 border-secondary-subtle" />
                                            <p className="m-0 text-secondary text-center">Don't have an account yet? <Link to="/signup"><p className="link-primary text-decoration-none">Sign up</p></Link></p>
                                        </div>
                                        <Link to="/">
                                            <button className="btn btn-primary">Back to home</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

