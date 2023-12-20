import { Router } from "express";
import {
  checkEmail,
} from "../controller/applications.js";

import express from "express";
import bodyParser from "body-parser";
import UserController from "../controller/User_controller.js";

const app = express();
const user_controller=new UserController();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const router = Router();



router.post("/login", (req, res) =>{
  user_controller.UserSignin(req,res);
});

router.get("/signup", (req, res) => {
  res.render("pages/reg");
});
router.post("/signup",(req, res) =>{ 
  user_controller.UserSignup(req,res);
});
router.post("/checkEmail", checkEmail);



router.use((req, res, next) => {
  if (req.session.user !== undefined && (req.session.user.role === "A" ||req.session.user.role === "C") ) {
    next();
    console.log(req.session.user.role);
  } else {
    res.render("pages/err", {
      err: "You must login first",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  }
});


router.get('/viewprofile', async(req, res)=> {
  res.render('pages/profile',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
router.get("/car", async (req, res) => {
  res.render("pages/car_insurance", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});
router.get("/medical", async (req, res) => {
  res.render("pages/medical_insurance", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});
router.get("/life", async (req, res) => {
  res.render("pages/life_incurance", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});
router.post("/edituser", (req, res) =>{ 
  user_controller.edit(req,res);
});


router.get("/logout", (req, res) =>{ 
  user_controller.UserLogout(req,res);
});

export default router;