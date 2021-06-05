import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const signIn = useSignIn();
	const history = useHistory();

	const login = () => {
		const prom = fetch("http://localhost:5000/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status !== "OK") {
					throw new Error(res.error);
				}
				signIn({
					token: res.data,
					tokenType: "Bearer",
					expiresIn: 20160,
					authState: jwt_decode(res.data),
				});
				history.push("/settings");
			});

		toast.promise(prom, {
			loading: "Logging in...",
			success: "Successfully logged in",
			error: "Failed to login",
		});
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField
					required
					label="Email"
					variant="outlined"
					fullWidth
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					required
					label="Password"
					variant="outlined"
					type="password"
					fullWidth
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button fullWidth variant="contained" color="primary" onClick={() => login()}>
					Login
				</Button>
			</Grid>
		</Grid>
	);
};

export default Login;
