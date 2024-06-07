import { useEffect, useState } from "react"; 
import toast from "react-hot-toast"; 

const useGetConversations = () => {
	const [loading, setLoading] = useState(false); // Yükleme durumunu takip eden state
	const [conversations, setConversations] = useState([]); // Sohbetleri tutan state

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true); // Yükleme durumunu başlat
			try {
				const res = await fetch("/api/users"); // Sohbetleri almak için API'ye istek gönderir
				const data = await res.json(); // Gelen yanıtı JSON formatr
				if (data.error) { // Eğer hata varsa
					throw new Error(data.error); 
				}
				setConversations(data); // Sohbetleri güncelle
			} catch (error) {
				toast.error(error.message); 
			} finally {
				setLoading(false); 
			}
		};

		getConversations(); // Sohbetleri alma işlemini başlat
	}, []); 

	return { loading, conversations }; 
};
export default useGetConversations; 
