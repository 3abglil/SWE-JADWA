import {Router} from "express"
import { handleAdminSignup } from "../controller/applications.js";
const router = Router();

router.get("/",(req,res)=>{
    res.render("admin",{ user: (req.session.user === undefined ? "" : req.session.user) })
});     


router.get('/adduser',(req,res)=>{
    res.render('adduser',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
router.post('/adduser',handleAdminSignup);


router.get('/addproduct',(req,res)=>{
    res.render('addproduct',{ user: (req.session.user === undefined ? "" : req.session.user) });
    
})




export default router;