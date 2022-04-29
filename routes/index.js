const users = require("./users");
const resume = require("./resume");
const cv = require("./cv");
const coverLetter = require("./coverLetter");

module.exports = async (app) => {
	app.use("/", (req, res) => {
		return res.render("layouts/index");
	});

	app.use("/users", users);
	app.use("/resume", resume);
	app.use("/cv", cv);
  app.use("/coverLetter", coverLetter);

	app.use("/*", (req, res) => {
		res.status(404).json({
			status: "Error",
			message: "Not found",
		});
	});
};