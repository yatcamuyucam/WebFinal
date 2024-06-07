import Conversation from "./Conversation"; // Sohbet bileşenini içe aktarır
import useGetConversations from "../../hooks/useGetConversations"; // Sohbetleri alma kancasını kullanarak sohbetleri alır
import { getRandomEmoji } from "../../utils/emojis"; // Rastgele bir emoji almak için yardımcı fonksiyonu içe aktarır

// Sohbetler bileşeni
const Conversations = () => {
  const { loading, conversations } = useGetConversations(); // Sohbetleri alır ve yükleme durumunu alır

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* Sohbetleri ekranda gösterir */}
      {conversations.map((conversation, idx) =>(
        <Conversation
          key={conversation._id} // Her sohbetin benzersiz bir anahtarı olması için kullanılır
          conversation={conversation} // Sohbet verisini iletilen bileşene geçirir
          emoji={getRandomEmoji()} // Rastgele bir emojiyi iletilen bileşene geçirir
          lastIdx={idx === conversations.length - 1} // Son sohbeti işaretler
        />
      ))}
      
      {/* Yükleme durumunda yüklenme animasyonunu gösterir */}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations; // Sohbetler bileşenini dışa aktarır
