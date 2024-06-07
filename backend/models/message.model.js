import mongoose from "mongoose"; // Mongoose kütüphanesini projeye dahil eder.

// Mesaj şemasını tanımlar
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // Gönderenin kullanıcı kimliğini saklar
        ref: "User", // 'User' modeline referans verir
        required: true, // Bu alanın zorunlu olduğunu belirtir
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, // Alıcının kullanıcı kimliğini saklar
        ref: "User", // 'User' modeline referans verir
        required: true, // Bu alanın zorunlu olduğunu belirtir
    },
    message: {
        type: String, // Mesaj içeriğini saklar
        required: true, // Bu alanın zorunlu olduğunu belirtir
    },
    // createdAt ve updatedAt alanları için zaman damgalarını otomatik olarak ekler
}, { timestamps: true });

// Mesaj modelini tanımlar
const Message = mongoose.model("Message", messageSchema);

export default Message; // Mesaj modelini dışa aktarır
