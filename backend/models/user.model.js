import mongoose from "mongoose";

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true // Tam adın zorunlu 
    },
    userName: {
        type: String,
        required: true, 
        unique: true // Kullanıcı adının benzersiz olmalı
    },
    password: {
        type: String,
        required: true, 
        minlength: 6 
    },
    gender: {
        type: String,
        required: true, 
        enum: ["male", "female"] 
    },
    profilePicture: {
        type: String,
        default: "", // Profil resminin varsayılan olarak boş 
    },
    //createdAt, updatedAt
}, { timestamps: true }); 

const User = mongoose.model("user", userSchema); 

export default User; 
