import mongoose from "mongoose"; // Mongoose kütüphanesini projeye dahil eder.

// Konuşma şemasını tanımlar
const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId, // Katılımcıların kullanıcı kimliklerini saklar
            ref: 'User', // 'User' modeline referans verir
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId, // Mesaj kimliklerini saklar
            ref: 'Message', // 'Message' modeline referans verir
            default: [], // Varsayılan olarak boş bir dizi
        },
    ],
}, { timestamps: true }); // Şemaya oluşturulma ve güncellenme zaman damgalarını ekler

// Konuşma modelini tanımlar
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation; // Konuşma modelini dışa aktarır
