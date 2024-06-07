import { useEffect } from "react";
import Messages from "./Messages"; 
import MessageInput from "./MessageInput"; 
import { TbMessageCirclePlus } from "react-icons/tb"; 
import useConversation from "../../zustand/useConversation"; 
import { useAuthContext } from "../../../context/AuthContext"; 

// Mesaj Konteyneri bileşeni
const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation(); // Seçili sohbeti ve seçili sohbeti ayarla

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? ( // Eğer seçili sohbet yoksa
                <NoChatSelected /> 
            ) : (
                <>
                    
                    <div className="bg-orange-500 px-4 py-2 mb-2">
                        <span className="font-semibold label-text text-gray-700">To:  </span>{" "}
                        <span className="text-gray-900 font-bold">
                            {selectedConversation.fullName} 
                        </span>
                    </div>

                    <Messages /> 
                    <MessageInput /> 
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext(); // Oturum açmış kullanıcı
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 🖖🏽 {authUser.fullName} </p> 
                <p>Select a chat to start scriptmessaging!</p> 
                <TbMessageCirclePlus className="text-3xl md:text-6xl text-center" /> 
            </div>
        </div>
    );
};

