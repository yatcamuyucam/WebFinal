import mongoose from "mongoose"; // Mongoose'yi içe aktarır

// Kullanıcı şemasını tanımlar
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true // Tam adın zorunlu olduğunu belirtir
    },
    userName: {
        type: String,
        required: true, // Kullanıcı adının zorunlu olduğunu belirtir
        unique: true // Kullanıcı adının benzersiz olması gerektiğini belirtir
    },
    password: {
        type: String,
        required: true, // Şifrenin zorunlu olduğunu belirtir
        minlength: 6 // Şifrenin en az 6 karakter uzunluğunda olması gerektiğini belirtir
    },
    gender: {
        type: String,
        required: true, // Cinsiyetin zorunlu olduğunu belirtir
        enum: ["male", "female"] // Cinsiyetin sadece "male" veya "female" olabileceğini belirtir
    },
    profilePicture: {
        type: String,
        default: "", // Profil resminin varsayılan olarak boş olduğunu belirtir
    },
    //createdAt, updatedAt
}, { timestamps: true }); // Oluşturulma ve güncellenme zamanlarını otomatik olarak izler

const User = mongoose.model("user", userSchema); // Kullanıcı modelini oluşturur

export default User; // Kullanıcı modelini dışa aktarır
