import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import session from "express-session";
import fileUpload from "express-fileupload";
// import supabase from './models/database.js';
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


// import index_router  from "../routes/index.js";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(fileUpload());
// app.use(logger("common"));
// app.use(express.json());
// app.use(session({
//   secret:'key to sign the cookie',
// }))
app.use(express.static(path.join(__dirname, "public")));

// import { createClient } from '@supabase/supabase-js'

app.use("/", index_Router);
app.use("/admin", Admin_Router);
app.use("/user", user_Router);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("pages/err");
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


// import express from 'express';
// import bodyParser from 'body-parser';
// import path from "path";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);

// const app = express();
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// // app.use(fileUpload());
// // app.use(logger("common"));
// // app.use(express.json());
// // app.use(session({
// //   secret:'key to sign the cookie',
// // }))
// app.use(express.static(path.join(__dirname, 'public')));



// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

// // import supabase from '../models/database.js';

// app.get('/form', async(req, res)=> {
//     res.render('form');

// });

// const handleSignup = async (req, res, next) => {
//   console.log(req.body);
// };

// app.post('/form', handleSignup);

// // ... additional routes and server configuration

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });