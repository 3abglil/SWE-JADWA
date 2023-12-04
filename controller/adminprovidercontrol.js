import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs/promises'; // Using fs.promises for async file operations
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);

const app = express();

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

//HAMADAAA
const addProviders = async (req, res) => {
  try {
    console.log("Before Supabase Insert");
    const providerName = req.body.name;
    // const providerLogo = req.files;
    let imgFile;
    let uploadPath;
    let vall;
    if (req.files !== null) {
      if (Object.keys(req.files).length !== 0) {
        imgFile = req.files.logo;

        uploadPath = "./public/images/" + providerName + ".jpg";
        // Use the mv() method to place the file somewhere on your server
        imgFile.mv(uploadPath, function (err) {
          if (err) return res.status(500).send(err);
        });
        vall = providerName + ".jpg";
      }
    }
  
    // Insert the new provider into the 'Providers' table
    console.log(req.body);
    const { data, error } = await supabase.from("Providers").insert([
      {
        name: providerName,
        image: vall,
      },
    ]);
    console.log("After Supabase Insert");
    if (error) {
      throw new Error(error.message);
    }
    res.redirect("/admin/view&editproviders");
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .send("An error occurred during adding provider: " + error.message);
  }
};

const getAllProviders = async (req, res) => {
  try {
    // Select all providers from the 'Poviders' table
    const { data, error } = await supabase.from("Providers").select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching Providers:", error.message);
    throw error;
  }
}

const GETP = async (req, res) => {
  try {
    const providers = await getAllProviders();
    res.render("pages/view&editproviders", {
      providers: providers,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// const deleteProvider = async (req, res) => {
//   try {
//     const providerId = req.params.id;

//     // Fetch the provider details to get the image filename
//     const { data: providerData, error: providerError } = await supabase
//       .from('Providers')
//       .select('name', 'image')
//       .eq('id', providerId)
//       .single(); // Ensure only one row is returned

//     if (providerError) {
//       throw new Error(providerError.message);
//     }

//     if (!providerData) {
//       return res.status(404).send('Provider not found');
//     }

//     const { name, image } = providerData;

//     // Delete the provider from the 'Providers' table
//     const { error } = await supabase.from('Providers').delete().eq('id', providerId);

//     if (error) {
//       throw new Error(error.message);
//     }

//     // Unlink the associated image
//     const imagePath = `./public/images/${name}.jpg`;
//     await unlinkAsync(imagePath);

//     res.redirect('/admin/view&editproviders'); // Redirect to the providers list page
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).send('An error occurred during provider deletion: ' + error.message);
//   }
// };





const deleteProvider = async (req, res) => {
  try {
    const providerId = req.params.id;

    // Fetch the provider details to get the name and image
    const { data: providerData, error: providerError } = await supabase
      .from('Providers')
      .select('name', 'image')
      .eq('id', providerId)
      .single(); // Ensure only one row is returned

    if (providerError) {
      throw new Error(providerError.message);
    }

    if (!providerData) {
      return res.status(404).send('Provider not found');
    }

    const { name, image } = providerData;

    // Delete the provider from the 'Providers' table
    const { error: deleteError } = await supabase.from('Providers').delete().eq('id', providerId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    // Unlink the associated image
    const imagePath = `./public/images/${name}.jpg`; // Update the path if needed
    await unlinkAsync(imagePath);

    res.redirect('/admin/view&editproviders'); // Redirect to the product list page
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred during provider deletion: ' + error.message);
  }
};



export { addProviders , getAllProviders, GETP , deleteProvider };
