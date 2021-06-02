import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider, ListItemIcon } from "@material-ui/core";
import { Mail } from "@material-ui/icons";

const SideDrawer = ({ open, setOpen }) => {
	return (
		<Drawer open={open} onClose={() => setOpen(false)}>
			<div role="presentation" onClick={() => setOpen(false)} onKeyDown={() => setOpen(false)}>
				<List>
					<ListItem button>
						<ListItemIcon>
							<Mail />
						</ListItemIcon>
						<ListItemText primary={"View Schedules"} />
					</ListItem>
					<Divider />
				</List>
			</div>
		</Drawer>
	);
};

export default SideDrawer;
