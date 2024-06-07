import express from "express"; // Express frameworkünü içe aktarır
import dotenv from "dotenv"; // .env dosyasını yüklemek için dotenv kütüphanesini içe aktarır
import cookieParser from "cookie-parser"; // Cookie'leri işlemek için cookie-parser kütüphanesini içe aktarır
import authRoutes from "./routes/auth.routes.js"; // Kimlik doğrulama rotalarını içe aktarır
import messagesRoutes from "./routes/messages.routes.js"; // Mesajlar rotalarını içe aktarır
import userRoutes from "./routes/user.routes.js"; // Kullanıcı rotalarını içe aktarır

import connectToMongoDB from "./db/connectToMongoDB.js"; // MongoDB'ye bağlanmak için yardımcı fonksiyonu içe aktarır

const app = express(); // Express uygulamasını oluşturur
const PORT = process.env.PORT || 5000; // Port numarasını ayarlar

dotenv.config(); // .env dosyasını yükler

app.use(express.json()); // Gelen isteklerdeki JSON verilerini işlemek için express.json() ara yazılımını kullanır
app.use(cookieParser()); // Gelen isteklerdeki çerezleri işlemek için cookie-parser ara yazılımını kullanır

app.use ("/api/auth", authRoutes); // Kimlik doğrulama rotalarını /api/auth altında kullanır
app.use ("/api/messages", messagesRoutes); // Mesajlar rotalarını /api/messages altında kullanır
app.use ("/api/users", userRoutes); // Kullanıcı rotalarını /api/users altında kullanır

app.listen(PORT, () => { // Uygulamayı belirtilen portta dinlemeye başlar
    connectToMongoDB(); // MongoDB'ye bağlanır
    console.log(`Server running on port ${PORT} `); // Konsola uygulamanın hangi portta çalıştığını yazdırır
});

