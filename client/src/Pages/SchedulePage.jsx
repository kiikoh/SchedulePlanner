import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SchedulePage = () => {
	const [user, setUser] = useState({});
	const { username } = useParams();

	useEffect(() => {
		fetch(`http://localhost:5000/api/schedule/${username}`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setUser(res);
			});
	}, [username]);

	return <div>{JSON.stringify(user)}</div>;
};

export default SchedulePage;
