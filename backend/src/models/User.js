const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);
