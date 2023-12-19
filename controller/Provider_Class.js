import supabase from "../models/database.js";
const unlinkAsync = promisify(fs.unlink);
import fs from 'fs/promises'; // Using fs.promises for async file operations
import { promisify } from 'util';
import provider_DB from './Providerconstruct.js';

class providerDatabase extends provider_DB {
    /**
        * @param {string} name The id takes string
        * @param {string} image The string
        */
         /**
        * @param {string} id The id takes string
        * @param {string} params The string
        * @param {string} newImage
        */

    // Class method
    async addProviders(name, image) {
        try {
        const { data, error } = await supabase
            .from('Providers')
            .insert([
            {
                name: name,
                image: image,
            },
            ]);
    
        if (error) {
            console.error('Error adding provider:', error);
            return false;
        }
    
        return true;
        } catch (error) {
        console.error('Error adding provider:', error);
        return false;
        }
    }


    // Class method
    async getAllProviders() {
        try {
        // Select all providers from the 'Providers' table
        const { data, error } = await supabase.from('Providers').select('*');
    
        if (error) {
            console.error('Error fetching Providers a7aaaaa:', error.message);
            return null;
        }
    
        return data;
        } catch (error) {
        console.error('Error fetching Providers:', error.message);
        return null;
        }
    }
  
       
    async fetchproviderbyid(id,params)  {
        try {
          // Fetch the user from Supabase based on the provided ID
          const { data, error } = await supabase
            .from("Providers")
            .select(params) // Adjust column names as per your database schema
            .eq("id", id);
      
          if (error) {
            console.error("Error fetching user:", error);
            return null;
          }
      
          if (data && data.length > 0) {
            // Render the edituseradmin view with the user data
    
            return data;
          } else {
            // User not found
            console.error("provider not found!");
           return null;
          }
        } catch (error) {
          console.error("Error fetching user:", error);
         return null;
        }
      };
    
    async editingprovider (id,name)  {
        try {
         
          const { data, error } = await supabase
            .from("Providers")
            .update({ name })
            .eq("id", id);
      
          if (error) {
            console.error("Error updating provider:", error);
            return false;
          }
      
            return true;
        } catch (error) {
          console.error("Error updating provider:", error);
          return false;
        }
      };

     // Class method
    async deleteProvider(id) {
        try {
        // Fetch the provider details to get the name and image
        const { data: providerData, error: providerError } = await supabase
            .from('Providers')
            .select('*')
            .eq('id', id)
            .single(); // Ensure only one row is returned
    
        if (providerError) {
            console.error('Error fetching provider details:', providerError);
            return false;
        }
    
        if (!providerData) {
            console.log('Provider not found');
            return false;
        }
    
        const { image } = providerData;
    
        // Delete the provider from the 'Providers' table
        const { error: deleteError } = await supabase
            .from('Providers')
            .delete()
            .eq('id', id);
    
        if (deleteError) {
            console.error('Error deleting provider:', deleteError);
            return false;
        }
    
        // Unlink the associated image
        const imagePath = './public/images/' + image; // Update the path if needed
        fs.unlink(imagePath, (err) => {
            if (err) {
            console.error('Error unlinking image:', err);
            return false;
            }
        });
    
        return true;
        } catch (error) {
        console.error('Error deleting provider:', error);
        return false;
        }
    }
  
    // Class method
    async editproviderdata(id) {
        try {
        const { data, error } = await supabase
            .from('Providers')
            .select('*')
            .eq('id', id);
    
        if (error) {
            console.error('Error fetching provider:', error);
            return null;
        }
    
        if (data && data.length > 0) {
            return data[0];
        } else {
            return null;
        }
        } catch (error) {
        console.error('Error fetching provider:', error);
        return null;
        }
    }
  
    // Class method
    async GetProviderImage(id) {
        try {
        const { data, error } = await supabase
            .from('Providers')
            .select('*')
            .eq('id', id);
    
        if (error) {
            console.error('Error fetching provider:', error);
            return null;
        }
    
        if (data && data.length > 0) {
            return data[0];
        } else {
            return null;
        }
        } catch (error) {
        console.error('Error fetching provider:', error);
        return null;
        }
    }
  
    // Class method
    async updateimage(id, newImage) {
        try {
        const { data, error } = await supabase
            .from('Providers')
            .update({ image: newImage })
            .eq('id', id);
    
        if (error) {
            console.error('Error updating provider image:', error);
            return false;
        }
    
        return true;
        } catch (error) {
        console.error('Error updating provider image:', error);
        return false;
        }
    }
  

    // Class method
    async updatedata(id, newData) {
        try {
        const { data, error } = await supabase
            .from('Providers')
            .update({
            name: newData.name,
            email: newData.email,
            phone: newData.phone,
            })
            .eq('id', id);
    
        if (error) {
            console.error('Error updating provider data:', error);
            return false;
        }
    
        return true;
        } catch (error) {
        console.error('Error updating provider data:', error);
        return false;
        }
    }
  
}


export default providerDatabase;