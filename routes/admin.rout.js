import { Router } from "express";
import express from "express";
import fileUpload from "express-fileupload";
const app = express();
app.use(fileUpload());

//import { handleAdminSignup,} from "../controller/applications.js";
import {
  GET,
  deleteUser,
  handleAdminSignup,
  toAdmin,
  toClient,
  edituser,
  editinguser,
} from "../controller/adminusercontrol.js";

import {AddCarPackage,getCarPackages
} from "../controller/adminpackagecontrol.js";

import {
  addProviders,GETP,getAllProviders,deleteProvider
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

router.get("/view&edituser", GET, (req, res) => {
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


router.delete("/deleteProvider/:id", deleteProvider);

//////////////////////////////////packages////////////////////////////////////




router.get("/AddCarPackage", async(req, res) => {
  const providers = await getAllProviders();
  res.render("pages/AddCarPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
    providers:providers
  });
});

router.post("/AddCarPackage", AddCarPackage);


router.get("/abdelrahmaaaan", async(req, res) => {//m7desh yegeee gnbha na hzbotha (suezyy)
  //ghyr rout ----get all packages 
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

router.get("/AddMedicalPackage", (req, res) => {
  res.render("pages/AddMedicalPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/AddLifePackage", (req, res) => {
  res.render("pages/AddLifePackage", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

export default router;
