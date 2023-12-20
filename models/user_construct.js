// Define the interface
class user_constroct {
  constructor(){
     if(this.GetUser ==null ||  this.EditUser==null|| this.DeleteUser==null ||this.ToAdmin==null||this.ToClient==null ||this.Signin==null ||this.Logout==null)
      {
          throw new Error("Class doesnot implement interface!");
      }   
     
     
  }

}

export default user_constroct;