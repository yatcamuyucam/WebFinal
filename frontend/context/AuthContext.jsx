import { createContext, useState, useContext } from "react";

// Kimlik doğrulama durumunu paylaşmak için bir context oluşturur
export const AuthContext = createContext();

// AuthContext'i kullanarak kimlik doğrulama durumuna erişmek için bir özelleştirilmiş hook
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// Kimlik doğrulama durumunu yönetmek için bir bileşen sağlar
export const AuthContextProvider = ({ children }) => {
    // Kimlik doğrulama durumu için state'i tanımlar
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user-info")) || null);
    return (
        // AuthContext.Provider bileşenini oluşturur ve içindeki bileşenlere kimlik doğrulama durumunu sağlar
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
