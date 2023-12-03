import { Router } from "express";
import express from "express";

import fileUpload from "express-fileupload";
import multer from 'multer';
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

import {
  addProviders
} from "../controller/adminprovidercontrol.js";
const router = Router();
import bodyParser from 'body-parser';

router.use( bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))
const upload = multer({ dest: './public/images' }); // Adjust the destination directory as needed
// const upload = multer({ storage: multer.memoryStorage() });


router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.role === "A") {
    next();
    console.log(req.session.user.role);
  } else {
    res.render("pages/err", {
      err: "You are not an Admin",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  }
});

router.get("/", (req, res) => {
  res.render("pages/admin", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

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


router.get("/view&editproviders",GET , (req, res) => {
  res.render("pages/viwe&editproviders", {
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

router.get("/addproviders", (req, res) => {
  res.render("pages/addproviders", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.post("/addproviders",addProviders);
//upload.single('providerLogo'),addProviders







router.get("/AddCarPackage", (req, res) => {
  res.render("pages/AddCarPackage", {
    user: req.session.user === undefined ? "" : req.session.user,
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
