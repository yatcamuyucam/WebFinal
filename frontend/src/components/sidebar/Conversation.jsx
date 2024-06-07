import useConversation from "../../zustand/useConversation"; // Zustand kancasını kullanarak sohbet bilgilerine erişim sağlar

// Sohbet bileşeni
const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation(); // Seçili sohbeti ve seçili sohbeti ayarlamak için kancayı kullanır

    const isSelected = selectedConversation?._id === conversation._id; // Seçilen sohbetin aktif olup olmadığını kontrol eder

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-orange-500 rounded p-2 py-1 cursor-pointer ${
                    isSelected ? "bg-orange-500" : "" // Seçilen sohbet arka planını değiştirir
                }`}
                onClick={() => setSelectedConversation(conversation)} // Sohbeti seçmek için tıklanma işlemini yönetir
            >
                <div className="avatar online">
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePicture} alt='user avatar' /> {/* Kullanıcı avatarını gösterir */}
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p> {/* Kullanıcı adını gösterir */}
                        <span className='text-xl'>{emoji}</span> {/* Emojiyi gösterir */}
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />} {/* Son sohbet olmadığında ayırıcıyı gösterir */}
        </>
    );
};

export default Conversation; // Sohbet bileşenini dışa aktarır
