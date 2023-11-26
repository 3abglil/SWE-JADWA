// import supabase from './models/database.js';
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import session from "express-session";
// import supabase from './models/database.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

import Admin_Router from "./routes/admin.js";
import index_Router from "./routes/index.js";
import profile_Router from "./routes/profile.js";
import about_Router from "./routes/about.js";

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
app.use("/index", index_Router);
app.use("/profile", profile_Router);

app.listen(8000, () => {
  console.log("Server listening on port http://localhost:8000");
});

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
