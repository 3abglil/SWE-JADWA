import {Router} from "express"
import { handleAdminSignup , isAdmin} from "../controller/applications.js";
import { GET, deleteUser } from "../controller/adminusercontrol.js";


const router = Router();


router.get("/",isAdmin,(req,res)=>{
    res.render("admin",{ user: (req.session.user === undefined ? "" : req.session.user) })
});     


router.get('/adduser',isAdmin,(req,res)=>{
    res.render('adduser',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/view&edituser',isAdmin,GET);
router.delete('/delete/:id ',isAdmin,deleteUser);

router.post('/adduser',isAdmin,handleAdminSignup);


router.get('/addproduct',isAdmin,(req,res)=>{
    res.render('addproduct',{ user: (req.session.user === undefined ? "" : req.session.user) });
    
})




export default router;