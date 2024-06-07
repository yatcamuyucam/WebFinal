import { useState } from "react"; // React kütüphanesinden useState kancasını içe aktarır
import useConversation from "../zustand/useConversation"; // useConversation kancasını içe aktarır
import toast from "react-hot-toast"; // Bildirimler için react-hot-toast kütüphanesini içe aktarır

// Mesaj gönderme işlemleri için özel bir kancayı tanımlar
const useSendMessage = () => {
	const [loading, setLoading] = useState(false); // Yükleme durumunu takip eden state'i tanımlar ve başlangıç değeri false'tur
	const { messages, setMessages, selectedConversation } = useConversation(); // useConversation kancasından gerekli öğeleri alır

	// Mesaj gönderme işlemini gerçekleştiren fonksiyon
	const sendMessage = async (message) => {
		setLoading(true); // Yükleme durumunu başlatır
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, { // Seçili sohbetin ID'si ile birlikte mesajı göndermek için API'ye istek gönderir
				method: "POST", // POST isteği kullanır
				headers: {
					"Content-Type": "application/json", // JSON içeriği gönderir
				},
				body: JSON.stringify({ message }), // Mesajı JSON formatına dönüştürüp gönderir
			});
			const data = await res.json(); // Yanıtı JSON formatına dönüştürür
			if (data.error) throw new Error(data.error); // Eğer bir hata varsa hatayı fırlatır

			setMessages([...messages, data]); // Yeni mesajı mevcut mesajlar listesine ekler
		} catch (error) {
			toast.error(error.message); // Hata durumunda bildirim gösterir
		} finally {
			setLoading(false); // Yükleme durumunu sonlandırır
		}
	};

	return { sendMessage, loading }; // Mesaj gönderme işlevini ve yükleme durumunu döndürür
};
export default useSendMessage; // Mesaj gönderme işlemleri için özel kancayı dışa aktarır
