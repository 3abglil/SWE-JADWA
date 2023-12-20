// Define the interface
class user_controller_constroct {
  constructor(){
     if(this.UserSignin ==null ||  this.UserLogout==null|| this.edit==null ||this.UserSignup==null)
      {
          throw new Error("Class doesnot implement interface!");
      }   
     
     
  }

}

export default user_controller_constroct;