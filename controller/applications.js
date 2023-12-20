import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path, { resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "key to sign the cookie",
    resave: false,
    saveUninitialized: false,
  })
);

import supabase from "../db/database.js";

const handleApp = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("applicants")
      .insert([
        {
          Fname: req.body.Fname,
          Lname: req.body.Lname,
          Email: req.body.Email,
          Phone: req.body.Phone,
          Gender: req.body.gender == "male" ? req.body.gender : "female",
          Address: req.body.Address,
        },
      ])
      .select();
    console.log(data);
    console.log(error);
    res.send("Sign up successful!");
  } catch (error) {
    res.status(500).send("An error occurred during sign up." + error);
  }
};


const checkEmail = async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await supabase
      .from("users")
      .select("*")
      .eq("Email", req.body.Email);

    if (existingUser.data && existingUser.data.length > 0) {
      res.send("taken");
    } else {
      res.send("available");
    }
  } catch (error) {
    res.status(500).send("An error occurred during sign up." + error.message);
  }
  console.log(req.body.Email);
};



export { handleApp, checkEmail };
