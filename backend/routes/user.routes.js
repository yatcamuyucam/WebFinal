import express from "express"; // Express kütüphanesini projeye dahil eder.
import protectRoute from "../middleware/protectRoute.js"; // Koruma (yetkilendirme) middleware'ini içe aktarır.
import { getUsersForSideBar } from "../controllers/user.controller.js"; // Kullanıcılarla ilgili controller fonksiyonunu içe aktarır.

const router = express.Router(); // Express Router'ı oluşturur.

// Yan menü için kullanıcıları almak amacıyla GET isteği
// protectRoute middleware'i ile koruma sağlar, ardından getUsersForSideBar fonksiyonunu çağırır
router.get("/", protectRoute, getUsersForSideBar);

export default router; // Router'ı dışa aktarır.
