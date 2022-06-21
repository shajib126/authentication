const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//create user
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      success: true,
      message: "user created",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

//login user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({
        message: "credential invalid",
      });
    }
    delete user._doc.password;
    const token = await jwt.sign({ user }, process.env.SEC_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login Successfull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};


const privateRoute = async(req,res)=>{
    res.status(200).json({
      message:"Private Routes"
    })
    
}
module.exports = { userRegister, userLogin,privateRoute };
