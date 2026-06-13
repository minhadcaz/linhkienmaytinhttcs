import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: 'public/assets/images', // Đảm bảo bạn đã tạo thư mục này
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname)); // Tạo tên file ngẫu nhiên tránh trùng lặp
  }
});

// Chú ý: Dùng .array('images', 5) thay vì .single() để cho phép upload tối đa 5 file cùng lúc
export const uploadMultipleImages = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 } // Giới hạn 3MB mỗi ảnh
}).array('images', 5);