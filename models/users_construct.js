// Define the interface
class users_constroct {
  constructor(){
     if(this.GetAllUsers ==null ||  this.AddUser==null)
      {
          throw new Error("Class doesnot implement interface!");
      }   
     
     
  }

}

export default users_constroct;