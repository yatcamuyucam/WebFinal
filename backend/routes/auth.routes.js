import express from "express"; // Express kütüphanesini projeye dahil eder.
import { signup, login, logout } from "../controllers/auth.controller.js"; // Auth ile ilgili controller fonksiyonlarını içe aktarır.

const router = express.Router(); // Express Router'ı oluşturur.

// Kayıt olma isteğini signup fonksiyonuna yönlendirir.
router.post("/signup", signup);
// Giriş yapma isteğini login fonksiyonuna yönlendirir.
router.post("/login", login);
// Çıkış yapma isteğini logout fonksiyonuna yönlendirir.
router.post("/logout", logout);

export default router; // Router'ı dışa aktarır.
