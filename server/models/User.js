const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: {
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
		classes: [
			{
				label: { type: String },
				dayOfWeek: {
					type: String,
					enum: ["M", "T", "W", "R", "F"],
					required: true,
				},
				startTime: {
					type: Number,
					required: true,
				},
				endTime: {
					type: Number,
					required: true,
				},
			},
		],
		access: [String],
	},
	{
		collection: "users",
	}
);

module.exports = mongoose.model("User", UserSchema);
