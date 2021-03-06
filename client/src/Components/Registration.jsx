import { TextField, Button, InputAdornment, Grid } from "@material-ui/core";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Registration = () => {
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const [confirm, setConfirm] = useState("");
	const [year, setYear] = useState("");

	const validate = () => {
		if (!first) return false;
		if (!last) return false;

		if (!username) return false;
		if (pass?.length < 5) return false;
		if (confirm !== pass) return false;
		if (!validateYear()) return false;

		return true;
	};

	const validateUsername = () => {
		const re = /^([a-zA-Z0-9_-]){3,20}$/;
		return username.match(re);
	};

	const validateYear = () => {
		const age = year - (new Date().getFullYear() % 1000);
		if (age < 0 || age > 4) return false;
		return true;
	};

	const submitRegistration = () => {
		if (!validate()) return;

		const prom = fetch("http://localhost:5000/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				name: {
					first,
					last,
				},
				pass,
				year,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status !== "OK") {
					throw new Error("Could not register");
				}
			});

		toast.promise(prom, {
			loading: "Registering...",
			success: "Successfully registered",
			error: "Could not register",
		});
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<TextField
					required
					label="First Name"
					variant="outlined"
					fullWidth
					value={first}
					onChange={(e) => setFirst(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					required
					label="Last Name"
					variant="outlined"
					fullWidth
					value={last}
					onChange={(e) => setLast(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					error={username !== "" && !validateUsername()}
					required
					label="Username"
					variant="outlined"
					fullWidth
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					error={pass !== "" && pass?.length < 5}
					required
					label="Password"
					variant="outlined"
					type="password"
					fullWidth
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					error={confirm !== "" && confirm !== pass}
					required
					label="Confirm Password"
					variant="outlined"
					type="password"
					fullWidth
					value={confirm}
					onChange={(e) => setConfirm(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					error={year !== "" && !validateYear()}
					required
					variant="outlined"
					type="number"
					InputProps={{ startAdornment: <InputAdornment position="start">Class of '</InputAdornment> }}
					fullWidth
					value={year}
					onChange={(e) => setYear(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button
					disabled={!validate()}
					fullWidth
					variant="contained"
					color="primary"
					onClick={() => submitRegistration()}
				>
					Sign Up
				</Button>
			</Grid>
		</Grid>
	);
};

export default Registration;
