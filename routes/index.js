const users = require("./users");
const { ErrorMessage } = require("../helper/message");
const validator = require("../helper/validator");



module.exports = async (app) => {
  app.use("/", users);

 



  app.get("/", async (req, res) => {
    try {
      

      return res.render("home", {
        user: req.session.user
        
      });
    } catch (e) {
      if (typeof e == "string") {
        e = new Error(e);
        e.code = 400;
      }
      return res
        .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
        .json(ErrorMessage(e.message));
    }
  });

  app.use("/*", (req, res) => {
    res.status(404).json({
      status: "Error",
      message: "Not found",
    });
  });
};
