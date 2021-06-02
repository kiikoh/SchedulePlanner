import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";
import TopNav from "./Components/TopNav";
import SideDrawer from "./Components/SideDrawer";
import LoginPage from "./Pages/LoginPage";

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
		<ThemeProvider theme={theme}>
			<TopNav open={open} setOpen={setOpen} />
			<SideDrawer open={open} setOpen={setOpen} />
			<LoginPage></LoginPage>
		</ThemeProvider>
	);
}

export default App;
