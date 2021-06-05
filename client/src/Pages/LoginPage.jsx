import { Container, Switch, Typography, Card } from "@material-ui/core";
import React, { useState } from "react";
import Login from "../Components/Login";
import Registration from "../Components/Registration";

const LoginPage = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<Container maxWidth="sm">
			<Card style={{ margin: "10px", padding: "25px", paddingLeft: "15px" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignContent: "space-between",
						padding: "10px",
					}}
				>
					<Typography variant="h6">{toggle ? "Register" : "Sign Up"}</Typography>
					<div>
						<Typography style={{ display: "inline" }}>Login</Typography>
						<Switch color="primary" checked={toggle} onChange={(e) => setToggle(e.target.checked)} />
						<Typography style={{ display: "inline" }}>Sign Up</Typography>
					</div>
				</div>
				{toggle ? <Registration /> : <Login />}
			</Card>
		</Container>
	);
};

export default LoginPage;
