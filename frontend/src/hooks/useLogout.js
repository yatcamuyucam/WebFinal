import { useState } from "react"; 
import toast from "react-hot-toast"; 
import { useAuthContext } from "../../context/AuthContext"; 

const useLogout = () => {
    const [loading, setLoading] = useState(false); 
    const { setAuthUser } = useAuthContext(); 
    const logout = async () => {
        setLoading(true); 
        try {
            const res = await fetch("/api/auth/logout", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
            });
            const data = await res.json(); 
            if (data.error) {
                throw new Error(data.error); 
            }
            localStorage.setItem("user-info", JSON.stringify(data)); // Kullanıcı bilgilerini yerel depolamaya kaydet
            setAuthUser(null); // Yetkilendirme bağlamında kullanıcı bilgilerini temizler
        } catch (error) {
            toast.error(error.message); // Hata durumunda bildirim gösterme
        } finally {
            setLoading(false); 
        }
    };

    return { loading, logout }; 
};

export default useLogout; 
