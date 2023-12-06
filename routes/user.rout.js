import { Router } from "express";
import {
  handlesignin,
  handleSignup,
  handleLogOut,
  checkEmail,
  editUserrr,
} from "../controller/applications.js";

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const router = Router();



router.post("/login", handlesignin);

router.get("/signup", (req, res) => {
  res.render("pages/reg");
});
router.post("/signup", handleSignup);
router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const isEmailTaken = await checkEmailExistence(email);
    res.json({ exists: isEmailTaken });
  } catch (error) {
    res.status(500).send("Error checking email existence: " + error.message);
  }
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

router.post("/edituser", editUserrr);




router.get("/logout", handleLogOut);

export default router;