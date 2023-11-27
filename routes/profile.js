import {Router} from "express"
import {editUserrr} from "../controller/applications.js";

const router = Router();

router.get('/', async(req, res)=> {
    res.render('profile',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/edituser", editUserrr);

 export default router;