import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import Login from "../Components/Login";
import Registration from "../Components/Registration";

const LoginPage = () => {
	return (
		<Grid container>
			<Grid item xs={1} />
			<Grid item xs={4}>
				<Login></Login>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={4}>
				<Registration></Registration>
			</Grid>
			<Grid item xs={1} />
		</Grid>
	);
};

export default LoginPage;
