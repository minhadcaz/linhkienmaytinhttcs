import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // 1. Lấy token từ header (Định dạng: Bearer <token>) [1]
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: "Vui lòng đăng nhập để thực hiện chức năng này!" });
    return;
  }

  try {
    // 2. Giải mã token bằng chuỗi Secret (khớp với chuỗi lúc bạn tạo trong auth.controller) [1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chuoi-bi-mat');

    // 3. Gán payload (chứa idusers) vào req.user để các Controller sau có thể sử dụng [2]
    (req as any).user = decoded;

    // 4. Cho phép đi tiếp vào Controller (addToCart hoặc getCart) [5]
    next();
  } catch (error) {
    res.status(401).json({ message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn!" });
    return;
  }
};