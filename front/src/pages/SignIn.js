import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Merci de remplir tous les champs.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      alert("Connexion réussie !");
      navigate("/app");
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-sky-800">
          Connexion
        </h1>

        {error && (
          <div className="text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-gray-700">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-sky-800 hover:bg-sky-700 transition-colors text-white font-semibold rounded-lg shadow-md">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default SignIn;
