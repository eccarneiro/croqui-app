const mongoose = require("mongoose");

const boulderSchema = new mongoose.Schema({
  nome: String,
  graduacao: String,
  fa: String,
  sector: { type: mongoose.Schema.Types.ObjectId, ref: "Sector" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imagens: {
    visaoGeral: String,
    agarrasSaida: String,
    linhaDesenhada: String,
  },
});

module.exports = mongoose.model("Boulder", boulderSchema);
