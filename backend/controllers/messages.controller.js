import Conversation from "../models/conversation.model.js"; 
import Message from "../models/message.model.js"; 

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // İstekten mesajı al
        const { id: receiverId } = req.params; // Alıcı kimliğini al
        const senderId = req.user._id; // Gönderen kimliğini al

        // sender and receiver arasında sohbet bul
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Eğer sohbet bulunamazsa yeni bir sohbet oluştu
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

        res.status(201).json(newMessage); 

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message); 
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" }); 
    };
};

// Mesajları almak için işlev
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // Sohbet edilecek kullanıcının kimliğini alır
        const senderId = req.user._id; // Gönderen kimliği

        // İlgili katılımcılarla bir sohbet bulur ve mesajları içe aktarır
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // Referansı değil, gerçek mesajları alır

        // Eğer sohbet bulunamazsa boş bir yanıt döndür
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages; // Mesajları alır

        res.status(200).json(conversation.messages); 

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message); 
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" }); 
    };
};
