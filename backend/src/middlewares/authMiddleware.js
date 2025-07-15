const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Sem token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") return next();
  return res.status(403).json({ message: "Acesso negado" });
};

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    next();
  };
}

module.exports = { auth, isAdmin, authorizeRoles };
