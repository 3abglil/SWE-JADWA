import User from "../models/user.js"
import Users from "../models/users.js"
import admin_controller_constroct from "./admin_controller_construct.js";
const users=new Users();
const user=new User();
class AdminController extends admin_controller_constroct{

  async add_user(req,res){
    const Fname= req.body.Fname;
    const Lname= req.body.Lname;
    const Email= req.body.Email;
    const Password= req.body.Password;
    const Phone= req.body.Phone;
    const Gender=req.body.gender == "male" ? req.body.gender : "female";
    const Address= req.body.Address;
    try{
    const value=await users.AddUser(Fname,Lname,Email,Password,Phone,Gender,Address,req,res);
    if (value) {
      res.redirect("/admin/view&edituser");
    }}catch (error) {
      res.status(500).send("An error occurred during sign up: " + error.message);
    }
  }
  async edit_user(req,res){
    const userId = req.params.id;
    const Fname= req.body.Fname;
    const Lname= req.body.Lname;
    const Phone= req.body.phone;
    const Address= req.body.Address;
    try{
    const value= await user.EditUser(userId,Fname,Lname,Phone,Address,req,res);
    if(value){
      res.redirect("/admin/view&edituser");
    }
    }catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  async user_to_client(req,res){
    const userId = req.params.id;
    user.ToClient(userId,req,res);
  }
  async user_to_admin(req,res){
    const userId = req.params.id;
    user.ToAdmin(userId,req,res);
  }
  async user_delete(req,res){
    const userId = req.params.id;
    user.DeleteUser(userId,req,res);
  }
  async Get_Users(req,res){
    console.log("walahy da5alt")
    try {
      const data = await users.GetAllUsers(req,res);
      console.log(data)
      res.render("pages/view&edituser", {
        users: data,
        user: req.session.user === undefined ? "" : req.session.user,
      });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
  async Get_user(req,res){
    const Id=req.params.id;
    const data=await user.GetUser(Id,req,res);
    console.log(data);
    if (data && data.length > 0) {
      // Render the editprod view with the product data
      res.render("pages/edituseradmin", {
        edituser: data,
        user: req.session.user === undefined ? "" : req.session.user,
      });
    } else {
      // Product not found
      res.status(404).send("User not found");
    }
  }
}
export default AdminController;