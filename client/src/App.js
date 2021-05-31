import "./App.css";
import { Drawer, List, ListItem, ListItemText, Divider, ListItemIcon } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Menu, Inbox, Mail } from "@material-ui/icons";
import { useState } from "react";
import TopNav from "./Components/TopNav";

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
			<Drawer open={open} onClose={() => setOpen(false)}>
				<div role="presentation" onClick={() => setOpen(false)} onKeyDown={() => setOpen(false)}>
					<List>
						<ListItem button>
							<ListItemIcon>
								<Mail />
							</ListItemIcon>
							<ListItemText primary={"View Schedules"} />
						</ListItem>
					</List>
				</div>
			</Drawer>
		</ThemeProvider>
	);
}

export default App;
