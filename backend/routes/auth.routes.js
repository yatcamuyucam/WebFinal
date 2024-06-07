import express from "express"; 
import { signup, login, logout } from "../controllers/auth.controller.js"; 

const router = express.Router(); // Express Router'ı oluşturur.

// istekler doğru fonk yönlendir
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router; 
