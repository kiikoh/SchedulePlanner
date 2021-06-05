import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider, ListItemIcon } from "@material-ui/core";
import { Mail } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

function ListItemLink(props) {
	const { icon, primary, to } = props;

	const renderLink = React.useMemo(
		() => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
		[to]
	);

	return (
		<ListItem button component={renderLink}>
			{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
			<ListItemText primary={primary} />
		</ListItem>
	);
}

const SideDrawer = ({ open, setOpen }) => {
	const signOut = useSignOut();

	return (
		<Drawer open={open} onClose={() => setOpen(false)}>
			<div role="presentation" onClick={() => setOpen(false)} onKeyDown={() => setOpen(false)}>
				<List>
					<ListItemLink button to="/schedule" icon={<Mail />} primary="View Schedules" />
					<Divider />
					<ListItemLink button to="/settings" icon={<Mail />} primary="Settings" />
					<Divider />
					<ListItem button>
						<ListItemIcon>
							<Mail></Mail>
						</ListItemIcon>
						<ListItemText primary="Log Out" onClick={() => signOut()}></ListItemText>
					</ListItem>
				</List>
			</div>
		</Drawer>
	);
};

export default SideDrawer;
