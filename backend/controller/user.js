import User from "../model/user.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/auth.js";

async function handleUserSignUp(req, res) {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new Error("Account already exists with this email.");
    const createdUser = await User.create({
      username,
      email,
      password,
    });
    return res.status(201).json({ msg: "success", createdUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Error creating a user", error: error.message });
  }
}

async function handleUserLogIn(req, res) {
  const body = req.body;
  try {
    const existingUser = await User.findOne({ email: body.email });
    if (!existingUser) throw new Error("Account doesn't exist");
    const isPasswordValid = await bcrypt.compare(
      body.password,
      existingUser.password
    );
    if (!isPasswordValid) throw new Error("Wrong Password, Try Again");
    const token = createToken(existingUser);
    if (!token) throw new Error("Failed To Log In, Try Again");
    res.cookie("token", token);
    return res.json({ user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

export { handleUserSignUp, handleUserLogIn };
