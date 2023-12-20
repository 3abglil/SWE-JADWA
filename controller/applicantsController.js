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



const SaveApp = (Source)=>{
  return async (req, res, next , ) => {
    try {
      const { data, error } = await supabase
        .from("applicants")
        .insert([
          {
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            Email: req.body.Email,
            Phone: req.body.phone,
            Gender: req.body.option,
            Age: req.body.dob,
          },
        ])
        .select();
        if (data) {
          console.log("data", data);
        } 
        else
        if (error) {
          res.status(500).send("An error occurred during sign up." + error);
          console.log("error", error);
        }
        if(Source =="car"){
          res.redirect("/car_packages");
          return;
        }else if(Source =="life"){
          res.redirect("/life_packages");
          return;
        }else{
          res.redirect("/medical_packages");
          return;
        }

      
    } catch (error) {
      res.status(500).send("An error occurred during sign up." + error);
    }
  }
}


export  {SaveApp };