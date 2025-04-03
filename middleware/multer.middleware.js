import multer from 'multer';
import path from 'path';

// Allowed file types
const ALLOWED_FILE_TYPES = /jpeg|jpg|png|gif/;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});

// File filter function
const fileFilter = (req, file, cb) => {
    const extname = ALLOWED_FILE_TYPES.test(path.extname(file.originalname).toLowerCase());
    const mimetype = ALLOWED_FILE_TYPES.test(file.mimetype);

    return extname && mimetype ? cb(null, true) : cb(new Error('Only image files (JPEG, PNG, GIF) are allowed!'), false);
};

// Multer instance
const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter
}).single('profilePicture'); // Change field name as needed

export default upload;
