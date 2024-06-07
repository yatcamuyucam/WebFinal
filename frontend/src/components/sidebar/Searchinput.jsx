import { useState } from "react"; // React'ten useState kancasını içe aktarır
import { RiUserSearchLine } from "react-icons/ri"; // Kullanıcı arama simgesini içe aktarır
import useConversation from "../../zustand/useConversation"; // Zustand kancasını kullanarak sohbet bilgilerine erişim sağlar
import useGetConversations from "../../hooks/useGetConversations"; // Sohbetleri alma kancasını kullanarak sohbetleri alır
import toast from "react-hot-toast"; // Bildirimleri göstermek için kütüphane

// Arama Girişi bileşeni
const SearchInput = () => {
	const [search, setSearch] = useState(""); // Arama terimini yöneten state'i tanımlar
	const { setSelectedConversation } = useConversation(); // Seçili sohbeti ayarlamak için kancayı kullanır
	const { conversations } = useGetConversations(); // Sohbetleri alır

	// Form gönderme işlevini yöneten fonksiyon
	const handleSubmit = (e) => {
		e.preventDefault(); // Formun varsayılan davranışını engeller
		if (!search) return; // Eğer arama terimi boşsa işlem yapmaz
		if (search.length < 3) { // Arama teriminin en az 3 karakter olması gerektiğini kontrol eder
			return toast.error("Search term must be at least 3 characters long"); // Hata bildirimi gösterir
		}

		// Sohbetler arasında arama terimini içeren bir sohbet bulmaya çalışır
		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) { // Eğer sohbet bulunursa
			setSelectedConversation(conversation); // Seçili sohbeti ayarlar
			setSearch(""); // Arama terimini sıfırlar
		} else {
			toast.error("No such user found!"); // Kullanıcı bulunamazsa hata bildirimi gösterir
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'> {/* Form bileşeni oluşturur ve onSubmit olayı handleSubmit fonksiyonunu tetikler */}
			<input
				type='text'
				placeholder='Search…' // Arama kutusuna yer tutucu metin
				className='input input-bordered rounded-full' // Arama kutusunun stili
				value={search} // Arama terimini görüntüler
				onChange={(e) => setSearch(e.target.value)} // Arama terimini günceller
			/>
			<button type='submit' className='btn btn-circle bg-orange-500 text-white'> {/* Arama düğmesi */}
				<RiUserSearchLine className='w-6 h-6 outline-none' /> {/* Kullanıcı arama simgesi */}
			</button>
		</form>
	);
};

export default SearchInput; // Arama Girişi bileşenini dışa aktarır
