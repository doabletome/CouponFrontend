import React, { useState } from "react";
import axios from "axios";

function CouponClaim() {
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState(null);

  const handleClaim = async () => {
    try {
      const res = await axios.post(
        "https://couponbackend-nfmi.onrender.com/api/claim",
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setCoupon(res.data.coupon);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Claim Your Coupon</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={handleClaim}
      >
        Claim Coupon
      </button>
      {message && <p className="mt-4 text-center text-lg">{message}</p>}
      {coupon && (
        <div className="mt-4 p-4 border border-green-400 rounded">
          <h3 className="text-xl font-semibold">Your Coupon:</h3>
          <p className="text-lg">Code: {coupon.code}</p>
        </div>
      )}
    </div>
  );
}

export default CouponClaim;
