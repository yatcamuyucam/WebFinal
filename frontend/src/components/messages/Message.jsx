import { useAuthContext } from "../../../context/AuthContext"; // Kimlik bağlamı kancasını kullanarak oturum açmış kullanıcının bilgilerine erişim sağlar
import useConversation from "../../zustand/useConversation"; // Zustand kancası kullanarak seçili sohbet bilgilerine erişim sağlar

// Mesaj bileşeni
const Message = ({ message }) => {
    const { authUser } = useAuthContext(); // Oturum açmış kullanıcının bilgilerini alır
    const { selectedConversation } = useConversation(); // Seçili sohbetin bilgilerini alır
    const fromMe = message.senderId === authUser._id; // Mesajın kullanıcı tarafından mı gönderildiğini kontrol eder
    const chatClassName = fromMe ? "chat-end" : "chat-start"; // Mesajın kullanıcı tarafından mı gönderildiğine göre sohbet balonunun sınıfını belirler
    const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture; // Mesajın göndericiye ait olduğu durumda kullanıcının profil resmini, aksi takdirde seçilen sohbetin profil resmini alır
    const bubbleBgColor = fromMe ? "bg-orange-500" : ""; // Mesajın göndericiye ait olduğu durumda balonun arka plan rengini belirler
    return (
        <div className={`chat ${chatClassName}`}> {/* Sohbet balonunu oluşturur */}
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt='Tailwind CSS chat bubble component' src={profilePicture} /> {/* Profil resmini gösterir */}
                </div>
            </div>
            
            <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div> {/* Mesaj içeriğini gösterir */}
            <div className="chat-footer opacity-100 text-xs flex gap-1 items-center">
                {message.createdAt} {/* Mesajın gönderildiği tarih ve saat bilgisini gösterir */}
            </div>
        </div>
    );
};

export default Message; // Mesaj bileşenini dışa aktarır
