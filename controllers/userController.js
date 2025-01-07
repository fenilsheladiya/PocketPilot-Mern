const userModel = require("../models/userModel");

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body)
    await newUser.save()
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Export the controller
module.exports = { loginController, registerController };
