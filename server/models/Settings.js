const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema(
	{},
	{
		collection: "users",
	}
);

module.exports = mongoose.model("Settings", SettingsSchema);
