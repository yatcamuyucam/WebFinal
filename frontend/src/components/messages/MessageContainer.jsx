import { useEffect } from "react"; // React'ten useEffect kancasını içe aktarır
import Messages from "./Messages"; // Mesajları gösteren bileşeni içe aktarır
import MessageInput from "./MessageInput"; // Mesaj girişi bileşenini içe aktarır
import { TbMessageCirclePlus } from "react-icons/tb"; // İletişim ikonunu içe aktarır
import useConversation from "../../zustand/useConversation"; // Zustand kancasını kullanarak sohbet bilgilerine erişim sağlar
import { useAuthContext } from "../../../context/AuthContext"; // Kimlik bağlamı kancasını kullanarak oturum açmış kullanıcı bilgilerine erişim sağlar

// Mesaj Konteyneri bileşeni
const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation(); // Seçili sohbeti ve seçili sohbeti ayarlamak için kancayı kullanır

    useEffect(() => {
        // Bileşenin ayrılması durumunda sohbetin seçimini kaldırır
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? ( // Eğer seçili bir sohbet yoksa
                <NoChatSelected /> // NoChatSelected bileşenini göster
            ) : (
                <>
                    {/* Başlık */}
                    <div className="bg-orange-500 px-4 py-2 mb-2">
                        <span className="font-semibold label-text text-gray-700">To:  </span>{" "}
                        <span className="text-gray-900 font-bold">
                            {selectedConversation.fullName} {/* Seçilen sohbetin adını gösterir */}
                        </span>
                    </div>

                    <Messages /> {/* Mesajları gösteren bileşeni ekler */}
                    <MessageInput /> {/* Mesaj girişi bileşenini ekler */}
                </>
            )}
        </div>
    );
};

export default MessageContainer; // Mesaj Konteyneri bileşenini dışa aktarır

// Seçili Sohbet Yok bileşeni
const NoChatSelected = () => {
    const { authUser } = useAuthContext(); // Oturum açmış kullanıcı bilgilerine erişir
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 🖖🏽 {authUser.fullName} </p> {/* Kullanıcıya hoş geldin mesajını gösterir */}
                <p>Select a chat to start scriptmessaging!</p> {/* Bir sohbet seçilmediyse ekrana mesaj gösterir */}
                <TbMessageCirclePlus className="text-3xl md:text-6xl text-center" /> {/* İletişim ikonunu gösterir */}
            </div>
        </div>
    );
};

