import { Router } from "express";
import {
  handleApp,
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
router.get("/form", async (req, res) => {
  res.render("pages/form");
});
router.post("/form", handleApp);
export default router;