const express = require("express");
const router = express.Router();
const data = require("../data");
const validate = require("../helper/validator");
const utils = require("../helper/utils");
const validator = require("../helper/validator");
const { errorCode } = require("../helper/common");
const { ErrorMessage } = require("../helper/message");

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  const params = {
    title: "Log into resume builder",
  };
  if (req.query != null && req.query.error != null) {
    params.error = req.query.error;
  }
  return res.render("login", params);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await usersData.loginUser(username, password);
    req.session.user = user;
    return res.json(user);
  } catch (e) {
    if (typeof e == "string") {
      e = new Error(e);
      e.code = errorCode.BAD_REQUEST;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .json(ErrorMessage(e.message));
  }
});

module.exports = router;
