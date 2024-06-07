import Message from "./Message"; 
import useGetMessages from "../../hooks/useGetMessages"; 
import MessageSkeleton from "../skeletons/MessageSkeleton"; 
import { useEffect, useRef } from "react"; 

const Messages = () => {
  const { messages, loading } = useGetMessages(); // Mesajları ve yükleme durumunu al
  const lastMessageRef = useRef(); // Son mesaj referansını saklar

  useEffect(() => {
    // Yükleme tamamlandığında son mesajı görünürlüğe kaydırır
    setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
  }, [messages]); // Mesajlar değiştiğinde bu etkileşim çalışır

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
          <Message message={message} /> {/* Mesaj bileşenini göster */}
        </div>
      ))}

      {/* Mesajlar yüklenirken animasyon */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
