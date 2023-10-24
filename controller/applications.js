import express from "express";
import bodyParser from "body-parser";
import path from "path";
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

import supabase from "../models/database.js";

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


const handlesignin = async (req, res) => {
  try {


    const { data: cred, error } = await supabase
      .from("users")
      .select()
      .eq("Email", req.body.logusername );

    if (cred) {
      if (
        cred[0].Email == req.body.logusername &&
        cred[0].Password == req.body.logpassword
      ) {
        res.render('index');
      } 
    }
  } catch (error) {
    res.send(`Sign-in failed: ${error.message}`);
  }
};

const handleSignup = async (req, res) => {

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          Fname: req.body.Fname,
          Lname: req.body.Lname,
          Email: req.body.Email,
          Password: req.body.Password==req.body.ConfirmPassword?req.body.Password:"",
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


export { handleApp, handlesignin , handleSignup };
