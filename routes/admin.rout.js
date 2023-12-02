import { Router } from "express";
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
const router = Router();
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
  res.render("pages/viwe&edituser", {
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
router.get("/view&editproviders", (req, res) => {
  res.render("pages/view&editproviders", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});


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
