import jwt from 'jsonwebtoken'; // JSON Web Token (JWT) kütüphanesini içe aktarır.
import User from '../models/user.model.js'; // Kullanıcı modelini içe aktarır.

const protectRoute = async (req, res, next) => {
    try {
        // İstekten JWT'yi alır (genellikle çerezlerde saklanır).
        const token = req.cookies.jwt;

        // Eğer token yoksa, yetkisiz hatası döner.
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        };

        // Token'ı çözümleyerek kullanıcı bilgilerini elde eder.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Eğer token geçersizse, yetkisiz hatası döner.
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        };

        // Token'dan elde edilen kullanıcı kimliği ile kullanıcıyı veritabanından bulur (şifre hariç).
        const user = await User.findById(decoded.userId).select("-password");

        // Eğer kullanıcı bulunamazsa, yetkisiz hatası döner.
        if (!user) {
            return res.status(401).json({ error: "User not found." });
        };

        // Kullanıcıyı istek nesnesine ekler ve bir sonraki middleware'e geçer.
        req.user = user;
        next();

    } catch (error) {
        // Hata durumunda konsola hata mesajı yazar ve sunucu hatası döner.
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
    };
};

export default protectRoute; // Middleware fonksiyonunu dışa aktarır.
