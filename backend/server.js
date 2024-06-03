import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming req with JSON payloads (from req.)
app.use(cookieParser());

app.use ("/api/auth", authRoutes);
app.use ("/api/messages", messagesRoutes);
app.use ("/api/users", userRoutes);



/*

app.get("/", (req,res) => {
    //root route http://localhost:5000
    res.send("HELLO WOD");
});

*/


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT} `);
});

