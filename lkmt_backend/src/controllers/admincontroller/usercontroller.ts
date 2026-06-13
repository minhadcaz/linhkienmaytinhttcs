import { Request, Response } from 'express';
import { prisma } from '../../models/prisma';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // 1. Lấy tất cả user kèm theo thông tin từ 2 bảng liên kết [1-3]
    const users = await prisma.users.findMany({
      include: {
        khachhang: true, // Join bảng khachhang
        nhanvien: true,  // Join bảng nhanvien
      },
      orderBy: {
        ngaytao: 'desc'
      }
    });

    // 2. Format dữ liệu theo yêu cầu
    const formattedUsers = users.map((user) => {
      let fullName = "";
      let phone = "";

      // Kiểm tra và lấy Tên + SĐT dựa theo bảng nào có dữ liệu
      if (user.khachhang) {
        fullName = user.khachhang.tenkh || "";
        phone = user.khachhang.sdt || "";
      } else if (user.nhanvien) {
        fullName = user.nhanvien.tennv || "";
        phone = user.nhanvien.phonenum || "";
      }

      return {
        idusers: user.idusers,
        username: user.username,
        email: user.email || "Trống",
        role: user.roles || "USER",
        fullName: fullName, 
        phone: phone,
        status: user.tinhtrang || "Hoat dong",
      };
    });

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Lỗi lấy danh sách user:", error);
    res.status(500).json({ message: "Lỗi server khi lấy dữ liệu người dùng" });
  }
};