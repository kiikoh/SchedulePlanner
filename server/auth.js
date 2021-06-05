require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	try {
		const payload = jwt.verify(req.cookies._auth, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch (e) {
		console.log("invalid signature", req);
		res.json({ status: "error", error: "Invalid Token" });
	}
};
