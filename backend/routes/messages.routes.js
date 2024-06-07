import express from "express"; // Express kütüphanesini projeye dahil eder.
import { getMessages, sendMessage } from "../controllers/messages.controller.js"; // Mesajlarla ilgili controller fonksiyonlarını içe aktarır.
import protectRoute from "../middleware/protectRoute.js"; // Koruma (yetkilendirme) middleware'ini içe aktarır.

const router = express.Router(); // Express Router'ı oluşturur.

// Belirtilen id'ye sahip kullanıcının mesajlarını almak için GET isteği
// protectRoute middleware'i ile koruma sağlar, ardından getMessages fonksiyonunu çağırır
router.get("/:id", protectRoute, getMessages);

// Belirtilen id'ye sahip kullanıcıya mesaj göndermek için POST isteği
// protectRoute middleware'i ile koruma sağlar, ardından sendMessage fonksiyonunu çağırır
router.post("/send/:id", protectRoute, sendMessage);

export default router; // Router'ı dışa aktarır.
