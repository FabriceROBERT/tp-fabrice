import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const handleAddAd = () => {
    navigate("/app/ads/new");
  };

  return (
    <div className="flex flex-col md:flex-row mt-20 justify-end items-center mb-8 gap-4">
      <div className="flex gap-4">
        <button
          onClick={handleAddAd}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow">
          Ajouter une annonce
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow">
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
