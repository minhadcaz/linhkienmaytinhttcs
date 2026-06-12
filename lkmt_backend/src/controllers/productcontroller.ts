import { Request, Response } from 'express';
import { getAllProductsService } from '../services/productservice';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await getAllProductsService();
    // Trả kết quả thành công (Status 200) cùng dữ liệu JSON
    res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      data: data
    });
  } catch (error) {
    console.error(error);
    // Trả lỗi (Status 500) nếu có trục trặc
    res.status(500).json({ message: "Lỗi server!" });
  }
}