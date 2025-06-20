import React from "react";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer()

    // useEffect(() => {
    //     loadMessage()
    // }, [])

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
                                    <form action="#!">
                                        <div className="row gy-3 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" name="user" id="user" placeholder="username or email" required />
                                                    <label for="user" className="form-label">Username or email</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="password" className="form-control" name="password" id="password" value="" placeholder="Password" required />
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
                                    <div className="row">
                                        <div className="col-12">
                                            <hr className="mt-5 mb-4 border-secondary-subtle" />
                                            <p className="m-0 text-secondary text-center">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

