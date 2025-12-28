import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Configure Multer for file upload (Local storage - Legacy support if needed)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'public/assets/uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint
app.post('/api/upload', upload.array('files'), (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        const filePaths = files.map(file => `/assets/uploads/${file.filename}`);
        res.json({ paths: filePaths });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Tarot Star API Server (Node.js). NOTE: Data is managed via Supabase directly from the Frontend.');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
