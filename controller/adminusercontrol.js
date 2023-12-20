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

import supabase from "../db/database.js";

const handleAdminSignup = async (req, res) => {
  try {
    const { data: creed, error } = await supabase
      .from("users")
      .insert([
        {
          Fname: req.body.Fname,
          Lname: req.body.Lname,
          Email: req.body.Email,
          Password: req.body.Password,
          Phone: req.body.Phone,
          Address: req.body.Address,
          role: "C",
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message); // Throw an error if there is an error during insertion
    }

    if (creed) {
      res.redirect("/admin/view&edituser");
    }
  } catch (error) {
    res.status(500).send("An error occurred during sign up: " + error.message);
  }
};

const GetAllUsers = async (req, res) => {
  try {
    // Select all users from the 'users' table
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};


const display_all_users = async (req, res) => {
  try {
    const users = await GetAllUsers();
    res.render("pages/view&edituser", {
      users: users,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};


const deleteUser = async (req, res) => {
  try {
    // Assuming you have the user's unique identifier, such as userId, in req.params.id
    const userId = req.params.id;

    // Use Supabase's delete method to remove the user based on their unique identifier
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId); // Assuming the field in your database is named 'id'

    if (error) {
      throw new Error(error.message);
    }
    // User successfully deleted

    res.status(200).end();
  } catch (error) {
    res
      .status(500)
      .send("An error occurred during user deletion: " + error.message);
    // Promise.resolve();
  }
};

const toAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ role: "A" })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user role to admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.redirect("/admin/view&edituser");
    }
  } catch (error) {
    console.error("Error making user admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const toClient = async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ role: "C" })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user role to client:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.redirect("/admin/view&edituser");
    }
  } catch (error) {
    console.error("Error making user client:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const edituser = async (req, res) => {
  try {
    // Fetch the product from Supabase based on the provided ID
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.params.id);

    if (error) {
      console.error("Error fetching product:", error);
      return res.status(500).send("Internal Server Error");
    }

    if (data && data.length > 0) {
      // Render the editprod view with the product data
      res.render("pages/edituseradmin", {
        edituser: data[0],
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

const editinguser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { Fname, Lname, Phone, Address } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({ Fname, Lname, Phone, Address })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user:", error);
      return res.status(500).send("Internal Server Error");
    }

    res.redirect("/admin/view&edituser");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  display_all_users,
  deleteUser,
  handleAdminSignup,
  toAdmin,
  toClient,
  edituser,
  editinguser,
};
