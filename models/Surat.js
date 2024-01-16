// models/Surat.js
const mongoose = require('mongoose');

const suratSchema = new mongoose.Schema({
    nim: { type: String, required: true },
  nomor_surat: { type: String, required: true },
  tanggal_pengajuan: { type: String, required: true },
  jenis_surat: { type: String, required: true },
  nama_pemohon: { type: String, required: true },
  tujuan: { type: String, required: true },
  status_surat: { type: String, required: true },
  keterangan: { type: String } 
});

const Surat = mongoose.model('SuratReza', suratSchema);

module.exports = Surat;
