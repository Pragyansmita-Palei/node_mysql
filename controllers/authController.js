import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { findUserByEmail, createUserService } from "../services/authService.js";

// REGISTER
export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, usertype, address, answer } =
      req.body;

    // validation
    if (
      !userName ||
      !email ||
      !password ||
      !phone ||
      !usertype ||
      !address ||
      !answer
    ) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // check existing user
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already exists",
      });
    }

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user
    const result = await createUserService(
      userName,
      email,
      hashedPassword,
      address,
      phone,
      usertype,
      answer,
    );
    const user = {
      id: result.insertId,
      userName,
      email,
      phone,
      usertype,
      address,
      answer,
    };
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    // check user
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // create token
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //  password
     user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};
