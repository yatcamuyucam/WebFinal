import { BiSolidLogOut } from "react-icons/bi"; // Çıkış simgesini içe aktarır
import useLogout from "../../hooks/useLogout"; // Oturumu kapatma kancasını içe aktarır

// Çıkış Butonu bileşeni
const LogoutButton = () => {
  
  const { loading, logout } = useLogout(); // Oturumu kapatma kancasını kullanarak oturum kapatma işlevselliğine erişim sağlar
  return (
    <div className="mt-auto"> {/* Diğer bileşenlerden aşağıda olacak şekilde ayarlar */}
        <BiSolidLogOut 
          className="w-6 h-6 text-white cursor-pointer" // Çıkış simgesinin stili
          onClick={logout} // Çıkış işlevselliğini yönetir
        />
    </div>
  );
};

export default LogoutButton; // Çıkış Butonu bileşenini dışa aktarır
