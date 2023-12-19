import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import fs from 'fs/promises'; // Using fs.promises for async file operations
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);
const app = express();
import providerDatabase from './Provider_Class.js';
const database=new providerDatabase();

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

// import supabase from "../models/database.js";

// Controller function
const addProviders = async (req, res) => {
  try {
    const providerName = req.body.name;
    let imgFile;
    let uploadPath;
    let vall;

    if (req.files !== null && Object.keys(req.files).length !== 0) {
      imgFile = req.files.logo;
      uploadPath = "./public/images/" + providerName + ".jpg";

      // Use the mv() method to place the file somewhere on your server
      imgFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });

      vall = providerName + ".jpg";
    }

    // Call the class method to handle the insertion
    const isAdded = await database.addProviders(providerName, vall);

    if (!isAdded) {
      return res.status(500).send('Internal Server Error');
    }

    res.redirect("/admin/view&editproviders");
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred during adding provider: ' + error.message);
  }
};


// Controller function
const getAllProviders = async (req, res) => {
  try {
    // Call the class method to handle fetching all providers
    const providers = await database.getAllProviders(req,res);

    // Check if providers were successfully fetched
    if (!providers) {
      return res.status(500).send('Internal Server Error');
    }

    // Render or send the response as needed
    res.render('pages/allproviders', { providers });
  } catch (error) {
    console.error('Error fetching Providers:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

const GETP = async (req, res) => {
  try {
    const providers = await database.getAllProviders(req,res);
console.log(providers)   
 res.render("pages/view&editproviders", {
      providers: providers,
      user: req.session.user === undefined ? "" : req.session.user,
  
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const editingprovider = async (req, res) => {
  
    const providerId = req.params.id;
    const { name } = req.body;

    const isedited = await database.editingprovider(providerId,name)

    if (!isedited) {
      return res.status(500).send("Internal Server Error");
    }

    res.redirect("/admin/view&editproviders");
  }

// Controller function
const deleteProvider = async (req, res) => {
  try {
    const providerId = req.params.id;

    // Call the class method to handle the deletion
    const isDeleted = await database.deleteProvider(providerId);

    if (!isDeleted) {
      return res.status(500).send('Internal Server Error');
    }

    res.status(200).end();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred during provider deletion: ' + error.message);
  }
};

// Controller function
const editproviderdata = async (req, res) => {
  try {
    // Call the class method to handle fetching provider data
    const providerData = await database.editproviderdata(req.params.id);

    if (!providerData) {
      return res.status(404).send('Provider not found');
    }

    res.render('pages/editproviderdata', {
      ProvData: providerData,
      user: req.session.user === undefined ? '' : req.session.user,
    });
  } catch (error) {
    console.error('Error fetching provider data:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Controller function
const GetProviderImage = async (req, res) => {
  try {
    // Call the class method to handle fetching provider image
    const providerData = await database.GetProviderImage(req.params.id);

    if (!providerData) {
      return res.status(404).send('Provider not found');
    }

    res.render('pages/editprovider', {
      ProvData: providerData,
      user: req.session.user === undefined ? '' : req.session.user,
    });
  } catch (error) {
    console.error('Error fetching provider image:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Controller function
const updateimage = async (req, res) => {
  try {
    // Call the class method to handle updating the provider image
    const isUpdated = await database.updateimage(req.params.id, req.body.image);

    if (!isUpdated) {
      return res.status(500).send('Internal Server Error');
    }

    res.redirect(req.get('referer'));
  } catch (error) {
    console.error('Error updating provider image:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function
const updatedata = async (req, res) => {
  try {
    // Call the class method to handle updating provider data
    const isUpdated = await database.updatedata(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    if (!isUpdated) {
      return res.status(500).send('Internal Server Error');
    }

    res.redirect(req.get('referer'));
  } catch (error) {
    console.error('Error updating provider data:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { addProviders,editproviderdata, GetProviderImage , updateimage , updatedata, getAllProviders, GETP ,editingprovider ,deleteProvider };
