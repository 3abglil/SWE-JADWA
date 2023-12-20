import supabase from "../db/database.js";
import User from "./user.js";
import users_constroct from "./users_construct.js";
const users=new User();
class Users extends users_constroct{
  async GetAllUsers(req,res){
    try {
      // Select all users from the 'users' table
      const { data : cred, error } = await supabase.from("users").select("*");
  
      if (error) {
        throw error;
      }
      if (cred && cred.length > 0) {
        // Render the editprod view with the product data
        return cred;
      } else {
        // Product not found
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw error;
    }
  }
  async AddUser(Fname,Lname,Email,Password,Phone,Address,req,res){
    console.log("da5alt");
    try {
      const existingUser = await supabase
      .from("users")
      .select("*")
      .eq("Email",Email);

    if (existingUser.data && existingUser.data.length > 0) {
      // Email already exists, handle accordingly (e.g., send an error response)
      return res.status(400).send("Email is already taken");
    }
      const {data : cred , error } = await supabase
        .from("users")
        .insert([
          {
            Fname: Fname,
            Lname: Lname,
            Email: Email,
            Password: Password,
            Phone: Phone,
            Address: Address,
            role: "C",
          },
        ])
        .select();
        if (error) {
          throw new Error(error.message); // Throw an error if there is an error during insertion
        }
        
        if (cred) {
        console.log(cred)
        return cred;
      }
    } catch (error) {
      res.status(500).send("An error occurred during sign up: " + error.message);
    }
  }

  async GETAPP(req,res){
    try {
      // Select all users from the 'users' table
      const { data : cred, error } = await supabase.from("applicants").select("*");
  
      if (error) {
        throw error;
      }
      if (cred && cred.length > 0) {
        // Render the editprod view with the product data
        return cred;
      } else {
        // Product not found
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw error;
    }
  }
}
export default Users;