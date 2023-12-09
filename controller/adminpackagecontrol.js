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
        res.redirect("/admin/view&editPackages");
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
  const get_car_to_edit = async (req, res) => {
    try {
      // Fetch the product from Supabase based on the provided ID
      const { data, error } = await supabase
        .from("CarPackages")
        .select("*")
        .eq("id", req.params.id);
  
      if (error) {
        console.error("Error fetching product:", error);
        return res.status(500).send("Internal Server Error");
      }
  
      if (data && data.length > 0) {
        // Render the editprod view with the product data
        res.render("pages/editCarPackages", {
          car: data[0],
          user: req.session.user === undefined ? "" : req.session.user,
        });
      } else {
        // Product not found
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  const editCarPackage = async (req, res) => {
    try {
      const PackageId = req.params.id;
      const {price, Dfixing, COinsurance, AgencyCOinsurance, Roadside_Assistance, Personal_Accident, Civil_Liability, Police_Report } = req.body;
  
      const { data: existingPackage, error } = await supabase
        .from("CarPackages")
        .update({
          price,
          Dfixing,
          COinsurance,
          AgencyCOinsurance,
          Roadside_Assistance,
          Personal_Accident,
          Civil_Liability,
          Police_Report,
        })
        .eq("id", PackageId)
        .select();
  
      if (error) {
        throw new Error(error.message);
      }
  
      if (!existingPackage || existingPackage.length < 1) {
        return res.status(400).send("Car package does not exist");
      }
  
      res.redirect("/admin/view&editPackages");
    } catch (error) {
      res.status(500).send("An error occurred during update: " + error.message);
    }
  };





  const deleteCarPackages = async (req, res) =>  { 
    try {
      // Assuming you have the user's unique identifier, such as userId, in req.params.id
      const packageId = req.params.id;
  
      // Use Supabase's delete method to remove the user based on their unique identifier
      const { data, error } = await supabase
        .from("CarPackages")
        .delete()
        .eq("id", packageId); // Assuming the field in your database is named 'id'
  
      if (error) {
        throw new Error(error.message);
      }
  
      
      // User successfully deleted
      res.status(200).end();
    } catch (error) {
      res.status(500).send("An error occurred during user deletion: " + error.message);
      // Promise.resolve();
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
        res.redirect("/admin/view&editPackages");
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

  const get_Med_to_edit = async (req, res) => {
    try {
      // Fetch the product from Supabase based on the provided ID
      const { data, error } = await supabase
        .from("MedicalPackages")
        .select("*")
        .eq("id", req.params.id);
  
      if (error) {
        console.error("Error fetching product:", error);
        return res.status(500).send("Internal Server Error");
      }
  
      if (data && data.length > 0) {
        // Render the editprod view with the product data
        res.render("pages/editMedicalPackages", {
          Med: data[0],
          user: req.session.user === undefined ? "" : req.session.user,
        });
      } else {
        // Product not found
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  const editMedicalPackage = async (req, res) => {
    try {
      const PackageId = req.params.id;

      const {price, HospitalizationAndSurgery, Emergency, Medication_Coverage, Clinics_Coverage, XrayAndScans, Maternity_Coverage, Dental_Coverage, Optical_Coverage, Preexisting_Conditions } = req.body;
  
     
      const { data: existingPackage, error } = await supabase
        .from("MedicalPackages")
        .update({
          price,
          HospitalizationAndSurgery,
          Emergency,
          Medication_Coverage,
          Clinics_Coverage,
          XrayAndScans,
          Maternity_Coverage,
          Dental_Coverage,
          Optical_Coverage,
          Preexisting_Conditions,
        })
        .eq("id", PackageId)
        .select();
  
      if (error) {
        throw new Error(error.message);
      }
  
      if (!existingPackage || existingPackage.length < 1) {
        return res.status(400).send("Medical package does not exist");
      }
  
      res.redirect("/admin/view&editPackages");
    } catch (error) {
      res.status(500).send("An error occurred during update: " + error.message);
    }
  };







  const deleteMedicalPackages = async (req, res) =>  { 
    try {
      // Assuming you have the user's unique identifier, such as userId, in req.params.id
      const packageId = req.params.id;
  
      // Use Supabase's delete method to remove the user based on their unique identifier
      const { data, error } = await supabase
        .from("MedicalPackages")
        .delete()
        .eq("id", packageId); // Assuming the field in your database is named 'id'
  
      if (error) {
        throw new Error(error.message);
      }

      
      // User successfully deleted
      res.status(200).end();
    } catch (error) {
      res.status(500).send("An error occurred during user deletion: " + error.message);
      // Promise.resolve();
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
        res.redirect("/admin/view&editPackages");
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

const get_Life_to_edit = async (req, res) => {
  try {
    // Fetch the product from Supabase based on the provided ID
    const { data, error } = await supabase
      .from("LifePackages")
      .select("*")
      .eq("id", req.params.id);

    if (error) {
      console.error("Error fetching product:", error);
      return res.status(500).send("Internal Server Error");
    }

    if (data && data.length > 0) {
      // Render the editprod view with the product data
      res.render("pages/editLifePackages", {
        Life: data[0],
        user: req.session.user === undefined ? "" : req.session.user,
      });
    } else {
      // Product not found
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};


const editLifePackage = async (req, res) => {
  try {
    const PackageId = req.params.id;

    const {price, Income, Marriage, Starting_Career, Retirement, Age, Taxes } = req.body;

   
    const { data: existingPackage, error } = await supabase
      .from("LifePackages")
      .update({
        price,
        Income,
        Marriage,
        Starting_Career,
        Retirement,
        Age,
        Taxes
      })
      .eq("id", PackageId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (!existingPackage || existingPackage.length < 1) {
      return res.status(400).send("Medical package does not exist");
    }

    res.redirect("/admin/view&editPackages");
  } catch (error) {
    res.status(500).send("An error occurred during update: " + error.message);
  }
};




const deleteLifePackages = async (req, res) =>  { 
  try {
    // Assuming you have the user's unique identifier, such as userId, in req.params.id
    const packageId = req.params.id;

    // Use Supabase's delete method to remove the user based on their unique identifier
    const { data, error } = await supabase
      .from("LifePackages")
      .delete()
      .eq("id", packageId); // Assuming the field in your database is named 'id'

    if (error) {
      throw new Error(error.message);
    }

    
    // User successfully deleted
    res.status(200).end();
  } catch (error) {
    res.status(500).send("An error occurred during user deletion: " + error.message);
    // Promise.resolve();
  }
}

///////////////////////////////////////////////////////////////////////
const getAllPackages = async (req, res) => {
  try {
    // Select all car packages from the 'CarPackages' table
    const { data: carPackagesData, error: carPackagesError } = await supabase.from("CarPackages")
    .select("*, Providers(id,name)")

    // Select all medical packages from the 'MedicalPackages' table
    const { data: medicalPackagesData, error: medicalPackagesError } = await supabase.from("MedicalPackages").select("*,Providers(id,name)");

    // Select all life packages from the 'LifePackages' table
    const { data: lifePackagesData, error: lifePackagesError } = await supabase.from("LifePackages").select("*,Providers(id,name)");

    // Handle errors if any
    if (carPackagesError) {
      throw carPackagesError;
    }
    console.log("Car Packages Data:", carPackagesData);

    if (medicalPackagesError) {
      throw medicalPackagesError;
    }

    if (lifePackagesError) {
      throw lifePackagesError;
    }

    // Render the EJS template with the fetched data
    res.render("pages/view&editPackages", {
      carPackages: carPackagesData || [],
      medicalPackages: medicalPackagesData || [],
      lifePackages: lifePackagesData || [],
    });

  } catch (error) {
    console.error("Error fetching packages:", error.message);
    // Handle the error or send an error response
    res.status(500).send("Internal Server Error");
  }
};






  export{AddCarPackage,getCarPackages,get_car_to_edit,editCarPackage,deleteCarPackages,
    AddLifePackage,getLifePackages,deleteLifePackages,get_Life_to_edit,editLifePackage,
    getMedicalPackages,deleteMedicalPackages,AddMedicalPackage,get_Med_to_edit,editMedicalPackage ,
    getAllPackages}