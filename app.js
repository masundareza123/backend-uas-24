// app.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('./models/db');
const User = require('./models/User');
const Surat = require('./models/Surat');

const app = express();

app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body);

    try {
      const { nim, password, nama_lengkap, program_studi, nomor_telepon } = req.body;
  
      // Check if user with the given nim already exists
      const existingUser = await User.findOne({ nim });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this nim already exists' });
      }

  
      // Hash the password
      const saltRounds = 10; // Number of salt rounds
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser = new User({
        nim,
        password: hashedPassword,
        nama_lengkap,
        program_studi,
        nomor_telepon
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      res.json({ success: true, user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // ... (continue with the previous code)
  
// Login endpoint
app.post('/login', async (req, res) => {
    try {
      const { nim, password } = req.body;
  
      // Check if user with the given nim exists
      const user = await User.findOne({ nim });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Check if the provided password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Create and send a JWT token
      const token = jwt.sign({ _id: user._id }, 'your_secret_key');
      res.header('auth-token', token).json({ success: true, message: 'Berhasil login', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Create Surat
app.post('/surat', async (req, res) => {
  try {
    const { nim, nomor_surat, tanggal_pengajuan, jenis_surat, nama_pemohon, tujuan, status_surat, keterangan } = req.body;

    const newSurat = new Surat({
      nim,
      nomor_surat,
      tanggal_pengajuan,
      jenis_surat,
      nama_pemohon,
      tujuan,
      status_surat,
      keterangan // Tambahkan keterangan
    });

    const savedSurat = await newSurat.save();
    res.json({ success: true, message: 'Surat berhasil dibuat', surat: savedSurat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Read All Surat for a specific nim
app.get('/surat/:nim', async (req, res) => {
  try {
    const suratList = await Surat.find({ nim: req.params.nim });
    res.json({ success: true, suratList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read Surat by ID and nim
app.get('/surat/:nim/:id', async (req, res) => {
  try {
    const surat = await Surat.findOne({ _id: req.params.id, nim: req.params.nim });
    if (!surat) {
      return res.status(404).json({ error: 'Surat not found' });
    }
    res.json({ success: true, surat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Surat by ID and nim
app.put('/surat/:nim/:id', async (req, res) => {
  try {
    const surat = await Surat.findOneAndUpdate({ _id: req.params.id, nim: req.params.nim }, req.body, { new: true });
    if (!surat) {
      return res.status(404).json({ error: 'Surat not found' });
    }
    res.json({ success: true, surat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Surat by ID and nim
app.delete('/surat/:nim/:id', async (req, res) => {
  try {
    const surat = await Surat.findOneAndDelete({ _id: req.params.id, nim: req.params.nim });
    if (!surat) {
      return res.status(404).json({ error: 'Surat not found' });
    }
    res.json({ success: true, message: 'Surat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read All Surat
app.get('/surat', async (req, res) => {
  try {
    const suratList = await Surat.find();
    res.json({ success: true, suratList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read Surat by ID
app.get('/surat/:id', async (req, res) => {
  try {
    const surat = await Surat.findById(req.params.id);
    if (!surat) {
      return res.status(404).json({ error: 'Surat not found' });
    }
    res.json({ success: true, surat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Surat by ID
app.put('/surat/:id', async (req, res) => {
  try {
    const surat = await Surat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!surat) {
      return res.status(404).json({ error: 'Surat not found' });
    }
    res.json({ success: true, surat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Surat by ID
app.delete('/surat/:id', async (req, res) => {
  try {
    const surat = await Surat.findByIdAndDelete(req.params.id);
    if (!surat) {
      return res.status(404).json({ error: 'Surat not found' });
    }
    res.json({ success: true, message: 'Surat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
