const Ad = require("../models/adModel.js");
const mongoose = require("mongoose");

const createAd = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    const ad = new Ad({
      ...req.body,
      author: req.user._id,
    });
    await ad.save();
    res.status(201).send(ad);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllAds = async (req, res) => {
  try {
    const ad = await Ad.find({}).populate("author", "prenom nom");
    res.status(200).send(ad);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ error: "Annonce introuvable" });
    }

    if (ad.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Non autorisé à supprimer cette annonce." });
    }

    await ad.deleteOne();

    res.status(200).json({ message: "Annonce supprimée avec succès", ad });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const updateAd = async (req, res) => {
  try {
    const recipe = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!recipe) {
      return res.status(404).send({ error: "Ad not found" });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate(
      "author",
      "prenom nom"
    );
    if (!ad) {
      return res.status(404).send({ error: "Ad not found" });
    }
    res.status(200).send(ad);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { createAd, getAllAds, deleteAd, updateAd, getAdById };
