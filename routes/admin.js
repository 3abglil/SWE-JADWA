import {Router} from "express"
import { handleAdminSignup } from "../controller/applications.js";
const router = Router();

router.get("/",(req,res)=>{
    res.render("admin")
});     


router.get('/adduser',(req,res)=>{
    res.render('adduser');
});
router.post('/adduser',handleAdminSignup);


router.get('/addproduct',(req,res)=>{
    res.render('addproduct');
    
})




export default router;