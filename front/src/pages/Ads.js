import React, { useState, useEffect } from "react";
import axios from "axios";
import AdHeader from "../components/AdHeader";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Ads() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirection si non connecté
    if (!token) {
      navigate("/sign-in");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded._id);
    } catch (err) {
      console.error("Token invalide :", err);
      navigate("/sign-in");
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.email;
    console.log(decoded);

    const fetchAds = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ads/getAllAds");
        setAds(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Impossible de charger les annonces.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    // if (!window.confirm("Confirmer la suppression de cette annonce ?")) return;

    try {
      await axios.delete(`http://localhost:8080/ads/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
      alert("Annonce supprimée !");
      navigate("/app");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-sky-800">
        Les Mauvaises Annonces
      </h1>
      <AdHeader />
      {loading ? (
        <p className="text-center text-gray-600">Chargement des annonces...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-medium">{error}</p>
      ) : ads.length === 0 ? (
        <p className="text-center text-gray-600">Aucune annonce disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200">
              {ad.image && (
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-sky-800 mb-2">
                {ad.title}
              </h2>
              <p className="text-gray-700 line-clamp-3">{ad.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                Lieu : {ad.location} — Catégorie : {ad.category}
              </div>
              <div className="mt-2 font-bold text-sm italic ">
                Vendeur: {ad.author.nom} {ad.author.prenom}
              </div>
              <div className="mt-2 font-bold text-lg text-sky-700">
                {ad.price} €
              </div>
              {ad.author?._id === currentUserId && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/ads/edit/${ad._id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-400">
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500">
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
