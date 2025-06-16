import express from 'express';
import multer from 'multer';
import { restaurarBackup } from '../controllers/backups.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // carpeta temporal para subir archivos

router.post('/restore', upload.single('backup'), restaurarBackup);

export default router;
