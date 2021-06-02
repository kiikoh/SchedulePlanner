import { TextField } from "@material-ui/core";
import React from "react";

const Login = () => {
	return (
		<form>
			<div style={{ marginTop: 25 }}>
				<TextField required label="Email" variant="outlined" fullWidth />
			</div>
			<div style={{ marginTop: 10 }}>
				<TextField required label="Password" variant="outlined" type="password" fullWidth />
			</div>
		</form>
	);
};

export default Login;
