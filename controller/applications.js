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
app.use(session({
  secret:'key to sign the cookie',
  resave:false,
  saveUninitialized:false,
}))

import supabase from "../models/database.js";

const handleApp = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("applicants")
      .insert([
        {
          Fname: req.body.Fname,
          Lname: req.body.Lname,
          Email: req.body.Email,
          Phone: req.body.Phone,
          Gender: req.body.gender == "male" ? req.body.gender : "female",
          Address: req.body.Address,
        },
      ])
      .select();
    console.log(data);
    console.log(error);
    res.send("Sign up successful!");
  } catch (error) {
    res.status(500).send("An error occurred during sign up." + error);
  }
};


const handlesignin = async (req, res) => {
  try {


    const { data: cred, error } = await supabase
      .from("users")
      .select()
      .eq("Email", req.body.logusername );

    if (cred) {
      if (
        cred[0].Email == req.body.logusername &&
        cred[0].Password == req.body.logpassword
      ) {
        req.session.user = cred[0];
        res.redirect('/');
      } 
    }
  } catch (error) {
    res.send(`Sign-in failed: ${error.message}`);
  }
};

const handleSignup = async (req, res) => {

  try {
    const { data:cred, error } = await supabase
      .from("users")
      .insert([
        {
          Fname: req.body.Fname,
          Lname: req.body.Lname,
          Email: req.body.Email,
          Password: req.body.Password==req.body.ConfirmPassword?req.body.Password:"",
          role:"C"
        },
      ])
      .select();
    if(cred){
      req.session.user=cred[0];
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send("An error occurred during sign up." + error);
  }

};

// const handleAdminSignup = async (req, res) => {
//   try {
//     const { data:creed, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           Fname: req.body.Fname,
//           Lname: req.body.Lname,
//           Email: req.body.Email,
//           Password: req.body.Password,
//           Phone: req.body.Phone,
//           Address: req.body.Address,
//           // Gender: req.body.sex == "male" ? req.body.sex : "female",
          
//         },
//       ])
//       .select();
//       console.log(req.body.Fname+req.body.Lname + req.body.Email +req.body.Password+req.body.Phone+req.body.Address  );
//     if(creed){

//       console.log(creed[0]);
//       req.session.user=creed[0];
//       res.render("index");
//     }
//   } catch (error) {
//     res.status(500).send("An error occurred during sign up." + error.message);
//   }

// };

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
      req.session.user = creed[0];
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send("An error occurred during sign up: " + error.message);
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
    res.status(500).send("An error occurred during user deletion: " + error.message);
    // Promise.resolve();
  }
};





// const isAdmin = (req, res, next) => {
//   if (req.session.user !== undefined && req.session.user.role == 'A') { 
//   next();
//   console.log(req.session.user.role);
// } else {
//   res.redirect('error'); 
// }
// };

const handleLogOut = async (req , res)=>{
  req.session.destroy();
  res.redirect('/');
}

export { handleApp, handlesignin , handleSignup , handleLogOut , handleAdminSignup ,deleteUser};
