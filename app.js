// import supabase from './models/database.js';
import express from 'express';
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';





const app = express();



import Admin_Router  from "./routes/admin.js";
import index_Router  from "./routes/index.js";
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
app.use(express.static(path.join(__dirname, 'public')));


import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_URL
const supabaseUrl = "https://hxvloruvdgwljekxwqwh.supabase.co"
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxvcnV2ZGd3bGpla3h3cXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5OTE4NDEsImV4cCI6MjAxMzU2Nzg0MX0.0GKNK-i7lszlopu2MSIkWtsiV3nFo4Kd2x_ryPzHeTw"
const supabase = createClient(supabaseUrl, supabaseKey)

// export default supabase



 
app.use('/', index_Router);
app.use('/admin', Admin_Router);



app.listen(8000, () => {
  console.log('Server listening on port 8000');
}); 
