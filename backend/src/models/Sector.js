const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  nome: String,
  localizacao: String,
  imagens: {
    visaoGeral: String,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Sector", sectorSchema);
