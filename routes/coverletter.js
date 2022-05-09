const express = require("express");
const router = express.Router();
const coverletterData = require("../data/coverletter");
const validator = require("../helper/validator");
const ErrorMessage = require("../helper/message").ErrorMessage;

router.get("/new", async (req, res) => {
  try {
    return res.render("new_coverLetter", {
      user: req.session.user,
    });
  } catch (e) {
    console.log(e);
    if (typeof e == "string") {
      e = new Error(e);
      e.code = 400;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .render("error", {
        code: validator.isValidResponseStatusCode(e.code) ? e.code : 500,
        error: e.message,
        user: req.session.user,
      });
  }
});
router.post("/new", async (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/users/login");
  }
  const {
    linkedin,
    fullname,
    // education
    managerName,
    companyAddress,
    companyPhone,
    companyEmail,
    salutation,

    firstParagraph,
    secondParagraph,
    thirdParagraph,
    finalParagraph,

  } = req.body;

  try {
    //create and store the new user
    const coverletter = await coverletterData.create(
      user._id,
      linkedin,
      fullname,
      managerName,
      companyAddress,
      companyPhone,
      companyEmail,
      salutation,

      firstParagraph,
      secondParagraph,
      thirdParagraph,
      finalParagraph,
    );
    res.redirect('/coverletter/build')
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

router.get("/preview", (req, res) => {
  try {
    return res.render("preview", {
      user: req.session.user,
    });
  } catch (e) {
    console.log(e);
    if (typeof e == "string") {
      e = new Error(e);
      e.code = 400;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .render("error", {
        code: validator.isValidResponseStatusCode(e.code) ? e.code : 500,
        error: e.message,
        user: req.session.user,
      });
  }
});

router.get("/build", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/users/login");
  }
  const users = coverletterData.build(user._id);
  if (users) {
    res.render("coverletter_template1", {
      layout: false,
      users: users,
    });
  } else {
    res.redirect("/coverletter/new");
  }

});

module.exports = router;
