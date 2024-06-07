import { BiSolidLogOut } from "react-icons/bi"; // Çıkış simgesi
import useLogout from "../../hooks/useLogout"; 

// Çıkış Butonu bileşeni
const LogoutButton = () => {
  
  const { loading, logout } = useLogout(); 
  return (
    <div className="mt-auto"> {/*asagida*/}
        <BiSolidLogOut 
          className="w-6 h-6 text-white cursor-pointer" // Çıkış simgesinin stili
          onClick={logout} // Çıkış işlevselliğini yönetir
        />
    </div>
  );
};

export default LogoutButton; 
