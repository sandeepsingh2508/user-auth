const userDB = require("../models/user");
const bcrypt = require("bcryptjs");
const response = require("../middlewares/response");
const jwt = require("../utils/jwt");

const signUp = async (req, res) => {
  const { name, email, phone, password, address } = req.body;
  try {
    if (!name || !email || !phone || !password) {
      return response.validationError(
        res,
        "Cannot create an account without proper information"
      );
    }
    const findUser = await userDB.findOne({ email: email.toLowerCase() });

    if (findUser) {
      return response.errorResponse(
        res,
        "User Already exists.please login",
        400
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new userDB({
      name: name,
      password: hashPassword,
      email: email.toLowerCase(),
      phone: phone,
      address: address,
    }).save();

    const token = jwt(newUser._id);
    const result = {
      user: newUser,
      token: token,
    };
    response.successResponse(res, result, "Successfully saved the user");
  } catch (error) {
    console.error(error);
    response.internalServerError(res, error.message || "Internal server error");
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return response.validationError(
        res,
        "Cannot login without proper information"
      );
    }
    const findUser = await userDB.findOne({ email: email.toLowerCase() });
    if (!findUser) {
      response.notFoundError(res, "Cannot find the user");
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (comparePassword) {
      const token = jwt(findUser._id);
      const result = {
        user: findUser,
        token: token,
      };
      response.successResponse(res, result, "Login successful");
    } else {
      response.errorResponse(res, "Password incorrect", 400);
    }
  } catch (error) {
    console.log(error);
    response.internalServerError(res, error.message || "Internal server error");
  }
};

module.exports = {
  signUp,
  logIn,
};
