import { Router } from "express";
import express from "express";
import fileUpload from "express-fileupload";
const app = express();
app.use(fileUpload());

//import { handleAdminSignup,} from "../controller/applications.js";
import {
  display_all_users,
  deleteUser,
  handleAdminSignup,
  toAdmin,
  toClient,
  edituser,
  editinguser,
} from "../controller/adminusercontrol.js";

import {AddCarPackage,getCarPackages,deleteCarPackages,AddLifePackage,getLifePackages,deleteLifePackages,
  AddMedicalPackage,getMedicalPackages,deleteMedicalPackages,getAllPackages
} from "../controller/adminpackagecontrol.js";


import {
  addProviders,GETP,getAllProviders,editprovider,editingprovider,deleteProvider
} from "../controller/adminprovidercontrol.js";
const router = Router();
import bodyParser from 'body-parser';

router.use( bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))



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


router.delete("/delete/:id", deleteUser);
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

router.get("/view&editproviders",GETP , (req, res) => {
  res.render("pages/view&editproviders", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/editprovider/:id", editprovider);
router.post("/editingprovider/:id", editingprovider);
router.delete("/deleteProvider/:id", deleteProvider);

//////////////////////////////////packages////////////////////////////////////

router.get("/view&editPackages",getAllPackages , (req, res) => {
  res.render("pages/view&editPackages", {
    user: req.session.user === undefined ? "" : req.session.user,
  });

});



////////////////////////////////////////Car////////////////////////////////////


router.get("/AddCarPackage", async(req, res) => {
  const providers = await getAllProviders();
  res.render("pages/AddCarPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    providers:providers
  });
});

router.post("/AddCarPackage", AddCarPackage);


router.get("/abdelrahmaaaan", async(req, res) => {//m7desh yegeee gnbha na hzbotha (suezyy)
  //ghyr rout ----get all car packages 
  const packages = await getCarPackages();
  res.render("pages/AddCarPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    packages:packages
  });
});


router.get("/abdelrahmaaaan/:id", async(req, res) => {//m7desh yegeee gnbha na hzbotha (suezyy)
  //specific package by id 
  const packages = await getCarPackages(req.params.id);
  res.render("pages/AddCarPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    packages:packages
  });
});


router.delete("/deleteCarPackages/:id", deleteCarPackages);


//////////////////////////////////Medical///////////////////////////////////
router.get("/AddMedicalPackage", async(req, res) => {
  const providers = await getAllProviders();
  res.render("pages/AddMedicalPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    providers:providers
  });
});
router.post("/AddMedicalPackage", AddMedicalPackage);








router.get("/abdelrahmaaaan", async(req, res) => {//m7desh yegeee gnbha na hzbotha (suezyy)
  //ghyr rout ----get all car packages 
  const packages = await getMedicalPackages();
  res.render("pages/AddMedicalPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    packages:packages
  });
});

router.get("/abdelrahmaaaan/:id", async(req, res) => {//m7desh yegeee gnbha na hzbotha (suezyy)
  //specific package by id 
  const packages = await getMedicalPackages(req.params.id);
  res.render("pages/AddMedicalPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    packages:packages
  });
});


router.delete("/deleteMedicalPackages/:id", deleteMedicalPackages);



////////////////////////life//////////////////////////////
router.get("/AddLifePackage", async(req, res) => {
  const providers = await getAllProviders();
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

router.delete("/deleteLifePackages/:id", deleteLifePackages);


export default router;
