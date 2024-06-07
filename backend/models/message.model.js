import mongoose from "mongoose"; 

// Mesaj şeması
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // Gönderenin kullanıcı kimliğini sakla
        ref: "User", 
        required: true, // Bu alanın zorunlu
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true, 
    },
    message: {
        type: String, // Mesaj içeriğini sakla
        required: true, 
    },
    // createdAt ve updatedAt for date mongo
}, { timestamps: true });

// Mesaj modelini tanımlar
const Message = mongoose.model("Message", messageSchema);

export default Message; 
