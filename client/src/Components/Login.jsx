import { Button, Grid, TextField } from "@material-ui/core";
import React, {useState} from "react";

const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField required label="Email" variant="outlined" fullWidth onChange={e => setEmail(e.target.value)} value={email}/>
			</Grid>
			<Grid item xs={12}>
				<TextField required label="Password" variant="outlined" type="password" fullWidth onChange={e => setPassword(e.target.value)} value={password}/>
			</Grid>
			<Grid item xs={12}>
				<Button fullWidth variant="contained" color="primary">Sign Up</Button>
			</Grid>
		</Grid>
	);
};

export default Login;
