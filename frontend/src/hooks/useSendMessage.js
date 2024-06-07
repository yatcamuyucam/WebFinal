import { useState } from "react"; 
import useConversation from "../zustand/useConversation"; 
import toast from "react-hot-toast"; 

const useSendMessage = () => {
	const [loading, setLoading] = useState(false); 
	const { messages, setMessages, selectedConversation } = useConversation(); 

	const sendMessage = async (message) => {
		setLoading(true); 
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, { // Seçili sohbetin ID'si ile birlikte mesajı göndermek için API'ye istek gönderir
				method: "POST", // POST isteği kullanır
				headers: {
					"Content-Type": "application/json", 
				},
				body: JSON.stringify({ message }), 
			});
			const data = await res.json(); 
			if (data.error) throw new Error(data.error); 

			setMessages([...messages, data]); // Yeni mesajı mevcut mesajlar listesine ekler
		} catch (error) {
			toast.error(error.message); // Hata durumunda bildirim gösterir
		} finally {
			setLoading(false); 
		}
	};

	return { sendMessage, loading }; 
};
export default useSendMessage; 
