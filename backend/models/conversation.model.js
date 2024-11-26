import mongoose from "mongoose"; 
// Konuşma şemasın
const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId, // Katılımcıların kullanıcı kimliklerini saklar
            ref: 'User', // 'User' modeli
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId, // Mesaj kimliklerini saklar
            ref: 'Message', // 'Message' modeline referans 
            default: [], // Varsayılan olarak bos array declare
        },
    ],
}, { timestamps: true }); //zaman damgalarını ekler mongoDb

// Konuşma modelini tanımla
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation; 
