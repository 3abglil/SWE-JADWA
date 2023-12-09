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

const editprovider = async (req, res) => {
  try {
    // Fetch the user from Supabase based on the provided ID
    const { data, error } = await supabase
      .from("Providers")
      .select("id, name, image") // Adjust column names as per your database schema
      .eq("id", req.params.id);

    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).send("Internal Server Error");
    }

    if (data && data.length > 0) {
      // Render the edituseradmin view with the user data
      res.render("pages/editprovideradmin", {
        provider: data[0],
        user: req.session.user === undefined ? "" : req.session.user,
      });
    } else {
      // User not found
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const editingprovider = async (req, res) => {
  try {
    const providerId = req.params.id;
    const { name } = req.body;

    const { data, error } = await supabase
      .from("Providers")
      .update({ name })
      .eq("id", providerId);

    if (error) {
      console.error("Error updating provider:", error);
      return res.status(500).send("Internal Server Error");
    }

    res.redirect("/admin/view&editproviders");
  } catch (error) {
    console.error("Error updating provider:", error);
    res.status(500).send("Internal Server Error");
  }
};
const deleteProvider = async (req, res) => {
  try {
    const providerId = req.params.id;

    // Fetch the provider details to get the name and image
    const { data: providerData, error: providerError } = await supabase
      .from('Providers')
      .select("*")
      .eq('id', providerId)
      .single(); // Ensure only one row is returned

    if (providerError) {
      throw new Error(providerError.message);
    }
console.log(providerData);
    if (!providerData) {
      return res.status(404).send('Provider not found');
    }
    console.log("wslt hna");
    const { name, image } = providerData;

    // Delete the provider from the 'Providers' table
    const { error: deleteError } = await supabase
    .from("Providers")
    .delete()
    .eq("id", providerId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  
    // Unlink the associated image
    const bee='./public/images/'+image; // Update the path if needed
    fs.unlink(bee, (err) => {
      if (err) {
        throw new Error(err.message);
      } // Redirect to the product list page
    });
    res.status(200).end();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred during provider deletion: ' + error.message);
  }
};


const editproviderdata = async (req, res) => {
  try {
   
    const { data, error } = await supabase
      .from("Providers")
      .select("*")
      .eq("id", req.params.id);

    if (error) {
      console.error("Error fetching product:", error);
      return res.status(500).send("Internal Server Error");
    }

    if (data && data.length > 0) {
      res.render("pages/editproviderdata", {
        ProvData: data[0],
        user: req.session.user === undefined ? "" : req.session.user,
      });
     
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const GetProviderImage = async (req, res) => {
  try {
   
    const { data, error } = await supabase
      .from("Providers")
      .select("*")
      .eq("id", req.params.id);

    if (error) {
      console.error("Error fetching product:", error);
      return res.status(500).send("Internal Server Error");
    }

    if (data && data.length > 0) {
      res.render("pages/editprovider", {
        ProvData: data[0],
        user: req.session.user === undefined ? "" : req.session.user,
      });
     
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updataimage = async (req, res) => {



    const { data, error } = await supabase
    .from("Providers")
    .update({ image: req.body.image })
    .eq("id", req.params.id);

    res.redirect(req.get('referer'));

};
const updatedata = async (req, res) => {

    const { data, error } = await supabase
    .from("Providers")
    .update({ name: req.body.name , email: req.body.email , phone: req.body.phone })
    .eq("id", req.params.id);

    res.redirect(req.get('referer'));
};
export { addProviders,editproviderdata, GetProviderImage , updataimage , updatedata, getAllProviders, GETP ,editprovider,editingprovider ,deleteProvider };
