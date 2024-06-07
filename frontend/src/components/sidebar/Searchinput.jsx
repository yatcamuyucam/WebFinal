import { useState } from "react"; 
import { RiUserSearchLine } from "react-icons/ri"; 
import useConversation from "../../zustand/useConversation"; 
import useGetConversations from "../../hooks/useGetConversations"; 
import toast from "react-hot-toast"; 

const SearchInput = () => {
	const [search, setSearch] = useState(""); 
	const { setSelectedConversation } = useConversation(); 
	const { conversations } = useGetConversations(); 

	// Form gönderme işlevi
	const handleSubmit = (e) => {
		e.preventDefault(); // Formun varsayılan davranışını engelle
		if (!search) return; 
		if (search.length < 3) { 
			return toast.error("Search term must be at least 3 characters long"); // Hata bildirimi göster
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) { // Eğer sohbet bulunursa
			setSelectedConversation(conversation); // Seçili sohbeti ayarla
			setSearch(""); 
		} else {
			toast.error("No such user found!"); // Kullanıcı bulunamazsa hata
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'> 
			<input
				type='text'
				placeholder='Search…' 
				className='input input-bordered rounded-full' 
				value={search} // Arama terimini görüntüler
				onChange={(e) => setSearch(e.target.value)} 
			/>
			<button type='submit' className='btn btn-circle bg-orange-500 text-white'> 
				<RiUserSearchLine className='w-6 h-6 outline-none' /> {/* Kullanıcı arama simgesi */}
			</button>
		</form>
	);
};

export default SearchInput; // Arama Girişi bileşenini dışa aktarır
