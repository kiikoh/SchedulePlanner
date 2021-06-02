import { TextField, Typography } from "@material-ui/core";
import React from "react";

const Registration = () => {
	return (
		<form>
			<Typography variant="h4">Register</Typography>
			<div style={{ marginTop: 10 }}>
				<TextField required label="Email" variant="outlined" fullWidth />
			</div>
			<div style={{ marginTop: 10 }}>
				<TextField required label="Name" variant="outlined" fullWidth />
			</div>
			<div style={{ marginTop: 10 }}>
				<TextField required label="Password" variant="outlined" type="password" fullWidth />
			</div>
		</form>
	);
};

export default Registration;
