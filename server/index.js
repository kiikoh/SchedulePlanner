const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const connect = mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
connect
	.then((db) => {
		console.log("Connected to the database.");
	})
	.catch((err) => console.log(err));

app.use(bodyParser.json());
