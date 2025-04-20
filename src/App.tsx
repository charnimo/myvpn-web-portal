
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/servers" element={<div className="p-8">Servers Page</div>} />
          <Route path="/settings" element={<div className="p-8">Settings Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
