const Sector = require("../models/Sector");

exports.createSector = async (req, res) => {
  const { nome, localizacao } = req.body;
  const sector = await Sector.create({
    nome,
    localizacao,
    createdBy: req.user.id,
  });
  res.status(201).json(sector);
};

exports.getSectors = async (req, res) => {
  const sectors = await Sector.find();
  res.json(sectors);
};
