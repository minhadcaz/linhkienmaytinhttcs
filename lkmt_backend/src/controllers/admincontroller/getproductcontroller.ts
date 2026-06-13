import { Request, Response } from 'express';
import { prisma } from '../../models/prisma';
import { Prisma } from '../../generated/prisma';

// API Lấy tất cả sản phẩm
export const getAllProductsadmin = async (req: Request, res: Response) => {
  try {
    // 1. Dùng Prisma lấy dữ liệu và "JOIN" các bảng liên quan
    const products = await prisma.sanpham.findMany({
      include: {
        loaisanpham: true, // Lấy thông tin Category (để lấy namecate) [1]
        nhasanxuat: true,  // Lấy thông tin Brand (để lấy tennsx) [1]
        tonkho: true       // Lấy thông tin Tồn kho (để lấy soluong) [1]
      },
      orderBy: {
        idsp: 'desc' // Sắp xếp sản phẩm mới thêm lên đầu
      }
    });

    // 2. Format lại dữ liệu cho phẳng (phù hợp với các cột của Ant Design Table)
    const formattedProducts = products.map((p) => ({
      idsp: p.idsp,
      tensp: p.tensp,
      // Lấy tên thay vì ID, nếu không có thì để trống
      idcate: p.loaisanpham?.namecate || "Không rõ", 
      idnsx: p.nhasanxuat?.tennsx || "Không rõ",
      // Prisma trả Decimal dưới dạng Object, cần ép kiểu về Number
      gianiemyet: Number(p.gianiemyet), 
      giakm: Number(p.giakm) !==0 ? Number(p.giakm) : Number(p.gianiemyet),
      // Vì bảng tonkho lưu dạng mảng (tonkho[]), ta lấy phần tử đầu tiên
      soluong: p.tonkho.length > 0 ? p.tonkho[0].soluong : 0, 
      tinhtrang: p.tinhtrang
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi lấy dữ liệu" });
  }
};




export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await prisma.sanpham.findUnique({
      where: { idsp: id },
      include: {
        loaisanpham: true,
        nhasanxuat: true,
        tonkho: true
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    // Format lại dữ liệu để trả về Frontend
    const formattedProduct = {
      ...product,
      soluong: product.tonkho.length > 0 ? product.tonkho[0]?.soluong : 0,
      // Đảm bảo hình ảnh luôn là mảng
      hinhanh: product.hinhanh && Array.isArray(product.hinhanh) ? product.hinhanh : typeof product.hinhanh === 'string' ? [product.hinhanh] : []
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error("Lỗi lấy chi tiết sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const  id  = String(req.params.id); // Lấy ID sản phẩm từ trên URL
    const {
      tensp, idcate, idnsx, gianiemyet, giakm, tinhtrang,
      baohanh, thongsokythuat, featured, soluong, 
      imageLinks 
    } = req.body;

    // 1. Kiểm tra xem sản phẩm có tồn tại trong Database không
    const existingProduct = await prisma.sanpham.findUnique({
      where: { idsp: id }
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật!" });
    }
 
    // 2. Xử lý cập nhật mảng hình ảnh (Nếu Frontend có gửi lên mảng imageLinks)
    let finalHinhanh = existingProduct.hinhanh; // Mặc định giữ lại ảnh cũ
    
    if (imageLinks && Array.isArray(imageLinks)) {
      finalHinhanh = imageLinks; // Ghi đè bằng mảng link mới: ["link1", "link2"]
    }

    // 3. Sử dụng Transaction để đảm bảo cập nhật đồng thời 2 bảng
    await prisma.$transaction(async (tx) => {
      // Cập nhật bảng sanpham
      await tx.sanpham.update({
        where: { idsp: id },
        data: {
          tensp: tensp !== undefined ? tensp : existingProduct.tensp,
          idcate: idcate !== undefined ? idcate : existingProduct.idcate,
          idnsx: idnsx !== undefined ? idnsx : existingProduct.idnsx,
          gianiemyet: gianiemyet !== undefined ? Number(gianiemyet) : existingProduct.gianiemyet,
          giakm: giakm !== undefined ? Number(giakm) : existingProduct.giakm,
          tinhtrang: tinhtrang !== undefined ? tinhtrang : existingProduct.tinhtrang,
          baohanh: baohanh !== undefined ? baohanh : existingProduct.baohanh,
          hinhanh: finalHinhanh ?? Prisma.JsonNull,

        }
      });

      // Cập nhật bảng tonkho (Do quan hệ 1-Nhiều nên ta dùng updateMany với điều kiện idsp)
      if (soluong !== undefined) {
        await tx.tonkho.updateMany({
          where: { idsp: id },
          data: {
            soluong: Number(soluong)
          }
        });
      }
    });

    res.status(200).json({ message: "Cập nhật sản phẩm thành công!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật sản phẩm!" });
  }
};