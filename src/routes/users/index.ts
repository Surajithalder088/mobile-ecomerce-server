import express from "express"
import { registeruser,loginuser,userprofile} from "../../controllers/users/index";
import { verifyUser } from "../../middleware/auth.middleware";
const router=express.Router()

router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/profile",verifyUser,userprofile)

export default router;