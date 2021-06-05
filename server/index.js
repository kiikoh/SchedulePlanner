require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const User = require("./models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./auth");

const connect = mongoose.connect(process.env.dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

connect.then((db) => console.log("Connected to the database.")).catch((err) => console.log(err));

app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).lean();

	if (!user) {
		return res.json({ status: "error", error: "Invalid username/password" });
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				name: user.name,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "14d" }
		);

		return res.json({ status: "OK", data: token });
	}

	res.json({ status: "error", error: "Invalid username/password" });
});

//TODO: More validation here
app.post("/api/register", async (req, res) => {
	const { username, name, pass: plainTextPassword, year } = req.body;
	if (!username || typeof username !== "string") {
		return res.json({ status: "error", error: "Invalid username" });
	}

	if (!plainTextPassword || typeof plainTextPassword !== "string") {
		return res.json({ status: "error", error: "Invalid password" });
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: "error",
			error: "Password too small. Should be atleast 5 characters",
		});
	}

	const password = await bcrypt.hash(plainTextPassword, 13);

	try {
		const response = await User.create({
			username,
			name,
			password,
			year,
			classes: [],
			access: [],
		});
		console.log("User created successfully: ", response);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: "error", error: "Username already in use" });
		}
		throw error;
	}

	res.json({ status: "OK" });
});

app.get("/api/schedule/:username", authMiddleware, async (req, res) => {
	const user = await User.findOne({ username: req.params.username }).lean();

	//User not found
	if (!user) res.status(404).json({ user: null, message: "Could not find user" });

	//Strip password field
	delete user.password;

	//User not given access
	if (!user.access.includes(req.user.username) && req.user.username !== req.params.username)
		res.status(403).json({ user: null, message: "User has not allowed access" });

	//User sent back
	res.json({ user });
});

app.listen(5000, () => {
	console.log("Server up at 5000");
});
