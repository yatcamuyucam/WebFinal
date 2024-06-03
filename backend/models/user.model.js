import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlegnth: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePicture: {
        type: String,
        default: "",
    },
    //createdAt, updatedAt
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

export default User;