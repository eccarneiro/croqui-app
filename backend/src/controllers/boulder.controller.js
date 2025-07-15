const Boulder = require("../models/Boulder");

exports.createBoulder = async (req, res) => {
  const {
    nome,
    graduacao,
    fa,
    sector,
    imagens,
  } = req.body;

  const boulder = await Boulder.create({
    nome,
    graduacao,
    fa,
    sector,
    createdBy: req.user.id,
    imagens,
  });

  res.status(201).json(boulder);
};

exports.getBoulders = async (req, res) => {
  const boulders = await Boulder.find().populate("sector");
  res.json(boulders);
};

exports.updateBoulder = async (req, res) => {
  const boulder = await Boulder.findById(req.params.id);
  if (!boulder) return res.status(404).json({ message: "Boulder não encontrado" });

  if (
    boulder.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Sem permissão para editar" });
  }

  Object.assign(boulder, req.body);
  await boulder.save();
  res.json(boulder);
};

exports.deleteBoulder = async (req, res) => {
  const boulder = await Boulder.findById(req.params.id);
  if (!boulder) return res.status(404).json({ message: "Boulder não encontrado" });

  if (
    boulder.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Sem permissão para deletar" });
  }

  await boulder.deleteOne();
  res.json({ message: "Boulder deletado" });
};
