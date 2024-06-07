import { useState } from "react"; 
import toast from "react-hot-toast"; 
import { useAuthContext } from "../../context/AuthContext"; 
const useLogin = () => {
    const [loading, setLoading] = useState(false); 
    const { setAuthUser } = useAuthContext(); 

    const login = async (userName, password) => {
        const success = handleInputErrors(userName, password); 
        if (!success) return; 
        setLoading(true); 
        try {
            const res = await fetch("/api/auth/login", { // API'ye giriş isteği gönderir
                method: "POST", // POST isteği kullanır
                headers: { "Content-Type": "application/json" }, // JSON içeriği gönderir
                body: JSON.stringify({ userName, password }) // Kullanıcı adı ve şifreyi içeren JSON verisini gönderir
            });
            const data = await res.json(); 
            if (data.error) {
                throw new Error(data.error); 
            }
            localStorage.setItem("user-info", JSON.stringify(data)); // Kullanıcı bilgilerini yerel depolamaya kaydedt
            setAuthUser(data); // Yetkilendirme bağlamında kullanıcı bilgilerini günceller
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false); 
        }
    };

    return { loading, login }; 
};

export default useLogin; 

// Giriş alanlarının doğruluğu
function handleInputErrors(userName, password) {
    if (!userName || !password) { // Kullanıcı adı veya şifre eksikse
        toast.error("Please fill all fields!"); // Kullanıcıya uyarı bildirimi gösterir
        return false;
    }
    return true; 
}
