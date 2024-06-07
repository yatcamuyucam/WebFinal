import { useEffect, useState } from "react"; // React kütüphanesinden useEffect ve useState kancalarını içe aktarır
import useConversation from "../zustand/useConversation"; // useConversation kancasını içe aktarır
import toast from "react-hot-toast"; // Bildirimler için react-hot-toast kütüphanesini içe aktarır

// Mesajları almak için özel bir kancayı tanımlar
const useGetMessages = () => {
	const [loading, setLoading] = useState(false); // Yükleme durumunu tutacak state'i tanımlar ve başlangıç değeri false'tur
	const { messages, setMessages, selectedConversation } = useConversation(); // useConversation kancasından gerekli öğeleri alır

	// Komponent yüklendiğinde ve seçili sohbet değiştiğinde çalışacak olan etkileşimli işlev
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true); // Yükleme durumunu başlatır
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`); // Seçili sohbetin mesajlarını almak için API'ye istek gönderir
				const data = await res.json(); // Gelen yanıtı JSON formatına dönüştürür
				if (data.error) throw new Error(data.error); // Eğer bir hata varsa hatayı fırlatır
				setMessages(data); // Mesajları günceller
			} catch (error) {
				toast.error(error.message); // Hata durumunda bildirim gösterir
			} finally {
				setLoading(false); // Yükleme durumunu sonlandırır
			}
		};

		if (selectedConversation?._id) getMessages(); // Eğer bir sohbet seçiliyse mesajları alma işlemini başlatır
	}, [selectedConversation?._id, setMessages]); // Seçili sohbet veya mesajlar değiştiğinde yeniden çalışacak

	return { messages, loading }; // Mesajları ve yükleme durumunu döndürür
};

export default useGetMessages; // Mesajları almak için özel kancayı dışa aktarır
