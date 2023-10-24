import { Router } from "express";
import {handleApp , handlesignin , handleSignup} from "../controller/applications.js";

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
  res.render("index");
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



export default router;
