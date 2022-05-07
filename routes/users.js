const express = require("express");
const router = express.Router();
const data = require("../data");
const validate = require("../helper/validator");
const utils = require("../helper/utils");
const usersData = data.users;
const validator = require("../helper/validator");
const { errorCode } = require("../helper/common");
const { ErrorMessage, SuccessMessage } = require("../helper/message");
const { checkNonNull } = require("../helper/validator");

//Important: Do not pass a hashed password to the create function, the password hashing takes place before insertion

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  if (req.query != null && req.query.error != null) {
    params.error = req.query.error;
  }
  return res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    validator.checkNonNull(username, password);
    validator.checkString(username, "username");
    validator.checkString(password, "password");

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

//delete data
router.delete("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    validate.checkNonNull(id);
    validate.checkString(id);

    const deluser = await data.users.remove(id);
    res.json("The ${id} is deleted");
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

// get user
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  if (id !== req.session.user._id) {
    return res.redirect(
      "/?error=" + encodeURIComponent("You cannot view another user's profile.")
    );
  }
  try {
    validate.checkNonNull(id);
    validate.checkString(id);
    utils.parseObjectId(id, "User ID");
    const thisuser = await usersData.get(id);
   
  } catch (e) {
    return res.status(errorCode.NOT_FOUND).render("error", {
      code: errorCode.NOT_FOUND,
      error: e,
      user: req.session.user,
    });
  }
});


//signup

router.get("/users/register", async (req, res) => {
  if (!req.session.user) {
    return res.render("register");
  } else {
    return res.redirect("/");
  }
});

router.post("/users/register", async (req, res) => {
  const userData = req.body;
  //User input validation on user route by calling validation.js

  try {
    const {

      username,

      password,
    } = userData;
    const newUser = await usersData.create(

      username,

      password,

    );
    req.session.user = newUser;
    res.redirect("/");
  } catch (e) {
    return res.status(400).json(ErrorMessage(e));
  }
});

//update
// router.get("/users/update", async (req, res) => {
//   if (req.session.user) {
//     try {
//       let userId = req.session.user._id.toString();

//       return res.render("updateuser", {
//         title: "Update Profile",
//         user: userInfo,
//         nameOfUser: userInfo.firstName + " " + userInfo.lastName,
//       });
//     } catch (e) {
//       if (typeof e == "string") {
//         e = new Error(e);
//         e.code = 400;
//       }
//       return res
//         .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
//         .render("error", {
//           code: validator.isValidResponseStatusCode(e.code) ? e.code : 500,
//           error: e.message,
//           user: req.session.user,
//         });
//     }
//   } else {
//     return res.redirect("/login");
//   }
// });

// router.post("/users/update/", async (req, res) => {
//   const userData = req.body;
//   const id = req.session.user._id.toString();
//   // update validation in routes
//   try {
//     validate.checkNonNull(userData.firstName);
//     validate.checkNonNull(userData.lastName);
//     validate.checkNonNull(userData.email);
//     validate.checkNonNull(userData.phoneNumber);
//     validate.checkNonNull(userData.gender);
//     validate.checkNonNull(userData.street);
//     validate.checkNonNull(userData.city);
//     validate.checkNonNull(userData.state);
//     validate.checkNonNull(userData.zip);
//     validate.checkNonNull(userData.biography);
//     validate.checkString(userData.firstName);
//     validate.checkString(userData.lastName);
//     validate.checkString(userData.email);
//     validate.checkString(userData.phoneNumber);
//     validate.checkString(userData.gender);
//     validate.checkString(userData.street);
//     validate.checkString(userData.city);
//     validate.checkString(userData.state);
//     validate.checkString(userData.zip);
//     let address = {};
//     address.streetAddress = userData.street;
//     address.city = userData.city;
//     address.state = userData.state;
//     address.zip = userData.zip;
//     userData.address = address;
//     validate.checkString(userData.biography);
//     validate.checkEmail(userData.email);
//     validate.checkPhoneNumber(userData.phoneNumber);
//     validate.checkLocation(userData.address);
//     if (userData.images) {
//       validate.checkString(userData.images);
//     }
//   } catch (e) {
//     if (req.session.user.gender.toLowerCase() == "male") {
//       req.session.user.isMale = true;
//     } else if (req.session.user.gender.toLowerCase() == "female") {
//       req.session.user.isFemale = true;
//     } else {
//       req.session.user.isOther = true;
//     }
//     return res.render("updateuser", {
//       title: "Update Profile",
//       nameOfUser: req.session.user.firstName + " " + req.session.user.lastName,
//       user: req.session.user,
//       error: e,
//     });
//   }
//   try {
//     const firstName = userData.firstName;
//     const lastName = userData.lastName;
//     const email = userData.email;
//     const phoneNumber = userData.phoneNumber;
//     const gender = userData.gender;
//     const address = userData.address;
//     const biography = userData.biography;
//     let profilePicture = "";
//     if (userData.images != "") {
//       profilePicture = userData.images;
//     } else {
//       profilePicture = req.session.user.profilePicture;
//     }
//     const newUser = await usersData.update(
//       id,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       gender,
//       profilePicture,
//       address,
//       biography
//     );
//     req.session.user = newUser;
//     res.redirect("/");
//   } catch (e) {
//     if (req.session.user.gender.toLowerCase() == "male") {
//       req.session.user.isMale = true;
//     } else if (req.session.user.gender.toLowerCase() == "female") {
//       req.session.user.isFemale = true;
//     } else {
//       req.session.user.isOther = true;
//     }
//     return res.render("updateuser", {
//       title: "Update Profile",
//       nameOfUser: req.session.user.firstName + " " + req.session.user.lastName,
//       user: req.session.user,
//       error: e,
//     });
//     //res.status(500).json({ error: e });
//   }
// });


module.exports = router;
