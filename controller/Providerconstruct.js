// Define the interface
class provider_DB {
    constructor(){
       if(this.fetchproviderbyid ==null ||  this.editingprovider==null|| this.getAllProviders==null ||this.deleteProvider==null||this.addProviders==null ||this.editproviderdata==null ||this.GetProviderImage==null || this.updateimage==null || this.updatedata==null )
        {
            throw new Error("Class doesnot implement interface!");
        }   
       
       
    }

  }
  
export default provider_DB;