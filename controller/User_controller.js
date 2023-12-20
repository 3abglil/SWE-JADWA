import User from "../models/user.js"
import Users from "../models/users.js"
import user_controller_constroct from "./user_controller_construct.js"
const users=new Users();
const user=new User();
class UserController extends user_controller_constroct{

  async UserSignin(req,res){
    const Email=req.body.logusername;
    const Password=req.body.logpassword;
    user.Signin(Email,Password,req,res);
  }
  async UserLogout(req,res){
    user.Logout(req,res);
  }
  async edit(req,res){
    const Fname= req.body.Fname;
    const Lname= req.body.Lname;
    const Phone= req.body.phone;
    const Address= req.body.Address;
    try{
    const value=await user.EditUser(req.session.user.id,Fname,Lname,Phone,Address,req,res);
    if(value){
      console.log(value)
    req.session.user=value;
    res.redirect('/user/viewprofile');
    }
    }catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  async UserSignup(req,res){
    const Fname= req.body.Fname;
    const Lname= req.body.Lname;
    const Email= req.body.Email;
    const Password= req.body.Password;
    const Phone= req.body.Phone;
    const Address= req.body.Address;
    console.log("zbyyyyy")
    console.log(Fname+Lname+Email+Password+Phone+Address)
    try{
    const value=await users.AddUser(Fname,Lname,Email,Password,Phone,Address,req,res)
    console.log(value);
    if (value) {
      req.session.user = value;
      console.log(req.session.user);
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send("An error occurred during sign up." + error.message);
  }
  }
}
export default UserController;