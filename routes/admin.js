import {Router} from "express"
const router = Router();

router.get("/",(req,res)=>{
    res.render("admin")
});     
router.get('/adduser',(req,res)=>{
    res.render('adduser');
    
})
router.get('/addproduct',(req,res)=>{
    res.render('addproduct');
    
})




export default router;