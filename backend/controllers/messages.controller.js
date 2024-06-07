import Conversation from "../models/conversation.model.js"; // Sohbet modelini içe aktarır
import Message from "../models/message.model.js"; // Mesaj modelini içe aktarır

// Mesaj gönderme işlevi
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // İstekten mesajı alır
        const { id: receiverId } = req.params; // Alıcı kimliğini alır
        const senderId = req.user._id; // Gönderen kimliğini alır

        // İlgili katılımcılarla bir sohbet bulmaya çalışır
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Eğer sohbet bulunamazsa yeni bir sohbet oluşturur
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        };

        // Yeni bir mesaj oluşturur
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Yeni mesaj oluşturulduysa, sohbete ekler
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        };

        // Sohbeti ve mesajı veritabanına kaydeder
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage); // Başarılı yanıtla yeni mesajı döndürür

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message); // Hata durumunda konsola hata mesajını yazdırır
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" }); // Dahili sunucu hatası yanıtıyla hata döndürür
    };
};

// Mesajları almak için işlev
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // Sohbet edilecek kullanıcının kimliğini alır
        const senderId = req.user._id; // Gönderen kimliğini alır

        // İlgili katılımcılarla bir sohbet bulur ve mesajları içe aktarır
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // Referansı değil, gerçek mesajları alır

        // Eğer sohbet bulunamazsa boş bir yanıt döndürür
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages; // Mesajları alır

        res.status(200).json(conversation.messages); // Başarılı yanıtla mesajları döndürür

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message); // Hata durumunda konsola hata mesajını yazdırır
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" }); // Dahili sunucu hatası yanıtıyla hata döndürür
    };
};
