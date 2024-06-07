import User from "../models/user.model.js";

// Kenar çubuğu için kullanıcılar
export const getUsersForSideBar = async (req, res) => {
    try {
        // Oturum açmış kullanıcının kimliğini al
        const loggedInUserId = req.user._id;

        // Oturum açmış kullanıcı haricindeki tüm kullanıcıları getir
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        // Başarı durumunda filtrelenmiş kullanıcıları döndür
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSideBar: ", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERRROR!" });
    };
};
