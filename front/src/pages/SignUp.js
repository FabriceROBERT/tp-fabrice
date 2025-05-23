import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(prenom);
  }, [prenom, nom, email]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !prenom || !nom) {
      alert("Merci de remplir tous les champs");
      return;
    }
    if (password.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        {
          email,
          password,
          prenom,
          nom,
        }
      );
      alert("Inscription réussie !");
      console.log(response.data);
      navigate("/app");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-sky-800">
          S'inscrire
        </h1>

        <div>
          <label
            htmlFor="prenom"
            className="block mb-1 font-medium text-gray-700">
            Prénom
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nom" className="block mb-1 font-medium text-gray-700">
            Nom
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-sky-800 hover:bg-sky-700 transition-colors text-white font-semibold rounded-lg shadow-md">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
