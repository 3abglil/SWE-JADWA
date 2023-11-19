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
app.use(session({
    secret: 'key to sign the cookie',
    resave: false,
    saveUninitialized: false,
}))

import supabase from "../models/database.js";

const GetAllUsers = async (req, res) => {

    try {
        // Select all users from the 'users' table
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
};


const GET = async (req, res) => {

    try {
        const users = await GetAllUsers();
        res.render('view&edituser', { users: users, user: (req.session.user === undefined ? "" : req.session.user) });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};


    const deleteUser = async (req, res) => {
        try {
          // Fetch user with the specified id
          const userIdToDelete = String(req.params.id).trim();
          const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userIdToDelete);
      
          if (error) {
            throw error;
          }
      
          // If user found, delete it
          if (users && users.length > 0) {
            const { error: deleteError } = await supabase
              .from('users')
              .delete()
              .eq('id', userIdToDelete);
      
            if (deleteError) {
              throw deleteError;
            }
      
            console.log(`User with id ${userIdToDelete} deleted successfully.`);
          } else {
            console.log(`User with id ${userIdToDelete} not found.`);
          }
        } catch (error) {
          console.error('Error deleting user:', error.message);
          throw error;
        }
      };
    //   const deletee = async  (req, res) => {
    //     try {
    //         const userIdToDelete = String(req.params.id).trim(); // Convert to string
    //         await deleteUser(userIdToDelete);
        
    //         // Respond to the client accordingly
    //         res.send(`User with id ${userIdToDelete} deleted successfully.`);
    //       } catch (error) {
    //         console.error('Error deleting user:', error.message);
    //         res.status(500).send('Internal Server Error');
    //       }
    //   };


    const toAdmin = async (req, res, next) => {
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
            res.redirect('/admin');
          } 
        }
      } catch (error) {
        res.send(`Sign-in failed: ${error.message}`);
      }
    }


export { GET, deleteUser };