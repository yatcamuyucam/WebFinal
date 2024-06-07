import mongoose from "mongoose"; // Mongoose kütüphanesini projeye dahil eder.

// MongoDB'ye bağlanmak için asenkron bir fonksiyon tanımlar.
const connectToMongoDB = async() => {
    try {
        // MongoDB URL'sini kullanarak veritabanına bağlanır.
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB"); // Bağlantı başarılı olduğunda konsola mesaj yazar.

    } catch (error) {
        // Bağlantı sırasında hata olursa konsola hata mesajını yazar.
        console.log("Error connecting to MongoDB", error.message);
    }
}

export default connectToMongoDB; // Fonksiyonu diğer dosyalarda kullanmak üzere dışa aktarır.
