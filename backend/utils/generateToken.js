import jwt from "jsonwebtoken";

// Kullanıcı kimliğini alarak JWT oluşturur ve tarayıcıya bir çerez yerleştirir
const generateTokenAndSetCookie = (userId, res) => { 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',  // JWT'nin geçerlilik süresi
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS cinsinden maksimum çerez ömrü (15 gün)
        httpOnly: true, // XSS saldırılarını önlemek için
        sameSite: "strict", // CSRF saldırılarını önlemek için
        secure: process.env.NODE_ENV !== "development", // Sadece HTTPS üzerinden çerez iletilir (geliştirme ortamı hariç)
    });
};

export default generateTokenAndSetCookie;
