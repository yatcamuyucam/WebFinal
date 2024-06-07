import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../zustand/useConversation"; 

const Message = ({ message }) => {
    const { authUser } = useAuthContext(); // Oturum açmış kullanıcının bilgilerini al
    const { selectedConversation } = useConversation(); 
    const fromMe = message.senderId === authUser._id; // Mesajın kullanıcı tarafından mı gönderildiğini kontrol eder
    const chatClassName = fromMe ? "chat-end" : "chat-start"; // Mesajın kullanıcı tarafından mı gönderildiğine göre sohbet balonunun sınıfını belirler
    const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture; 
    const bubbleBgColor = fromMe ? "bg-orange-500" : ""; 
    return (
        <div className={`chat ${chatClassName}`}> {/* conv balonu olustu */}
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt='Tailwind CSS chat bubble component' src={profilePicture} /> 
                </div>
            </div>
            
            <div className={`chat-bubble text-white ${bubbleBgColor} break-words whitespace-pre-line max-w-xs sm:max-w-md md:max-w-lg`}>{message.message}</div> {/* Mesaj içeriğini gösterir */}
            <div className="chat-footer opacity-100 text-xs flex gap-1 items-center">
                {message.createdAt} {/* Mesajın gönderildiği tarih ve saat bilgisi*/}
            </div>
        </div>
    );
};

export default Message; 

