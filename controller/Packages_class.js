import supabase from "../models/database.js";
const unlinkAsync = promisify(fs.unlink);
import fs from 'fs/promises'; // Using fs.promises for async file operations
import { promisify } from 'util';
import packages_DB from './PackagesConstruct.js';

class packagesDatabase extends packages_DB {
 /**
        * @param {string} newData The id takes string
        * @param {string} carPackageData The string
        * @param {string} providerId
        * @param {string} packageId
        */
         /**
        * @param {string} id The id takes string
        * @param {string} params The string
        * @param {string} lifePackageData
        * @param {string} updatedData
        * * @param {object} packageData - The data for the medical package.
        * @return {object|null} - The added data or null if an error occurs.
        */


    //////////////////////////////////////////Car///////////////////////////////////
    
    async addCarPackage(carPackageData) {
      try {
        const existingProvider = await supabase
          .from('Providers')
          .select('*')
          .eq('id', carPackageData.providerId);
    
        if (!existingProvider.data || existingProvider.data.length < 1) {
          // Provider does not exist, handle accordingly (e.g., send an error response)
          return null;
        }
    
        const { data, error } = await supabase
          .from('CarPackages')
          .insert([
            {
              Personal_Accident: carPackageData.Personal_Accident,
              COinsurance: carPackageData.COinsurance,
              AgencyCOinsurance: carPackageData.AgencyCOinsurance,
              Roadside_Assistance: carPackageData.Roadside_Assistance,
              Civil_Liability: carPackageData.Civil_Liability,
              Police_Report: carPackageData.Police_Report,
              Dfixing: carPackageData.Dfixing,
              providerid: carPackageData.providerId,
              price: carPackageData.price,
              type: carPackageData.type,
            },
          ])
          .select();
    
        if (error) {
          console.error('Error during car package insertion:', error);
          throw new Error(error.message); // Throw an error if there is an error during insertion
        }
    
        return data;
      } catch (error) {
        console.error('Error during car package insertion:', error);
        return null;
      }
    }

  async get_car_to_edit(packageId) {
    try {
      // Fetch the car package from the database based on the provided ID
      const { data, error } = await supabase
        .from("CarPackages")
        .select("*")
        .eq("id", packageId);

      if (error) {
        throw new Error(error.message);
      }

      return data && data.length > 0 ? data[0] : null; // Return the car package or null if not found
    } catch (error) {
      console.error("Error fetching car package:", error);
      return null;
    }
  }
  
  async editCarPackage(packageId, newData) {
    try {
      // Update the car package based on its unique identifier
      const { data, error } = await supabase
        .from("CarPackages")
        .update(newData)
        .eq("id", packageId)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error("Error editing car package:", error);
      return null;
    }
  }

  async deleteCarPackages(packageId) {
    try {
      // Use Supabase's delete method to remove the car package based on its unique identifier
      const { data, error } = await supabase
        .from('CarPackages')
        .delete()
        .eq('id', packageId);
  
      if (error) {
        console.error('Error during car package deletion:', error);
        return false;
      }
  
      // Check if any data is affected (indicating successful deletion)
      return data && data.length > 0;
    } catch (error) {
      console.error('Error during car package deletion:', error);
      return false;
    }
  }
  ///////////////////////////////////////Medical/////////////////////////////////

  async AddMedicalPackage(packageData) {
    try {
      // Check if the provider with the given ID exists
      const { data: existingProvider, error: providerError } = await supabase
        .from('Providers')
        .select('*')
        .eq('id', packageData.providerId);

      if (providerError) {
        console.error('Error checking provider existence:', providerError);
        return false;
      }

      if (!existingProvider || existingProvider.length < 1) {
        console.log('Provider does not exist');
        return false;
      }

      // Insert the medical package
      const { data, error } = await supabase
        .from('MedicalPackages')
        .insert([
          {
            price: packageData.price,
            HospitalizationAndSurgery: packageData.HospitalizationAndSurgery,
            Emergency: packageData.Emergency,
            Medication_Coverage: packageData.Medication_Coverage,
            Clinics_Coverage: packageData.Clinics_Coverage,
            XrayAndScans: packageData.XrayAndScans,
            Maternity_Coverage: packageData.Maternity_Coverage,
            Dental_Coverage: packageData.Dental_Coverage,
            Optical_Coverage: packageData.Optical_Coverage,
            Preexisting_Conditions: packageData.Preexisting_Conditions,
            providerid: packageData.providerId,
            type: packageData.type,
          },
        ]);

      if (error) {
        console.error('Error during medical package insertion:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error during medical package insertion:', error);
      return false;
    }
  }

  async get_Med_to_edit(packageId) {
    try {
      // Fetch the medical package from the database based on the provided ID
      const { data, error } = await supabase
        .from('MedicalPackages')
        .select('*')
        .eq('id', packageId);

      if (error) {
        console.error('Error fetching medical package:', error);
        return null;
      }

      return data && data.length > 0 ? data[0] : null; // Return the medical package or null if not found
    } catch (error) {
      console.error('Error fetching medical package:', error);
      return null;
    }
  }

  async editMedicalPackage(packageId, updatedData) {
    try {
      const { data, error } = await supabase
        .from('MedicalPackages')
        .update(updatedData)
        .eq('id', packageId)
        .select();

      if (error) {
        console.error('Error updating medical package:', error);
        return false;
      }

      return data && data.length > 0;
    } catch (error) {
      console.error('Error updating medical package:', error);
      return false;
    }
  }

  async deleteMedicalPackages(packageId) {
    try {
      // Use Supabase's delete method to remove the medical package based on its unique identifier
      const { data, error } = await supabase
        .from('MedicalPackages')
        .delete()
        .eq('id', packageId);

      if (error) {
        console.error('Error during medical package deletion:', error);
        return false;
      }

      // Check if any data is affected (indicating successful deletion)
      return data && data.length > 0;
    } catch (error) {
      console.error('Error during medical package deletion:', error);
      return false;
    }
  }
   ///////////////////////////////////Life////////////////////////////////////////

   async AddLifePackage(lifePackageData) {
    try {
      // Check if the provider with the given ID exists
      const { data: existingProvider, error: providerError } = await supabase
        .from("Providers")
        .select("*")
        .eq("id", lifePackageData.providerId);

      if (providerError) {
        console.error("Error checking provider existence:", providerError);
        return null;
      }

      if (!existingProvider || existingProvider.length < 1) {
        return res.status(400).send("Provider does not exist");
      }

      // Insert the life package data into the 'LifePackages' table
      const { data, error } = await supabase
        .from("LifePackages")
        .insert([
          {
            Income: lifePackageData.Income,
            Marriage: lifePackageData.Marriage,
            Starting_Career: lifePackageData.Starting_Career,
            Retirement: lifePackageData.Retirement,
            Age: lifePackageData.Age,
            Taxes: lifePackageData.Taxes,
            providerid: lifePackageData.providerId,
            price: lifePackageData.price,
            type: lifePackageData.type,
          },
        ])
        .select();

      if (error) {
        console.error("Error during life package insertion:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error during life package insertion:", error);
      return null;
    }
  }

  async get_Life_to_edit(packageId) {
    try {
      // Fetch the life package from the database based on the provided ID
      const { data, error } = await supabase
        .from("LifePackages")
        .select("*")
        .eq("id", packageId);

      if (error) {
        throw new Error(error.message);
      }

      return data && data.length > 0 ? data[0] : null; // Return the life package or null if not found
    } catch (error) {
      console.error("Error fetching life package:", error);
      return null;
    }
  }

  async editLifePackage(packageId, updatedData) {
    try {
      const { data, error } = await supabase
        .from("LifePackages")
        .update({
          price: updatedData.price,
          Income: updatedData.Income,
          Marriage: updatedData.Marriage,
          Starting_Career: updatedData.Starting_Career,
          Retirement: updatedData.Retirement,
          Age: updatedData.Age,
          Taxes: updatedData.Taxes,
        })
        .eq("id", packageId)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error("Error updating life package:", error);
      return null;
    }
  }

  async deleteLifePackages(packageId) {
    try {
      // Use Supabase's delete method to remove the life package based on its unique identifier
      const { data, error } = await supabase
        .from('LifePackages')
        .delete()
        .eq('id', packageId);

      if (error) {
        console.error('Error during life package deletion:', error);
        return false;
      }

      // Check if any data is affected (indicating successful deletion)
      return data && data.length > 0;
    } catch (error) {
      console.error('Error during life package deletion:', error);
      return false;
    }
  }
  //////////////////////////////////////////////////////////
  async getAllPackages() {
    try {
      // Select all car packages from the 'CarPackages' table
      const { data: carPackagesData, error: carPackagesError } = await supabase.from("CarPackages")
      .select("*, Providers(id,name)")
  
      // Select all medical packages from the 'MedicalPackages' table
      const { data: medicalPackagesData, error: medicalPackagesError } = await supabase.from("MedicalPackages").select("*,Providers(id,name)");
  
      // Select all life packages from the 'LifePackages' table
      const { data: lifePackagesData, error: lifePackagesError } = await supabase.from("LifePackages").select("*,Providers(id,name)");

      // Handle errors if any
      if (carPackagesError) {
        throw carPackagesError;
      }
      if (medicalPackagesError) {
        throw medicalPackagesError;
      }
      if (lifePackagesError) {
        throw lifePackagesError;
      }
      // Combine the data from different packages and return
      return {
        carPackages: carPackagesData || [],
        medicalPackages: medicalPackagesData || [],
        lifePackages: lifePackagesData || [],
      };
    } catch (error) {
      console.error('Error fetching packages:', error.message);
      throw error;
    }
  }
}
///////////////////////////////////////////////////
export default packagesDatabase;