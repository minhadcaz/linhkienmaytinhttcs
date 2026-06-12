import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { registerUserService } from '../services/authservice';

// =======================================================
// 1. CHỨC NĂNG ĐĂNG KÝ (REGISTER)
// =======================================================
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Gọi tầng Service để thực hiện các nghiệp vụ: 
    // Kiểm tra trùng lặp, mã hóa mật khẩu, và insert vào Database (bảng users + khachhang)
    await registerUserService(req.body);
    
    // Trả về JSON thông báo thành công cho React
    res.status(200).json({ message: "Đăng ký thành công!" });
    
  } catch (error: any) {
    console.error("Lỗi đăng ký:", error);
    // Bắt lỗi từ Service (ví dụ: Trùng email/username) và trả về HTTP 400
    res.status(400).json({ message: error.message || "Lỗi server khi đăng ký" });
  }
};


// =======================================================
// 2. CHỨC NĂNG ĐĂNG NHẬP (LOGIN)
// =======================================================
export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  // Sử dụng cấu hình LocalStrategy của Passport để xác thực username/password [4]
  // Thiết lập { session: false } vì chúng ta dùng JWT, không dùng session lưu bộ nhớ [3, 5]
  passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
    
    // Nếu có lỗi hệ thống
    if (err) return res.status(500).json({ message: "Lỗi server trong quá trình xác thực" });
    
    // Nếu tài khoản hoặc mật khẩu không chính xác (user = false)
    if (!user) return res.status(401).json({ message: info.message });

    // NẾU XÁC THỰC THÀNH CÔNG: Tạo token JWT [6]
    const token = jwt.sign(
      { idusers: user.idusers, username: user.username }, 
      process.env.JWT_SECRET || 'chuoi-bi-mat', // Khóa bí mật (nên đưa vào file .env)
      { expiresIn: '1d' } // Token có thời hạn 1 ngày
    );

    // Loại bỏ trường mật khẩu (pass) khỏi object user trước khi gửi về Frontend để bảo mật
    const { pass, ...userWithoutPassword } = user;

    // Trả token và thông tin người dùng về cho Frontend (React hứng)
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      access_token: token,
      user: userWithoutPassword
    });

  })(req, res, next);
};