import { Request, Response } from 'express';
import { registerUserService } from '../services/authservice';

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Gọi Service xử lý lưu database
    await registerUserService(req.body);
    
    // Trả về JSON thành công cho Frontend (React)
    res.status(200).json({ message: "Đăng ký thành công!" });
    
  } catch (error: any) {
    console.error("Lỗi đăng ký:", error);
    // Bắt lỗi từ Service ném ra (VD: Trùng username/email) và trả về HTTP 400
    res.status(400).json({ message: error.message || "Lỗi server khi đăng ký" });
  }
};