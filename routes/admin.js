import {Router} from "express"
import { handleAdminSignup,deleteUser} from "../controller/applications.js";
import { GET } from "../controller/adminusercontrol.js";
const router = Router();
router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.role === 'A') {
        next();
        console.log(req.session.user.role);
    }
    else {
        res.render('err', { err: 'You are not an Admin',user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get("/",(req,res)=>{
    res.render("admin",{ user: (req.session.user === undefined ? "" : req.session.user) })
});     


router.get('/adduser',(req,res)=>{
    res.render('adduser',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/view&edituser',GET,(req,res)=>{
    res.render('viwe&edituser',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.delete('/delete/:id', deleteUser);


router.post('/adduser',handleAdminSignup);
// router.get('/view&edituser',isAdmin,GET);


router.get('/addproduct',(req,res)=>{
    res.render('addproduct',{ user: (req.session.user === undefined ? "" : req.session.user) });
})


export default router;