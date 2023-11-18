import {Router} from "express"
import { handleAdminSignup } from "../controller/applications.js";
import { GET, deleteUser } from "../controller/adminusercontrol.js";


const router = Router();

router.get("/",(req,res)=>{
    res.render("admin",{ user: (req.session.user === undefined ? "" : req.session.user) })
});     


router.get('/adduser',(req,res)=>{
    res.render('adduser',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/view&edituser',GET);
router.delete('/delete/:id ',deleteUser);

router.post('/adduser',handleAdminSignup);


router.get('/addproduct',(req,res)=>{
    res.render('addproduct',{ user: (req.session.user === undefined ? "" : req.session.user) });
    
})




export default router;