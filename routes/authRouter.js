import {Router} from 'express';
import {login,logout,register} from "../controllers/authController.js";
import {validateRegisterInput,validateLoginInput} from "../middleware/validationMiddleware.js";
const router = Router();
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {message:"IP rate limit exceeded, retry in 10 minutes."}
})

router.post("/register",apiLimiter,validateRegisterInput,register);
router.post("/login",apiLimiter,validateLoginInput,login);
router.get("/logout",logout);

export default router;