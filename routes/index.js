import { Router } from "express";
import {handleApp , handlesignin , handleSignup , handleLogOut} from "../controller/applications.js";

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

router.get("/", (req, res) => {
  res.render("index",{ user: (req.session.user === undefined ? "" : req.session.user) });
});


router.get('/about', async(req, res)=> {
  res.render('about',{ user: (req.session.user === undefined ? "" : req.session.user) });
});


router.get("/form", async (req, res) => {
  res.render("form");
});
router.post("/form",handleApp);


router.get("/login", (req, res) => {
  res.render("reg");
});
router.post("/login",handlesignin);


router.get("/signup", (req, res) => {
  res.render("reg");
});
router.post("/signup",handleSignup);

router.get('/logout', handleLogOut);





export default router;
