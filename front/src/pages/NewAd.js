import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function NewAd() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token, navigate]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    location: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.location ||
      !form.category
    ) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded._id;
      console.log(userId);
      const newAd = {
        ...form,
        author: userId,
      };
      await axios.post("http://localhost:8080/ads/create", newAd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Annonce créée avec succès !");
      navigate("/app");
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la création.");
    }
  };
  if (!localStorage.getItem("token")) {
    navigate("/sign-in");
  } else {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-12 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-6">
          <h1 className="text-3xl font-bold text-sky-800 text-center">
            Nouvelle Annonce
          </h1>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <div>
            <label className="block mb-1 font-medium" htmlFor="title">
              Titre *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="description">
              Description *
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="price">
              Prix (€) *
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="image">
              Image (URL)
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="location">
              Localisation *
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="category">
              Catégorie *
            </label>
            <select
              name="category"
              id="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required>
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

          <button
            type="submit"
            className="w-full bg-sky-800 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition">
            Publier l’annonce
          </button>
        </form>
      </div>
    );
  }
}
