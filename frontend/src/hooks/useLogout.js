import { useState } from "react"; // React kütüphanesinden useState kancasını içe aktarır
import toast from "react-hot-toast"; // Bildirimler için react-hot-toast kütüphanesini içe aktarır
import { useAuthContext } from "../../context/AuthContext"; // Yetkilendirme bağlamını içe aktarır

// Çıkış işlemleri için özel bir kancayı tanımlar
const useLogout = () => {
    const [loading, setLoading] = useState(false); // Yükleme durumunu takip eden state'i tanımlar ve başlangıç değeri false'tur
    const { setAuthUser } = useAuthContext(); // Yetkilendirme bağlamından gerekli fonksiyonu alır

    // Çıkış işlemini gerçekleştiren fonksiyon
    const logout = async () => {
        setLoading(true); // Yükleme durumunu başlatır
        try {
            const res = await fetch("/api/auth/logout", { // API'ye çıkış isteği gönderir
                method: "POST", // POST isteği kullanır
                headers: { "Content-Type": "application/json" }, // JSON içeriği gönderir
            });
            const data = await res.json(); // Yanıtı JSON formatına dönüştürür
            if (data.error) {
                throw new Error(data.error); // Eğer bir hata varsa hatayı fırlatır
            }
            localStorage.setItem("user-info", JSON.stringify(data)); // Kullanıcı bilgilerini yerel depolamaya kaydeder
            setAuthUser(null); // Yetkilendirme bağlamında kullanıcı bilgilerini temizler
        } catch (error) {
            toast.error(error.message); // Hata durumunda bildirim gösterir
        } finally {
            setLoading(false); // Yükleme durumunu sonlandırır
        }
    };

    return { loading, logout }; // Yükleme durumunu ve çıkış işlevini döndürür
};

export default useLogout; // Çıkış işlemleri için özel kancayı dışa aktarır
