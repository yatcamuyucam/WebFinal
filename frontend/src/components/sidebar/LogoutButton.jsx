import { BiSolidLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  
  const {loading,logout}= useLogout();
  return (
    <div className="mt-auto">
        <BiSolidLogOut className="w-6 h-6 text-white cursor-pointer"
        onClick={logout}
        />
    </div>
  );
};

export default LogoutButton;


/* 
import { BiSolidLogOut } from "react-icons/bi";
const LogoutButton = () => {
  return (
    <div className="mt-auto">
        <BiSolidLogOut className="w-6 h-6 text-white cursor-pointer"/>
    </div>
  );
};

export default LogoutButton; */