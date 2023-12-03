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
  const existingPackage = await supabase
        .from("Providers")
        .select("*")
        .eq("id", req.body.providerId);
  
      if (!existingPackage.data || existingPackage.data.length < 1) {
        // Email already exists, handle accordingly (e.g., send an error response)
        return res.status(400).send("provider doesnot exist");
      }
      console.log(req.body);
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
            Personal_Accident:req.body.Personal_Accident,
            Dfixing:req.body.Dfixing,
            providerid:req.body.providerId,
            price:req.body.price
          },
        ])
        .select();
  
      if (error) {
        console.log(error);
        throw new Error(error.message); // Throw an error if there is an error during insertion
        
      }
  
      if (creed) {
        res.redirect("/admin/AddCarPackage");
      }
    } catch (error) {
      res.status(500).send("An error occurred during sign up: " + error.message);
    }
  };


  const getCarPackages = async (id) => { 
    try {
      // Select all packages from the 'CarPackages' table
      let query=supabase.from("CarPackages").select("providers(id, name),id,price,Personal_Accident,COinsurance,AgencyCOinsurance,Roadside_Assistance,Civil_Liability,Police_Report,Dfixing");
      if(id){
        query=query.eq("id", req.body.id);
      }
      const { data, error } = await query 
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Error fetching Providers:", error.message);
      throw error;
    }
  }

  export{AddCarPackage,getCarPackages}