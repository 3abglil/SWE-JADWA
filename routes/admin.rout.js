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
import AdminController from "../controller/Admin_controller.js";
import providerDatabase from '../controller/Provider_class.js';
const admin=new AdminController();
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

router.get("/view&edituser", (req, res) =>{
  admin.Get_Users(req,res);
});
router.get("/viewApp", (req, res) =>{
  admin.DisplayApps(req,res);
});


router.delete("/delete/:id",(req, res) =>{
  admin.user_delete(req,res);
});
router.get("/toAdmin/:id", (req, res) =>{
  admin.user_to_admin(req,res);
});
router.get("/toClient/:id", (req, res) =>{
  admin.user_to_client(req,res);
});
router.get("/edituser/:id", (req, res) =>{
  admin.Get_user(req,res);
});
router.post("/editinguser/:id", (req, res) =>{
  admin.edit_user(req,res);
});

router.post("/adduser", (req, res) =>{
  admin.add_user(req,res);
});
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
