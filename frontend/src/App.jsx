import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function App() {
  // Kimlik doğrulama durumunu AuthContext'ten al
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* Sayfa yönlendirmeleri için Routes bileşeni */}
      <Routes>
        {/* Ana sayfa için yönlendirme: Kimlik doğrulama durumuna göre Home veya Login sayfasına yönlendirme */}
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        {/* Giriş sayfası için yönlendirme: Kimlik doğrulama durumuna göre ana sayfaya veya giriş sayfasına yönlendirme */}
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        {/* Kayıt sayfası için yönlendirme: Kimlik doğrulama durumuna göre ana sayfaya veya kayıt sayfasına yönlendirme */}
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      {/* Bildirimler için Toast bileşeni */}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
