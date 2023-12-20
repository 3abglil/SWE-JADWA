import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import session from "express-session";
import fileUpload from "express-fileupload";
const app = express();
app.use(fileUpload());


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "key to sign the cookie",
    resave: false,
    saveUninitialized: false,
  })
);

import Admin_Router from "./routes/admin.rout.js";
import index_Router from "./routes/index.rout.js";
import user_Router from "./routes/user.rout.js"



export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));



app.use("/", index_Router);
app.use("/admin", Admin_Router);
app.use("/user", user_Router);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  let error = res.locals.error
  res.status(err.status || 500);
  res.render("pages/err" , {
    user: req.session.user === undefined ? "" : req.session.user,
  } , {err : "HELLO"});
});

// 404 page if ml2ash el page
app.use((req, res) => {
  res
    .status(404)
    .render("pages/404", {
      user: req.session.user === undefined ? "" : req.session.user,
    });
});

export default app;

