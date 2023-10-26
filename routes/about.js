import {Router} from "express"
const router = Router();

router.get('/', async(req, res)=> {
    res.render('about',{ user: (req.session.user === undefined ? "" : req.session.user) });
});


 export default router;