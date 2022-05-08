const moment = require("moment");
const { ObjectId } = require("mongodb");

module.exports = {
  checkNonNull() {
    for (let i = 0; i < arguments.length; i++) {
      const val = arguments[i];
      if (val == null) throw `A field is either null or not passed`;
    }
  },

  checkNumber(num, varName) {
    if (varName == null) varName = "Parameter";
    if (num == null) throw `Must pass ${varName}`;
    num = parseFloat(num);
    if (isNaN(num)) throw `${varName} must be a number`;
  },

  checkString(str, varName) {
    if (!varName) varName = "Parameter";
    if (str == null) throw `Must pass ${varName}`;
    if (typeof str !== "string") throw `${varName} must be a string`;
    if (str.trim().length == 0)
      throw `${varName} must not be just empty spaces`;
  },

  checkPassword(str) {
    this.checkString(str, "Password");
    const regEx =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
    if (!str.match(regEx))
      throw `Password must contain at least one upper, one lower, one special character and one number`;
  },

  checkPhoneNumber(phone) {
    if (phone == null) throw `Must pass phone number`;
    const regEx = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/g;
    const regExSimple = /^[0-9]{10}$/g;
    if (!phone.match(regEx) && !phone.match(regExSimple))
      throw `Invalid phone number`;
  },

  checkEmail(email) {
    if (email == null) throw `Must pass email address`;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/g;
    if (!email.match(regex)) throw `Invalid email address`;
  },

  isValidObject(obj) {
    return typeof obj == "object" && !Array.isArray(obj);
  },

  isEmptyObject(obj) {
    if (this.isValidObject(obj)) {
      return Object.keys(obj).length == 0;
    }
    return true;
  },

  isValidObjectID(id) {
    if (!ObjectId.isValid(id)) {
      throw `Invalid id: ${id}`;
    }
    return ObjectId(id);
  },

  isValidResponseStatusCode(code) {
    if (code == null || isNaN(code)) return false;
    code = Number(code);
    return code >= 100 && code < 600;
  },
};
