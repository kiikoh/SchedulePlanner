const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			first: {
				type: String,
				required: true,
			},
			last: {
				type: String,
				required: true,
			},
		},
		password: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
	},
	{
		collection: "users",
	}
);

module.exports = mongoose.model("User", UserSchema);
