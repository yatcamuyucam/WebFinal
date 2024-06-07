import { useState } from "react"; // React kütüphanesinden useState kancasını içe aktarır
import toast from "react-hot-toast"; // Bildirimler için react-hot-toast kütüphanesini içe aktarır
import { useAuthContext } from "../../context/AuthContext"; // Yetkilendirme bağlamını içe aktarır

// Kullanıcı kaydı işlemleri için özel bir kancayı tanımlar
const useSignup = () => {
    const [loading, setLoading] = useState(false); // Yükleme durumunu takip eden state'i tanımlar ve başlangıç değeri false'tur

    const { setAuthUser } = useAuthContext(); // Yetkilendirme bağlamından gerekli fonksiyonu alır

    // Kullanıcı kaydı işlemini gerçekleştiren fonksiyon
    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender }); // Giriş alanlarının geçerliliğini kontrol eder
        if (!success) return; // Eğer giriş geçerli değilse işlemi sonlandırır
        setLoading(true); // Yükleme durumunu başlatır

        try {
            const res = await fetch("/api/auth/signup", { // API'ye kayıt isteği gönderir
                method: "POST", // POST isteği kullanır
                headers: { "Content-Type": "application/json" }, // JSON içeriği gönderir
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }) // Kullanıcı bilgilerini JSON formatına dönüştürür ve gönderir
            });
            const data = await res.json(); // Yanıtı JSON formatına dönüştürür
            if (data.error) {
                throw new Error(data.error); // Eğer bir hata varsa hatayı fırlatır
            }

            localStorage.setItem("user-info", JSON.stringify(data)); // Kullanıcı bilgilerini yerel depolamaya kaydeder
            setAuthUser(data); // Yetkilendirme bağlamında kullanıcı bilgilerini ayarlar

        } catch (error) {
            toast.error(error.message); // Hata durumunda bildirim gösterir
        } finally {
            setLoading(false); // Yükleme durumunu sonlandırır
        }
    };

    return { loading, signup }; // Yükleme durumunu ve kayıt işlevini döndürür
};

export default useSignup; // Kullanıcı kaydı işlemleri için özel kancayı dışa aktarır

// Giriş alanlarının geçerliliğini kontrol eden yardımcı işlev
function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill all fields!"); // Eksik alan varsa hata bildirimi gösterir
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match!"); // Parolalar eşleşmiyorsa hata bildirimi gösterir
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters!"); // Parolanın uzunluğu yeterli değilse hata bildirimi gösterir
        return false;
    }

    return true; // Tüm giriş alanları geçerli ise true döndürür
}
