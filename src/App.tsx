import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
