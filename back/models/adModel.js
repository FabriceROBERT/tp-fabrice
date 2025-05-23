const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: [0, "Le prix ne peut pas être négatif"],
    },
    image: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "La localisation est requise"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "La catégorie est requise"],
      enum: [
        "Immobilier",
        "Véhicules",
        "Multimédia",
        "Mode",
        "Maison",
        "Emploi",
        "Autres",
      ],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'auteur est requis"],
    },
  },
  {
    timestamps: true,
  }
);
adSchema.set("toObject", { virtuals: true });
adSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Ad", adSchema);
