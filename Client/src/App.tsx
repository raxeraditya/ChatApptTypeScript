import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SingnupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import HomePageUserChat from "./components/HomePageUserChat";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SingnupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/messages" element={<HomePageUserChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
