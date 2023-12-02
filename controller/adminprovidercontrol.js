import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
import fileUpload from "express-fileupload";


app.use(fileUpload());



// Other middleware configurations
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
// Multer configuration

import multer from 'multer';

// const addProviders = async (req, res) => {
//     try {
//         const providerName = req.body.name;
//         const providerLogo = req.file;

//         if (!providerLogo) {
//             throw new Error('Provider logo not found');
//         }

//         // Convert binary data to base64-encoded string
//         const base64Image = providerLogo.buffer.toString('base64');

//         // Insert the new provider into the 'Providers' table
//         const { data, error } = await supabase
//             .from('Providers')
//             .insert([
//                 {
//                     name: providerName,
//                     image: base64Image,
//                 },
//             ]);

//         if (error) {
//             throw new Error(error.message);
//         }

//         if (data) {
//             res.json({ message: 'Provider added successfully', data });
//         }
//     } catch (error) {
//         console.error('Error during provider addition:', error);
//         res.status(500).json({ error: 'Internal server error during provider addition' });
//     }
// };



//HAMADAAA
const addProviders = async (req, res) => {
  try {
    console.log("Before Supabase Insert");
    const providerName = req.body.name;
    const providerLogo = req.files;

    let base64Image=null;
    if (providerLogo) {
      base64Image = providerLogo.buffer.toString('base64');
    }
    // Convert binary data to base64-encoded string
    // Insert the new provider into the 'Providers' table
    console.log(req.body);
    const { data, error } = await supabase
      .from('Providers')
      .insert([
        {
          name: providerName,
          image: base64Image,
        },
      ]);
    console.log("After Supabase Insert");
    if (error) {
      throw new Error(error.message);
    }
    res.redirect("/admin/addproviders");
    
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred during adding provider: " + error.message);
  }
};




  
  

export { addProviders };