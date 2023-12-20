// Define the interface
class admin_controller_constroct {
  constructor(){
     if(this.add_user ==null ||  this.edit_user==null ||  this.user_to_client==null ||  this.user_to_admin==null ||  this.user_delete==null ||  this.Get_Users==null)
      {
          throw new Error("Class doesnot implement interface!");
      }   
     
     
  }

}

export default admin_controller_constroct;