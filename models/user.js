const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Name cannot exceed 30 charecter"],
      minLength: [2, "Name should have more than 2 charecter"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      validate: [validator.isEmail, "please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minLength: [8, "password should be greater than 8 charecter"],
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 10;
        },
        message: "Phone number must be 10 digits long",
      },
    },
    address: {
      type: String,
      maxLength: [150, "Address cannot exceed 150 charecter"],
      minLength: [4, "Address should have more than 4 charecter"],
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
