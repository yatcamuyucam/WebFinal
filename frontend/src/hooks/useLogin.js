import { useState } from "react"; // React kütüphanesinden useState kancasını içe aktarır
import toast from "react-hot-toast"; // Bildirimler için react-hot-toast kütüphanesini içe aktarır
import { useAuthContext } from "../../context/AuthContext"; // Yetkilendirme bağlamını içe aktarır

// Giriş işlemleri için özel bir kancayı tanımlar
const useLogin = () => {
    const [loading, setLoading] = useState(false); // Yükleme durumunu takip eden state'i tanımlar ve başlangıç değeri false'tur
    const { setAuthUser } = useAuthContext(); // Yetkilendirme bağlamından gerekli fonksiyonu alır

    // Giriş işlemini gerçekleştiren fonksiyon
    const login = async (userName, password) => {
        const success = handleInputErrors(userName, password); // Giriş alanlarını doğrular
        if (!success) return; // Başarısızsa işlemi sonlandırır
        setLoading(true); // Yükleme durumunu başlatır
        try {
            const res = await fetch("/api/auth/login", { // API'ye giriş isteği gönderir
                method: "POST", // POST isteği kullanır
                headers: { "Content-Type": "application/json" }, // JSON içeriği gönderir
                body: JSON.stringify({ userName, password }) // Kullanıcı adı ve şifreyi içeren JSON verisini gönderir
            });
            const data = await res.json(); // Yanıtı JSON formatına dönüştürür
            if (data.error) {
                throw new Error(data.error); // Eğer bir hata varsa hatayı fırlatır
            }
            localStorage.setItem("user-info", JSON.stringify(data)); // Kullanıcı bilgilerini yerel depolamaya kaydeder
            setAuthUser(data); // Yetkilendirme bağlamında kullanıcı bilgilerini günceller
        } catch (error) {
            toast.error(error.message); // Hata durumunda bildirim gösterir
        } finally {
            setLoading(false); // Yükleme durumunu sonlandırır
        }
    };

    return { loading, login }; // Yükleme durumunu ve giriş işlevini döndürür
};

export default useLogin; // Giriş işlemleri için özel kancayı dışa aktarır

// Giriş alanlarının doğruluğunu kontrol eden yardımcı fonksiyon
function handleInputErrors(userName, password) {
    if (!userName || !password) { // Kullanıcı adı veya şifre eksikse
        toast.error("Please fill all fields!"); // Kullanıcıya uyarı bildirimi gösterir
        return false; // Doğrulama başarısız
    }
    return true; // Doğrulama başarılı
}
