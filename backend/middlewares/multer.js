import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./backend/public/upload",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// const storage = multer.memoryStorage();

// Check file type
const checkFileType = function (file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 2MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

export default upload;
