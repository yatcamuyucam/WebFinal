import { BsFillSendArrowUpFill } from "react-icons/bs"; 
import { useState } from "react"; 
import useSendMessage from "../../hooks/useSendMessage"; 

const MessageInput = () => {
    const [message, setMessage] = useState(""); // Mesaj durumunu yöneten state
    const { loading, sendMessage } = useSendMessage(); 
    const handleSubmit = async (e) => { // submit gönderme işlemi
        e.preventDefault(); 
        if (!message) return; 
        await sendMessage(message); 
        setMessage("");
    };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}> 
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 text-white"
                    placeholder="Send a message" // Placeholder metni
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3"> {/* Gönderme düğmesi */}
                    {loading ? (
                        <div className="loading loading-spinner"></div> // Yüklenme durumunda gösterilen animasyon
                    ) : (
                        <BsFillSendArrowUpFill /> // Gönderme ikonu
                    )}
                </button>
            </div>
        </form>
    );
};

export default MessageInput; 