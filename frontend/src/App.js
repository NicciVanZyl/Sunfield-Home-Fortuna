import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Donate from "./pages/donate";
import Contact from "./pages/contact";
import AdminDashboard from "./pages/adminDashboard";
import UserDashboard from "./pages/userDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Donate" element={<Donate />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/userDashboard" element={<UserDashboard />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
