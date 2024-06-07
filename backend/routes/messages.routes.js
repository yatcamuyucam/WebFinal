import express from "express"; 
import { getMessages, sendMessage } from "../controllers/messages.controller.js"; 
import protectRoute from "../middleware/protectRoute.js"; 

const router = express.Router(); 

// Belirtilen id'ye sahip kullanıcının mesajlarını almak için GET isteği
// protectRoute middleware'i ile koruma sağla
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router; 
