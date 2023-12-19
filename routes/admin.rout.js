import { Router } from "express";
import express from "express";
import fileUpload from "express-fileupload";
const app = express();
const router = Router();
import bodyParser from 'body-parser';
app.use(fileUpload());
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);

import providerDatabase from '../controller/Provider_class.js';
const database=new providerDatabase();//import { handleAdminSignup,} from "../controller/applications.js";

import {
  display_all_users,
  deleteUser,
  handleAdminSignup,
  toAdmin,
  toClient,
  edituser,
  editinguser,
} from "../controller/adminusercontrol.js";

import {AddCarPackage,get_car_to_edit,editCarPackage,deleteCarPackages,
  AddLifePackage,get_Life_to_edit,editLifePackage,deleteLifePackages,
  AddMedicalPackage,get_Med_to_edit,editMedicalPackage,deleteMedicalPackages,getAllPackages} from "../controller/adminpackagecontrol.js";


import {
  addProviders,GETP,editingprovider,deleteProvider,editproviderdata,
  GetProviderImage, updatedata, updateimage
} from "../controller/adminprovidercontrol.js";




// router.use((req, res, next) => {
//   if (req.session.user !== undefined && req.session.user.role === "A") {
//     next();
//     console.log(req.session.user.role);
//   } else {
//     res.render("pages/err", {
//       err: "You are not an Admin",
//       user: req.session.user === undefined ? "" : req.session.user,
//     });
//   }
// });

router.get("/", (req, res) => {
  res.render("pages/admin", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});



///////////////////////////////user/////////////////////////////////////

router.get("/adduser", (req, res) => {
  res.render("pages/adduser", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/view&edituser", display_all_users, (req, res) => {
  res.render("pages/view&edituser", {
    user: req.session.user === undefined ? "" : req.session.user,
  });

});


router.delete("/delete/:id",deleteUser);
router.get("/toAdmin/:id", toAdmin);
router.get("/toClient/:id", toClient);
router.get("/edituser/:id", edituser);
router.post("/editinguser/:id", editinguser);

router.post("/adduser", handleAdminSignup);
// router.get('/view&edituser',isAdmin,GET);

/////////////////////////////providers/////////////////////////////////

router.get("/addproviders", (req, res) => {
  res.render("pages/addproviders", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.post("/addproviders",addProviders);
//upload.single('providerLogo'),addProviders
router.post("/epg/:id",updateimage);
router.post("/epd/:id",updatedata);



router.get("/editprovider/:id", GetProviderImage );
router.get("/editproviderdata/:id" ,editproviderdata);
router.get("/view&editproviders",GETP );

router.post("/editingprovider/:id", editingprovider);
router.delete("/deleteProvider/:id", deleteProvider);

//////////////////////////////////packages////////////////////////////////////
//getall packages
router.get("/view&editPackages",getAllPackages);



////////////////////////////////////////Car////////////////////////////////////
router.get("/AddCarPackage", async(req, res) => {
  const providers = await database.getAllProviders();
  res.render("pages/AddCarPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    providers:providers
  });
});
router.post("/AddCarPackage", AddCarPackage);


router.get("/editCarPackages/:id", get_car_to_edit);
router.post("/editCarPackage/:id",editCarPackage)
router.delete("/deleteCarPackages/:id", deleteCarPackages);


//////////////////////////////////Medical///////////////////////////////////
router.get("/AddMedicalPackage", async(req, res) => {
  const providers = await database.getAllProviders();
  res.render("pages/AddMedicalPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    providers:providers
  });
});
router.post("/AddMedicalPackage", AddMedicalPackage);


router.get("/editMedicalPackages/:id", get_Med_to_edit);
router.post("/editMedicalPackage/:id",editMedicalPackage)
router.delete("/deleteMedicalPackages/:id", deleteMedicalPackages);

//////////////\\\\\\\\\\\\\//////////life/////////////\\\\\\\\\\/////////////////
router.get("/AddLifePackage", async(req, res) => {
  const providers = await database.getAllProviders();
  res.render("pages/AddLifePackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    providers:providers
  });
});
router.post("/AddLifePackage", AddLifePackage);

router.get("/abdelrahmaaaan", async(req, res) => {//m7desh yegeee gnbha na hzbotha (suezyy)
  //ghyr rout ----get all car packages 
  const packages = await getLifePackages();
  res.render("pages/AddLifePackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    packages:packages
  });
});


router.get("/abdelrahmaaaan/:id", async(req, res) => {//m7desh yegeee gnbha na hzbotha (suezyy)
  //specific package by id 
  const packages = await getLifePackages(req.params.id);
  res.render("pages/AddLifePackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    packages:packages
  });
});

router.get("/editLifePackages/:id", get_Life_to_edit);
router.post("/editLifePackage/:id",editLifePackage)
router.delete("/deleteLifePackages/:id", deleteLifePackages);

export default router;
