import jwt from 'jsonwebtoken'; // JSON Web Token (JWT) 
import User from '../models/user.model.js'; 

const protectRoute = async (req, res, next) => {
    try {
        //JWT'yi al
        const token = req.cookies.jwt;

        // Eğer token yoksa, yetkisiz hatası 
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        };

        // Token'ı çözümle
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Eğer token geçersizse, yetkisiz hatası 
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        };

        // Token'dan elde edilen kullanıcı kimliği ile kullanıcıyı veritabanından bul
        const user = await User.findById(decoded.userId).select("-password");

        // Eğer kullanıcı bulunamazsa, yetkisiz hatası 
        if (!user) {
            return res.status(401).json({ error: "User not found." });
        };

        // Kullanıcıyı istek nesnesine ekle ve bir sonraki 
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
    };
};

export default protectRoute; 
