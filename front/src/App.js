import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Ads from "./pages/Ads";
import NewAd from "./pages/NewAd";
import EditAd from "./pages/EditAd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Je l'ai appélé le chemin "app" car je me suis dit que c'est le coeur de l'application */}
        <Route path="/app" element={<Ads />} />
        <Route path="/app/ads/new" element={<NewAd />} />
        <Route path="/ads/edit/:id" element={<EditAd />} />
      </Routes>
    </Router>
  );
}

export default App;
