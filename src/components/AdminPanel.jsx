import React, { useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [token, setToken] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [newCoupon, setNewCoupon] = useState({ code: "", order: "" });
  const [editingCoupon, setEditingCoupon] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://couponbackend-nfmi.onrender.com/api/admin/login",
        loginData
      );
      setToken(res.data.token);
      alert("Logged in successfully!");
    } catch (error) {
      alert("Login failed");
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(
        "https://couponbackend-nfmi.onrender.com/api/admin/coupons",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCoupons(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClaims = async () => {
    try {
      const res = await axios.get(
        "https://couponbackend-nfmi.onrender.com/api/admin/claims",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClaims(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://couponbackend-nfmi.onrender.com/api/admin/coupons`,
        newCoupon,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Coupon added successfully!");
      setCoupons([...coupons, res.data]); // Update UI
      setNewCoupon({ code: "", order: "" }); // Reset form
    } catch (error) {
      alert("Failed to add coupon");
    }
  };

  // Handle Editing a Coupon
  const handleEditCoupon = (coupon) => {
    setEditingCoupon({ ...coupon });
  };

  //Handle Update Coupon API Request
  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://couponbackend-nfmi.onrender.com/api/admin/coupons/${editingCoupon._id}`,
        editingCoupon,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Coupon updated successfully!");
      setCoupons(
        coupons.map((c) => (c._id === editingCoupon._id ? res.data : c))
      ); // Update UI
      setEditingCoupon(null); // Exit edit mode
    } catch (error) {
      alert("Failed to update coupon");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Panel</h2>
      {!token ? (
        <div className="bg-white shadow-md rounded p-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={fetchCoupons}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              View Coupons
            </button>
            <button
              onClick={fetchClaims}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            >
              View Claim History
            </button>
          </div>

          {/* ADD NEW COUPON FORM */}
          <div className="bg-white shadow-md rounded p-4 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Add New Coupon</h3>
            <form onSubmit={handleAddCoupon}>
              <input
                type="text"
                placeholder="Coupon Code"
                value={newCoupon.code}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, code: e.target.value })
                }
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                placeholder="Order"
                value={newCoupon.order}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, order: e.target.value })
                }
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Coupon
              </button>
            </form>
          </div>

          {/* DISPLAY COUPONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-2xl font-semibold mb-4">Coupons</h3>
              <ul>
                {coupons.map((coupon) => (
                  <li
                    key={coupon._id}
                    className="border-b border-gray-200 py-2"
                  >
                    <span className="font-bold">Code:</span> {coupon.code} |{" "}
                    <span className="font-bold">Order:</span> {coupon.order} |{" "}
                    <span className="font-bold">Claimed:</span>{" "}
                    {coupon.claimed ? "Yes" : "No"}
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* EDIT COUPON FORM */}
            {editingCoupon && (
              <div className="bg-white shadow-md rounded p-4 mt-6">
                <h3 className="text-2xl font-semibold mb-4">Edit Coupon</h3>
                <form onSubmit={handleUpdateCoupon}>
                  <input
                    type="text"
                    value={editingCoupon.code}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        code: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    value={editingCoupon.order}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        order: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Update Coupon
                  </button>
                </form>
              </div>
            )}

            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-2xl font-semibold mb-4">Claim History</h3>
              <ul>
                {claims.map((claim) => (
                  <li key={claim._id} className="border-b border-gray-200 py-2">
                    <span className="font-bold">Coupon:</span>{" "}
                    {claim.coupon?.code} |{" "}
                    <span className="font-bold">IP:</span> {claim.ip} |{" "}
                    <span className="font-bold">Claimed At:</span>{" "}
                    {new Date(claim.claimedAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
