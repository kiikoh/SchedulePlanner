import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const TopNav = ({ open, setOpen }) => {
	const classes = useStyles();
	const auth = useAuthUser();
	const isAuthenticated = useIsAuthenticated();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => setOpen(!open)}
					>
						<Menu />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Schedule Planner
					</Typography>

					{isAuthenticated() ? (
						<>
							<Typography variant="button">{auth().name.first + " " + auth().name.last}</Typography>
							<Avatar
								style={{ paddingLeft: 10 }}
								size={36}
								name={auth().name.first + " " + auth().name.last}
								variant="beam"
							/>
						</>
					) : (
						<Button color="secondary" to="/login" component={Link}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default TopNav;
