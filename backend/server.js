import express from "express"; 
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser"; 
import authRoutes from "./routes/auth.routes.js"; 
import messagesRoutes from "./routes/messages.routes.js"; 
import userRoutes from "./routes/user.routes.js"; 

import connectToMongoDB from "./db/connectToMongoDB.js"; 

const app = express(); 
const PORT = process.env.PORT || 5000; 

dotenv.config(); // .env dosyası

app.use(express.json()); 
app.use(cookieParser()); 

app.use ("/api/auth", authRoutes); // Kimlik doğrulama rotalarını /api/auth altında kullanır
app.use ("/api/messages", messagesRoutes); 
app.use ("/api/users", userRoutes); 

app.listen(PORT, () => {
    connectToMongoDB(); // MongoDB'ye bağla
    console.log(`Server running on port ${PORT} `); 
});

