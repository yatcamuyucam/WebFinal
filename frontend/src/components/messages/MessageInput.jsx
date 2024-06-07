import { BsFillSendArrowUpFill } from "react-icons/bs"; // Gönderme ikonunu içe aktarır
import { useState } from "react"; // React'in useState kancasını içe aktarır
import useSendMessage from "../../hooks/useSendMessage"; // Mesaj gönderme kancasını kullanarak mesaj gönderme işlevselliğine erişim sağlar

// Mesaj Girişi bileşeni
const MessageInput = () => {
    const [message, setMessage] = useState(""); // Mesaj durumunu yöneten state'i tanımlar
    const { loading, sendMessage } = useSendMessage(); // Mesaj gönderme kancasını kullanarak mesaj gönderme işlevselliğine erişim sağlar

    const handleSubmit = async (e) => { // Form gönderme işlemini yöneten fonksiyon
        e.preventDefault(); // Formun varsayılan davranışını engeller
        if (!message) return; // Eğer mesaj boşsa gönderme işlemi yapılmaz
        await sendMessage(message); // Mesaj gönderme işlemini gerçekleştirir
        setMessage(""); // Mesaj alanını temizler
    };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}> {/* Form bileşeni oluşturur ve onSubmit olayı handleSubmit fonksiyonunu tetikler */}
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 text-white"
                    placeholder="Send a message" // Placeholder metni
                    value={message} // Mesajın değeri
                    onChange={(e) => setMessage(e.target.value)} // Mesaj değiştiğinde state'i günceller
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

export default MessageInput; // Mesaj Girişi bileşenini dışa aktarır
