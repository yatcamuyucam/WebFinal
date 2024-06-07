import { useState } from "react"; 
import toast from "react-hot-toast"; 
import { useAuthContext } from "../../context/AuthContext"; 

const useSignup = () => {
    const [loading, setLoading] = useState(false); // Yükleme durumunu takip eden state

    const { setAuthUser } = useAuthContext(); // Yetkilendirme bağlamında gerekli fonksiyonu al

    // Kullanıcı kaydı işlemini gerçekleştiren fonks
    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender }); 
        if (!success) return; 
        setLoading(true); 

        try {
            const res = await fetch("/api/auth/signup", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
            });
            const data = await res.json(); 
            if (data.error) {
                throw new Error(data.error); 
            }

            localStorage.setItem("user-info", JSON.stringify(data)); 
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message); 
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup }; 
};

export default useSignup; 

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill all fields!"); // Eksik alan varsa hata bildirimi göster
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match!"); // Parolalar eşleşmiyorsa hata bildirimi göster
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters!"); // Parolanın uzunluğu yeterli değilse hata bildirimi gösterir
        return false;
    }

    return true; // Tüm giriş alanları geçerli ise true döndürür
}
