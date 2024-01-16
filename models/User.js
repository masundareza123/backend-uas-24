// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nim: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nama_lengkap: { type: String, required: true },
  program_studi: { type: String, required: true },
  nomor_telepon: { type: String, required: true }
});

const User = mongoose.model('UserReza', userSchema);

module.exports = User;
