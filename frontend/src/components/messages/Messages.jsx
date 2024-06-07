import Message from "./Message"; // Mesaj bileşenini içe aktarır
import useGetMessages from "../../hooks/useGetMessages"; // Mesajları alma kancasını kullanarak mesajları alır
import MessageSkeleton from "../skeletons/MessageSkeleton"; // Mesaj yükleme animasyonunu içe aktarır
import { useEffect, useRef } from "react"; // React'ten useEffect ve useRef kancalarını içe aktarır

// Mesajlar bileşeni
const Messages = () => {
  const { messages, loading } = useGetMessages(); // Mesajları alır ve yükleme durumunu alır
  const lastMessageRef = useRef(); // Son mesaj referansını saklar

  useEffect(() => {
    // Yükleme tamamlandığında son mesajı görünürlüğe kaydırır
    setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
  }, [messages]); // Mesajlar değiştiğinde bu etkileşim çalışır

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Mesajlar yüklenirken ve mesajlar varken gösterilecekler */}
      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
          <Message message={message} /> {/* Mesaj bileşenini gösterir */}
        </div>
      ))}

      {/* Mesajlar yüklenirken animasyon gösterilir */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* Mesaj yoksa kullanıcıya bir mesaj göndermesi gerektiği hatırlatılır */}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages; // Mesajlar bileşenini dışa aktarır
