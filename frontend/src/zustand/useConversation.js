import { create } from "zustand"; // Zustand'dan create fonksiyonunu içe aktarır

// Zustand kullanarak sohbet bilgilerini yöneten özel bir kancayı tanımlar
const useConversation = create((set) => ({
    selectedConversation: null, // Seçili sohbeti tutan state'i tanımlar, başlangıçta null'dır
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }), // Seçili sohbeti ayarlayan işlevi tanımlar
    messages: [], // Mesajları tutan state'i tanımlar, başlangıçta boş bir dizi
    setMessages: (messages) => set({ messages }), // Mesajları ayarlayan işlevi tanımlar
}));

export default useConversation; // Özel sohbet kancasını dışa aktarır
