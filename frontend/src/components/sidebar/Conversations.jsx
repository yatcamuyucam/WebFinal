import Conversation from "./Conversation"; 
import useGetConversations from "../../hooks/useGetConversations"; 
import { getRandomEmoji } from "../../utils/emojis"; 

// Sohbetler bileşeni
const Conversations = () => {
  const { loading, conversations } = useGetConversations(); 

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) =>(
        <Conversation
          key={conversation._id} // Her sohbetin benzersiz bir anahtar
          conversation={conversation} // Sohbet verisini geçir
          emoji={getRandomEmoji()} // Rastgele bir emojiyi 
          lastIdx={idx === conversations.length - 1} // Son sohbeti işaretler
        />
      ))}
      
      {/* Yükleme durumunda yüklenme animasyonu */}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations; 
