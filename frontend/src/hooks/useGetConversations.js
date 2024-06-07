import { useEffect, useState } from "react"; // React'ten useEffect ve useState kancalarını içe aktarır
import toast from "react-hot-toast"; // Bildirimleri göstermek için kütüphane

// Sohbetleri almak için özel kancayı tanımlar
const useGetConversations = () => {
	const [loading, setLoading] = useState(false); // Yükleme durumunu takip eden state'i tanımlar
	const [conversations, setConversations] = useState([]); // Sohbetleri tutan state'i tanımlar

	// Komponent yüklendiğinde çalışacak etkileşimli bir işlev
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true); // Yükleme durumunu başlatır
			try {
				const res = await fetch("/api/users"); // Sohbetleri almak için API'ye istek gönderir
				const data = await res.json(); // Gelen yanıtı JSON formatına dönüştürür
				if (data.error) { // Eğer hata varsa
					throw new Error(data.error); // Hata fırlatır
				}
				setConversations(data); // Sohbetleri günceller
			} catch (error) {
				toast.error(error.message); // Hata durumunda hata bildirimi gösterir
			} finally {
				setLoading(false); // Yükleme durumunu sonlandırır
			}
		};

		getConversations(); // Sohbetleri alma işlemini başlatır
	}, []); // Komponent yüklendiğinde yalnızca bir kez çalışacak şekilde yapılandırılır

	return { loading, conversations }; // Yükleme durumunu ve sohbetleri döndürür
};
export default useGetConversations; // Sohbetleri almak için özel kancayı dışa aktarır
