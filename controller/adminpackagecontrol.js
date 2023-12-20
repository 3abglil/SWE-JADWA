  import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "key to sign the cookie",
    resave: false,
    saveUninitialized: false,
  })
);
import packagesDatabase from './Packages_class.js';

const database=new packagesDatabase();


////////////////////Car///////////////////////


const AddCarPackage = async (req, res) => {
  try {
    const { data: creed, error } = await database.addCarPackage(req.body);

    if (error) {
      console.log(error);
      throw new Error(error.message); // Throw an error if there is an error during insertion
    }

    if (creed) {
      res.redirect('/admin/view&editPackages');
    } else {
      // Handle case where the car package was not added successfully
      res.status(500).send('An error occurred during car package addition.');
    }
  } catch (error) {
    res.status(500).send('An error occurred during car package addition: ' + error.message);
  }
};

  const get_car_to_edit = async (req, res) => {
    try {
      // Call the class method to handle fetching the car package
      const carPackage = await database.get_car_to_edit(req.params.id);
  
      if (carPackage) {
        // Render the editCarPackages view with the car package data
        res.render("pages/editCarPackages", {
          car: carPackage,
          user: req.session.user === undefined ? "" : req.session.user,
        });
      } else {
        // Car package not found
        res.status(404).send("Car package not found");
      }
    } catch (error) {
      console.error("Error fetching car package:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  const editCarPackage = async (req, res) => {
    try {
      const PackageId = req.params.id;
      const {
        price,
        Dfixing,
        COinsurance,
        AgencyCOinsurance,
        Roadside_Assistance,
        Personal_Accident,
        Civil_Liability,
        Police_Report,
      } = req.body;
  
      // Use the carPackagesDatabase object to edit the car package
      const { data: existingPackage, error } = await database.editCarPackage(
        PackageId,
        {
          price,
          Dfixing,
          COinsurance,
          AgencyCOinsurance,
          Roadside_Assistance,
          Personal_Accident,
          Civil_Liability,
          Police_Report,
        }
      );
  
      if (error) {
        throw new Error(error.message);
      }
  
      if (!existingPackage || existingPackage.length < 1) {
        return res.status(400).send("Car package does not exist");
      }
  
      res.redirect("/admin/view&editPackages");
    } catch (error) {
      console.error("An error occurred during update:", error.message);
      res.status(500).send("Internal Server Error");
    }
  };


  const deleteCarPackages = async (req, res) => {
    try {
      // Assuming you have the car package's unique identifier in req.params.id
      const packageId = req.params.id;
  
      // Delete the car package using the class method
      const isDeleted = await database.deleteCarPackages(packageId);
  
      if (isDeleted) {
        res.status(200).end();
      } else {
        res.status(404).send('Car package not found');
      }
    } catch (error) {
      console.error('Error during car package deletion:', error.message);
      res.status(500).send('An error occurred during car package deletion: ' + error.message);
    }
  };
  


/////////////////Medical//////////////////
const AddMedicalPackage = async (req, res) => {
  try {
    // Assuming the medical package data is in req.body
    const packageData = req.body;

    // Add the medical package using the class method
    const result = await database.AddMedicalPackage(packageData);

    if (result) {
      res.redirect('/admin/view&editPackages');
    } else {
      res.status(400).send('Failed to add medical package');
    }
  } catch (error) {
    console.error('An error occurred during medical package addition:', error.message);
    res.status(500).send('An error occurred during medical package addition: ' + error.message);
  }
};

const get_Med_to_edit = async (req, res) => {
  try {
    // Fetch the medical package by ID
    const packageId = req.params.id;
    const medicalPackage = await database.get_Med_to_edit(packageId);

    if (medicalPackage) {
      // Render the editMedicalPackages view with the medical package data
      res.render('pages/editMedicalPackages', {
        Med: medicalPackage,
        user: req.session.user === undefined ? '' : req.session.user,
      });
    } else {
      // Medical package not found
      res.status(404).send('Medical package not found');
    }
  } catch (error) {
    console.error('Error fetching medical package:', error);
    res.status(500).send('Internal Server Error');
  }
};

const editMedicalPackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const {
      price,
      HospitalizationAndSurgery,
      Emergency,
      Medication_Coverage,
      Clinics_Coverage,
      XrayAndScans,
      Maternity_Coverage,
      Dental_Coverage,
      Optical_Coverage,
      Preexisting_Conditions,
    } = req.body;

    const updatedData = {
      price,
      HospitalizationAndSurgery,
      Emergency,
      Medication_Coverage,
      Clinics_Coverage,
      XrayAndScans,
      Maternity_Coverage,
      Dental_Coverage,
      Optical_Coverage,
      Preexisting_Conditions,
    };

    const isUpdated = await database.editMedicalPackage(packageId, updatedData);

    if (isUpdated) {
      res.redirect('/admin/view&editPackages');
    } else {
      res.status(400).send('Medical package not found');
    }
  } catch (error) {
    console.error('An error occurred during update:', error);
    res.status(500).send('Internal Server Error');
  }
};


const deleteMedicalPackages = async (req, res) => {
  try {
    // Assuming you have the medical package's unique identifier in req.params.id
    const packageId = req.params.id;

    // Delete the medical package using the class method
    const isDeleted = await database.deleteMedicalPackages(packageId);

    if (isDeleted) {
      res.status(200).end();
    } else {
      res.status(404).send('Medical package not found');
    }
  } catch (error) {
    console.error('Error during medical package deletion:', error.message);
    res.status(500).send('An error occurred during medical package deletion: ' + error.message);
  }
};


/////////////////Life///////////////////
const AddLifePackage = async (req, res) => {
  try {
    // Use the lifePackagesDatabase object to add the life package
    const lifePackageData = {
      Income: req.body.Income,
      Marriage: req.body.Marriage,
      Starting_Career: req.body.Starting_Career,
      Retirement: req.body.Retirement,
      Age: req.body.Age,
      Taxes: req.body.Taxes,
      providerId: req.body.providerId,
      price: req.body.price,
      type: req.body.type,
    };

    const result = await database.AddLifePackage(lifePackageData);

    if (result) {
      res.redirect("/admin/view&editPackages");
    }
  } catch (error) {
    res.status(500).send("An error occurred during sign up: " + error.message);
  }
};


const get_Life_to_edit = async (req, res) => {
  try {
    // Use the lifePackagesDatabase object to get the life package details by ID
    const lifePackageId = req.params.id;
    const lifePackageData = await database.get_Life_to_edit(lifePackageId);

    if (lifePackageData) {
      // Render the editLifePackages view with the life package data
      res.render("pages/editLifePackages", {
        Life: lifePackageData,
        user: req.session.user === undefined ? "" : req.session.user,
      });
    } else {
      // Life package not found
      res.status(404).send("Life package not found");
    }
  } catch (error) {
    console.error("Error fetching life package:", error);
    res.status(500).send("Internal Server Error");
  }
};


const editLifePackage = async (req, res) => {
  try {
    const PackageId = req.params.id;
    const { price, Income, Marriage, Starting_Career, Retirement, Age, Taxes } = req.body;

    // Use the lifePackagesDatabase object to update the life package
    const { data: existingPackage, error } = await database.editLifePackage(PackageId, {
      price,
      Income,
      Marriage,
      Starting_Career,
      Retirement,
      Age,
      Taxes,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!existingPackage || existingPackage.length < 1) {
      return res.status(400).send("Life package does not exist");
    }

    res.redirect("/admin/view&editPackages");
  } catch (error) {
    res.status(500).send("An error occurred during update: " + error.message);
  }
};


const deleteLifePackages = async (req, res) => {
  try {
    // Assuming you have the life package's unique identifier in req.params.id
    const packageId = req.params.id;

    // Delete the life package using the class method
    const isDeleted = await database.deleteLifePackages(packageId);

    if (isDeleted) {
      res.status(200).end();
    } else {
      res.status(404).send('Life package not found');
    }
  } catch (error) {
    console.error('Error during life package deletion:', error.message);
    res.status(500).send('An error occurred during life package deletion: ' + error.message);
  }
};

// In your controller function
const getAllPackages = async (req, res) => {
  try {
    console.log('Inside getAllPackages controller'); // Log to check if the function is being called

    // Call the class method to fetch all packages
    const packagesData = await database.getAllPackages();

    // Log the fetched data
    console.log('Fetched packages data:', packagesData);

    // Render the EJS template with the fetched data
    res.render('pages/view&editPackages', {
      user: req.session.user === undefined ? '' : req.session.user,
      carPackages:packagesData?.carPackages || [],
      medicalPackages:packagesData?.medicalPackages||[],
      lifePackages:packagesData?.lifePackages || [] 
    });
  } catch (error) {
    console.error('Error fetching packages:', error.message);
    // Handle the error or send an error response
    res.status(500).send('Internal Server Error');
  }
};

export{AddCarPackage,get_car_to_edit,editCarPackage,deleteCarPackages,
       AddLifePackage,deleteLifePackages,get_Life_to_edit,editLifePackage,
       deleteMedicalPackages,AddMedicalPackage,get_Med_to_edit,editMedicalPackage
       ,getAllPackages}