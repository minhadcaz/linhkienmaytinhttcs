import { Request, Response } from 'express';
import multer from 'multer';
import { prisma } from '../../models/prisma';
import { v4 as uuidv4 } from 'uuid'; // Import hàm tạo chuỗi ngẫu nhiên

export const createProduct = async (req: Request, res: Response) => {

  try {
    // 1. Nhận dữ liệu từ form AdminAddProduct ở Frontend gửi lên [4]
    const {
      tensp, idcate, idnsx, gianiemyet, giakm, tinhtrang, namecate,
      baohanh, thongsokythuat, featured, soluong, imageLinks
    } = req.body;
    console.log("Dữ liệu ảnh Backend nhận được:", imageLinks);
    console.log("Kiểm tra có phải mảng không:", Array.isArray(imageLinks));
    const shortUuid = uuidv4().split('-')[0];
    // 2. Tạo mã ID (String) ngẫu nhiên cho Sản phẩm và Tồn kho
    const newIdSp = namecate + '-' + idnsx + '-' + shortUuid;
    const newIdTk = uuidv4();

    // 3. Xử lý an toàn chuỗi JSON cho Thông số kỹ thuật
    let parsedThongSo: any = undefined;
    if (thongsokythuat) {
      try {
        parsedThongSo = JSON.parse(thongsokythuat);
      } catch (e) {
        return res.status(400).json({ message: "Sai định dạng JSON ở thông số kỹ thuật!" });
      }
    }
    let hinhanhJson: any[] = []; // Khởi tạo mảng rỗng
    const files = (req as any).files;
    // Xử lý JSON cho hình ảnh (Nếu dùng dạng Link)
    let finalHinhanh = hinhanhJson.length > 0 ? hinhanhJson : undefined;

    // Trường hợp 1: Nhận nhiều Link (Frontend gửi mảng URL)
    if (imageLinks && Array.isArray(imageLinks) && imageLinks.length > 0) {
      finalHinhanh = imageLinks; // Lưu thẳng mảng chuỗi vào DB, không cần map object!
    }

    // Trường hợp 2: Nếu bạn dùng Multer để upload nhiều file (req.files)
    // Cần đảm bảo middleware upload sử dụng upload.array('images', 5) thay vì upload.single()
    if (req.files && Array.isArray(req.files)) {
      const uploadedImages = (req.files as Express.Multer.File[]).map(file => ({
        url: `/assets/images/${file.filename}` // Đường dẫn lưu vật lý
      }));
      hinhanhJson = [...hinhanhJson, ...uploadedImages];
    }

    // Nếu không có ảnh nào, trả về undefined để Prisma gán NULL [1]


    // 4. Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu [1, 2]
    // Nếu thêm vào bảng sanpham thành công nhưng bảng tonkho lỗi -> Sẽ tự động Rollback (Hủy) toàn bộ.
    await prisma.$transaction(async (tx) => {
      // 4.1 Thêm vào bảng sanpham
      await tx.sanpham.create({
        data: {
          idsp: newIdSp,
          tensp: tensp,
          idcate: idcate,
          idnsx: idnsx,
          gianiemyet: parseFloat(gianiemyet), // Ép kiểu số thực cho Decimal
          giakm: giakm ? parseFloat(giakm) : parseFloat(gianiemyet),
          tinhtrang: tinhtrang,
          baohanh: baohanh,
          thongsokythuat: parsedThongSo, // Lưu mảng JSON
          featured: featured || false,
          hinhanh: finalHinhanh
        }
      });

      // 4.2 Thêm số lượng khởi tạo vào bảng tonkho
      await tx.tonkho.create({
        data: {
          idtk: newIdTk,
          idsp: newIdSp, // Gắn khóa ngoại liên kết với bảng sanpham
          soluong: parseInt(soluong) || 0,
          donvi: "Cái" // Bạn có thể linh hoạt sửa hoặc truyền từ frontend lên
        }
      });
    });

    res.status(200).json({
      message: "Thêm sản phẩm thành công!",
      idsp: newIdSp
    });

  } catch (error: any) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi thêm sản phẩm mới!" });
  }
};
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.loaisanpham.findMany({
      select: {
        idcate: true,
        namecate: true
      }
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Lỗi lấy danh sách loại sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi lấy loại sản phẩm" });
  }
};
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await prisma.nhasanxuat.findMany({
      select: {
        idnsx: true,
        tennsx: true
      }
    });
    res.status(200).json(brands);
  } catch (error) {
    console.error("Lỗi lấy danh sách nhà sản xuất:", error);
    res.status(500).json({ message: "Lỗi server khi lấy nhà sản xuất" });
  }
};