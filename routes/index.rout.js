import { Router } from "express";
import { handleApp } from "../controller/applications.js";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  get_life_packages,
  get_medical_packages,
  get_car_packages,
} from "../controller/packages_controle.js";

import {SaveApp} from "../controller/applicantsController.js";


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
  res.render("pages/index", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/about", async (req, res) => {
  res.render("pages/about", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});


router.get("/form-1", async (req, res) => {
  res.render("pages/form", {
    user: req.session.user === undefined ? "" : req.session.user, SRC : "car"
  });
});
router.get("/form-2", async (req, res) => {
  res.render("pages/form", {
    user: req.session.user === undefined ? "" : req.session.user, SRC : "life"
  });
});
router.get("/form-3", async (req, res) => {
  res.render("pages/form", {
    user: req.session.user === undefined ? "" : req.session.user, SRC : "medical"
  });
});

router.post("/form-1",SaveApp("car"));
router.post("/form-2",SaveApp("life"));
router.post("/form-3",SaveApp("medical"));


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
router.get("/car_packages", get_car_packages);
router.get("/medical_packages", get_medical_packages);
router.get("/life_packages", get_life_packages);

export default router;
