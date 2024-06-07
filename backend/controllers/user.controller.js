// Kullanıcı modelini içe aktarır.
import User from "../models/user.model.js";

// Kenar çubuğu için kullanıcıları getiren fonksiyon
export const getUsersForSideBar = async (req, res) => {
    try {
        // Oturum açmış kullanıcının kimliğini alır.
        const loggedInUserId = req.user._id;

        // Oturum açmış kullanıcı haricindeki tüm kullanıcıları getirir ve parolalarını hariç tutar.
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        // Başarı durumunda filtrelenmiş kullanıcıları döndürür.
        res.status(200).json(filteredUsers);

    } catch (error) {
        // Hata durumunda konsola hata mesajını yazar ve istemciye iç sunucu hatası döndürür.
        console.error("Error in getUsersForSideBar: ", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERRROR!" });
    };
};
