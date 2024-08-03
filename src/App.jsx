import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Success from "./pages/Success";
const baseUrl = "https://vfgabackend.outhad.com/api/";

function App() {
  const navigate = useNavigate();
  const checkLogin = async()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('vgfatoken'));
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const response = await fetch(baseUrl+"auth/official/me",requestOptions);
    if(response.status === 401) navigate("/login");
    else navigate("/dashboard");
    const res = await response.json();
    console.log(res)
  }
  useEffect(() => {
    if (localStorage.getItem('vgfatoken')) {
      checkLogin();
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
