import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5 alert alert-info">
			<h1 className="display-4">Hello there!!</h1>
			<p className="lead">
				<img src="https://cdn.pixabay.com/photo/2014/04/02/10/12/checkbox-303113_1280.png" className="img-fluid rounded-circle mb-3" width={300} alt="verifCheck" />
			</p>
			<div className="alert alert-info">
				{/* {store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)} */}
				<Link to="/login"><button className="btn bsb-btn-xl btn-primary" type="submit"> Login </button></Link> <br />
				<span>New here?</span><br /><Link to="/signup"><button className="btn bsb-btn-xl btn-primary" type="submit"> Sign Up </button></Link>

				{/* <section className="bg-light p-3 p-md-4 p-xl-5">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
								<div className="card border border-light-subtle rounded-4">
									<div className="card-body p-3 p-md-4 p-xl-5">
										<div className="row">
											<div className="col-12">
												<h2 className="h4 text-center">Registration</h2>
												<h3 className="fs-6 fw-normal text-secondary text-center m-0">Enter your details to register</h3>
											</div>
									</div>
									<form action="#!">
										<div className="row gy-3 overflow-hidden">
											<div className="col-12">
												<div className="form-floating mb-3">
													<input type="text" className="form-control" name="username" id="username" placeholder="username" required />
													<label for="firstName" className="form-label">Username</label>
												</div>
											</div>
											<div className="col-12">
												<div className="form-floating mb-3">
													<input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required />
													<label for="email" className="form-label">Email</label>
												</div>
											</div>
											<div className="col-12">
												<div className="form-floating mb-3">
													<input type="password" className="form-control" name="password" id="password" value="" placeholder="Password" required />
													<label for="password" className="form-label">Password</label>
												</div>
											</div>
											{/* <div className="col-12">
													<div className="form-check">
														<input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree" required />
														<label className="form-check-label text-secondary" for="iAgree">
															I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
														</label>
													</div>
												</div> 
											<div className="col-12">
												<div className="d-grid">
													<button className="btn bsb-btn-xl btn-primary" type="submit">Sign up</button>
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
		</section> */}

			</div >
		</div >
	);
}; 