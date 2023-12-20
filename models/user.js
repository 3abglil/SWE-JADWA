import supabase from "../db/database.js";
import user_constroct from "./user_construct.js"; 
class User extends user_constroct {
  /**
   * @param {int} id
   * @param {string} Fname
   * @param {string} Lname
   * @param {string} Email
   * @param {string} Password
   * @param {string} Phone
   * @param {string} Gender
   * @param {string} Address
   * @param {int} Age
   * @param {string} role
   */
  async GetUser(id,req,res){
    try {
      // Fetch the product from Supabase based on the provided ID
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id);
  
      if (error) {
        console.error("Error fetching product:", error);
        return null;
      }
  
      return data&&data.length>0? data[0]:null;
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  async EditUser(Id,Fname,Lname,Phone,Address,req,res){
    try {
  
      const { data:cred, error } = await supabase
        .from("users")
        .update({ Fname, Lname, Phone, Address })
        .eq("id", Id)
        .select();
  
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).send("Internal Server Error");
      }
      if (cred && cred.length > 0) {
        // Render the editprod view with the product data
        return cred;
      } else {
        // Product not found
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  async DeleteUser(id,req,res){
    try {
      // Use Supabase's delete method to remove the user based on their unique identifier
      const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", id); // Assuming the field in your database is named 'id'
  
      if (error) {
        throw new Error(error.message);
      }
      // User successfully deleted
  
      res.status(200).end();
    } catch (error) {
      res
        .status(500)
        .send("An error occurred during user deletion: " + error.message);
    }
  }
  async ToAdmin(id,req,res){
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ role: "A" })
        .eq("id", id);
  
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
  }
  async ToClient(id,req,res){
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ role: "C" })
        .eq("id", id);
  
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
  }
  async Signin(Email,Password,req,res){
    try {
      const { data: cred, error } = await supabase
        .from("users")
        .select()
        .eq("Email", Email);
  
      if (cred) {
        if (
          cred[0].Email == Email &&
          cred[0].Password == Password
        ) {
          req.session.user = cred[0];
          res.redirect("/");
        }
      }
    } catch (error) {
      res.send(`Sign-in failed: ${error.message}`);
    }
  }
  async Logout(req,res){
    req.session.destroy();
    res.redirect("/");
  }
}
export default User;