import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CouponClaim from "./components/CouponClaim";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex justify-center space-x-4">
          <Link className="hover:underline" to="/">
            Claim Coupon
          </Link>
          <Link className="hover:underline" to="/admin">
            Admin Panel
          </Link>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CouponClaim />} />
            <Route path="/admin/*" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
