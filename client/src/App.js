import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider, PrivateRoute } from "react-auth-kit";
import { useState } from "react";
import TopNav from "./Components/TopNav";
import SideDrawer from "./Components/SideDrawer";
import LoginPage from "./Pages/LoginPage";
import SchedulePage from "./Pages/SchedulePage";
import SettingsPage from "./Pages/SettingsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#d32f2f",
		},
		secondary: {
			main: "#e1f5fe",
		},
	},
});

function App() {
	const [open, setOpen] = useState(false);

	return (
		<AuthProvider
			authType={"cookie"}
			cookieDomain={window.location.hostname}
			cookieSecure={window.location.protocol === "https:"}
		>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 2000,
				}}
			/>
			<ThemeProvider theme={theme}>
				<Router>
					<TopNav open={open} setOpen={setOpen} />
					<SideDrawer open={open} setOpen={setOpen} />
					<Switch>
						<Route path="/login" component={LoginPage} />
						<PrivateRoute path="/schedule" component={SchedulePage} loginPath="/login" />{" "}
						<PrivateRoute path="/settings" component={SettingsPage} loginPath="/login" />
					</Switch>
				</Router>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
