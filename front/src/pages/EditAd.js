import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditAd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    location: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/sign-in");

    const fetchAd = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ads/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAd(response.data);
        setForm({
          title: response.data.title || "",
          description: response.data.description || "",
          price: response.data.price || "",
          image: response.data.image || "",
          location: response.data.location || "",
          category: response.data.category || "",
        });
      } catch (err) {
        setError("Erreur lors de la récupération de l'annonce.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:8080/ads/edit/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Annonce modifiée avec succès !");
      navigate("/app"); // ou vers la liste ou détail
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!ad) return null;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-sky-700">
        Modifier l’annonce
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="font-semibold block">
            Titre
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="font-semibold block">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="price" className="font-semibold block">
            Prix (€)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="image" className="font-semibold block">
            Image (URL)
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={form.image}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="location" className="font-semibold block">
            Localisation
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={form.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="category" className="font-semibold block">
            Catégorie
          </label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            className="select select-bordered w-full">
            <option value="">-- Sélectionner --</option>
            <option value="Immobilier">Immobilier</option>
            <option value="Véhicules">Véhicules</option>
            <option value="Multimédia">Multimédia</option>
            <option value="Mode">Mode</option>
            <option value="Maison">Maison</option>
            <option value="Emploi">Emploi</option>
            <option value="Autres">Autres</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
