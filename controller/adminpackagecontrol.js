import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
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
app.use(
  session({
    secret: "key to sign the cookie",
    resave: false,
    saveUninitialized: false,
  })
);

import supabase from "../models/database.js";

const AddCarPackage = async (req, res) => {
    try {
      const { data: creed, error } = await supabase
        .from("CarPackages")
        .insert([
          {
            Personal_Accident: req.body.Personal_Accident,
            COinsurance: req.body.COinsurance,
            AgencyCOinsurance: req.body.AgencyCOinsurance,
            Roadside_Assistance: req.body.Roadside_Assistance,
            Civil_Liability: req.body.Civil_Liability,
            Police_Report: req.body.Police_Report,
            Dfixing:req.body.Dfixing,
          },
        ])
        .select();
  
      if (error) {
        throw new Error(error.message); // Throw an error if there is an error during insertion
      }
  
      if (creed) {
        res.redirect("/admin/view&editproviders");
      }
    } catch (error) {
      res.status(500).send("An error occurred during sign up: " + error.message);
    }
  };
  export{AddCarPackage}