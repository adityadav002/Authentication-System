/** @format */
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ email: email }, "secret", { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json({
      message: "User created successfully",
      user: { name: newUser.name, email: newUser.email },
      token,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ email: email }, "secret", { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        console.log(result);
        res.status(200).json({
          user: { name: user.name, email: user.email },
          token,
        });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
