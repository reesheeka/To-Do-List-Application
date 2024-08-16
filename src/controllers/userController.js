const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');

//api to register user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Username, email and password is required",
        });
    }
    
    //check email validation
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid email address" });
    }

    //check password validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).send({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one uppercase, one lowercase, one number and one special character",
      });
    }
    
    //role of the user
    if (role != "Admin" && role != "User") {
      return res
        .status(400)
        .send({
          success: false,
          message: "Provide role as Admin and User only",
        });
    }

    //check already existing email
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).send({
        success: false,
        message: "Email already exist, provide another email",
      });
    }

    const newUser = await User.create({ username, email, password, role });

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } 
  catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//api to login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "to-do-list-application",
      { expiresIn: "1h" }
    );
    
    res.status(200).send({ success: true, token: token });
  } 
  catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//api to logout email
exports.logout = (req, res) => {
  res.status(200).send({ success: true, message: "Logged out successfully" });
};
