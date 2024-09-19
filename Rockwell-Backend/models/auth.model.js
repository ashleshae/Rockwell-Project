const mongoose = require("mongoose");
const { isValidemail } = require("../Utils/Constants");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isValidemail(value),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    min: [6, "password is too small-should be between length 6-12"],
    max: [12, "password is too big- should be between length 6-12"],
  },
});

export const User = mongoose.model("User", userschema);
