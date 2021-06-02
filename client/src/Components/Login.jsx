import { TextField, Typography } from "@material-ui/core";
import React, {useState} from "react";

const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form>
			<Typography variant="h4">Login</Typography>
			<div style={{ marginTop: 10 }}>
				<TextField required label="Email" variant="outlined" fullWidth onChange={e => setEmail(e.target.value)} value={email}/>
			</div>
			<div style={{ marginTop: 10 }}>
				<TextField required label="Password" variant="outlined" type="password" fullWidth onChange={e => setPassword(e.target.value)} value={password}/>
			</div>
		</form>
	);
};

export default Login;
