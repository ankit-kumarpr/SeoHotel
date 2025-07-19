// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./Pages/ForgetPassword";

import Allmain from "./components/Allmain";
import Login from "./Pages/Login";
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/newpassword/:token" element={<ForgetPassword />} />
 
        <Route path="/*" element={<Allmain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
