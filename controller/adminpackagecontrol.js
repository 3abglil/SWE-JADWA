import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
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


////////////////////Car///////////////////////

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
            price:req.body.price,
            type:req.body.type
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
      let query=supabase.from("CarPackages").select("providers(id, name),id,price,Personal_Accident,COinsurance,AgencyCOinsurance,Roadside_Assistance,Civil_Liability,Police_Report,Dfixing,type");
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

/////////////////Medical//////////////////
const AddMedicalPackage = async (req, res) => {
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
        .from("MedicalPackages")
        .insert([
          {
            price: req.body.price,
            HospitalizationAndSurgery: req.body.HospitalizationAndSurgery,
            Emergency: req.body.Emergency,
            Medication_Coverage: req.body.Medication_Coverage,
            Clinics_Coverage: req.body.Clinics_Coverage,
            XrayAndScans: req.body.XrayAndScans_Coverage,
            Maternity_Coverage:req.body.Maternity_Coverage,
            Dental_Coverage:req.body.Dental_Coverage,
            Optical_Coverage:req.body.Optical_Coverage,
            Preexisting_Conditions:req.body.Preexisting_Conditions,
            providerid:req.body.providerId,
            price:req.body.price,
            type:req.body.type
          },
        ])
        .select();
  
      if (error) {
        console.log(error);
        throw new Error(error.message); // Throw an error if there is an error during insertion
        
      }
  
      if (creed) {
        res.redirect("/admin/AddMedicalPackage");
      }
    } catch (error) {
      res.status(500).send("An error occurred during sign up: " + error.message);
    }
  };

  const getMedicalPackages = async (id) => { 
    try {
      // Select all packages from the 'CarPackages' table
      let query=supabase.from("MedicalPackages").select("providers(id, name),id,price,HospitalizationAndSurgery,XrayAndScans,Emergency,Medication_Coverage,Clinics_Coverage,Preexisting_Conditions,Maternity_Coverage,Dental_Coverage,Optical_Coverage,type");
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

/////////////////Life///////////////////
const AddLifePackage = async (req, res) => {
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
        .from("LifePackages")
        .insert([
          {
            Income: req.body.Income,
            Marriage: req.body.Marriage,
            Starting_Career: req.body.Starting_Career,
            Retirement: req.body.Retirement,
            Age: req.body.Age,
            Taxes: req.body.Taxes,
            providerid:req.body.providerId,
            price:req.body.price,
            type:req.body.type
          },
        ])
        .select();
  
      if (error) {
        console.log(error);
        throw new Error(error.message); // Throw an error if there is an error during insertion
        
      }
  
      if (creed) {
        res.redirect("/admin/AddLifePackage");
      }
    } catch (error) {
      res.status(500).send("An error occurred during sign up: " + error.message);
    }
  };

const getLifePackages = async (id) => { 
  try {
    // Select all packages from the 'CarPackages' table
    let query=supabase.from("LifePackages").select("providers(id, name),id,price,Income,Marriage,Starting_Career,Retirement,Age,Taxes,type");
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



  export{AddCarPackage,getCarPackages,AddLifePackage,getLifePackages,getMedicalPackages,AddMedicalPackage}