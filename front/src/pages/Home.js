import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };
  return (
    <div>
      <h1 className="text-4xl font-bold my-12 text-center text-sky-800">
        Le Mauvais Coin
      </h1>
      <div>
        {token ? (
          <div className="flex w-full items-center content-center flex-row gap-4">
            <button
              className="rounded-lg text-white  px-4 py-2 bg-green-500"
              onClick={() => navigate("/app/ads/new")}>
              Créer une annonce
            </button>
            <button
              className="rounded-lg text-white px-4 py-2 bg-red-500"
              onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center content-center flex-row gap-4">
            <button
              className="rounded-lg border-2 border-sky-800  px-4 py-2 bg-white"
              onClick={() => navigate("/sign-in")}>
              Se connecter
            </button>
            <button
              className="rounded-lg text-white px-4 py-2 bg-black"
              onClick={() => navigate("/sign-up")}>
              S'inscrire
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
