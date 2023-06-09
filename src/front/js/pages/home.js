import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="titleBox">
				<h1 className="title"><span>Authentication project</span></h1>
			</div>
			<div className="mt-5">
				<div className="mb3">
					<h2>What do you need to do?</h2>
				</div>
				<div className="navbar" style={{marginBottom: '20rem'}}>
					<Link to={"/signup/"}><h5><span>Register</span></h5></Link>
					<Link to={"/login/"}><h5><span>Login</span></h5></Link>
					<Link to={"/private/"}><h5><span>Private</span></h5></Link>
				</div>
				

			</div>
			
			



			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};
