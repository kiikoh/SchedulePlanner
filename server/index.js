const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const connect = mongoose.connect(process.env.dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

connect
	.then((db) => {
		console.log("Connected to the database.");
	})
	.catch((err) => console.log(err));

app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).lean();

	if (!user) {
		return res.json({ status: "error", error: "Invalid username/password" });
	}

	if (await bcrypt.compare(password, user.password)) {
		// the email, password combination is successful
		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET
		);

		return res.json({ status: "OK", data: token });
	}

	res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/register", async (req, res) => {
	const { email, name, password: plainTextPassword } = req.body;

	if (!email || typeof email !== "string") {
		return res.json({ status: "error", error: "Invalid username" });
	}

	if (!name || typeof name !== "string") {
		return res.json({ status: "error", error: "Invalid name" });
	}

	if (!plainTextPassword || typeof plainTextPassword !== "string") {
		return res.json({ status: "error", error: "Invalid password" });
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: "error",
			error: "Password too small. Should be atleast 6 characters",
		});
	}

	const password = await bcrypt.hash(plainTextPassword, 13);

	try {
		const response = await User.create({
			email,
			name,
			password,
		});
		console.log("User created successfully: ", response);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: "error", error: "Email already in use" });
		}
		throw error;
	}

	res.json({ status: "OK" });
});

app.listen(5000, () => {
	console.log("Server up at 5000");
});
