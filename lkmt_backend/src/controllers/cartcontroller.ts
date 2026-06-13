import { Request, Response } from 'express';
import { prisma } from '../models/prisma'; // Đường dẫn trỏ tới file Prisma client của bạn

// API 1: Thêm sản phẩm vào giỏ hàng [1, 2]
export const addToCart = async (req: Request, res: Response) => {
  try {
    // Lấy idusers từ token (thông qua middleware JWT đã cấu hình) [4]
    const userId = (req as any).user.idusers; 
    const { productId, quantity = 1 } = req.body;

    // 1. Kiểm tra sản phẩm và lấy giá
    const product = await prisma.sanpham.findUnique({ where: { idsp: productId } });
    if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    const productPrice = Number(product.giakm || product.gianiemyet); // Ép kiểu vì trong schema price là Int, gianiemyet là Decimal

    // 2. Tìm giỏ hàng của user, nếu chưa có thì tạo mới (Upsert logic) [2]
    let cart = await prisma.giohang.findFirst({ where: { idusers: userId } });
    if (!cart) {
      cart = await prisma.giohang.create({ data: { idusers: userId, sum: 0 } });
    }

    // 3. Kiểm tra xem sản phẩm đã có trong chi tiết giỏ hàng chưa
    const existingDetail = await prisma.chitietgiohang.findFirst({
      where: { cart_id: cart.id, product_id: productId }
    });

    if (existingDetail) {
      // Đã có -> Cập nhật tăng số lượng [2]
      await prisma.chitietgiohang.update({
        where: { id_detail: existingDetail.id_detail },
        data: { quantity: (existingDetail.quantity || 0) + quantity }
      });
    } else {
      // Chưa có -> Tạo mới chi tiết giỏ hàng [1]
      await prisma.chitietgiohang.create({
        data: {
          cart_id: cart.id,
          product_id: productId,
          quantity: quantity,
          price: productPrice
        }
      });
    }

    // 4. Cập nhật tổng số lượng (sum) vào bảng giohang [5, 6]
    const allDetails = await prisma.chitietgiohang.findMany({ where: { cart_id: cart.id } });
    const totalItems = allDetails.reduce((sum, item) => sum + (item.quantity || 0), 0);
    await prisma.giohang.update({
      where: { id: cart.id },
      data: { sum: totalItems }
    });

    res.status(200).json({ message: "Thêm vào giỏ hàng thành công!", totalItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi thêm vào giỏ hàng" });
  }
};

// API 2: Lấy dữ liệu giỏ hàng để render ra Frontend
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.idusers;
    const cart = await prisma.giohang.findFirst({
      where: { idusers: userId },
      include: {
        chitietgiohang: {
          include: { sanpham: true } // Kéo theo thông tin sản phẩm để hiển thị tên, ảnh
        }
      }
    });
    res.status(200).json(cart || { sum: 0, chitietgiohang: [] });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};



// API 3: Cập nhật số lượng sản phẩm (Tăng/Giảm)
export const updateCartQuantity = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.idusers;
    const { productId, delta } = req.body; 

    // 1. Tìm giỏ hàng của user
    const cart = await prisma.giohang.findFirst({ where: { idusers: userId } });
    if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    // 2. Tìm chi tiết sản phẩm trong giỏ
    const existingDetail = await prisma.chitietgiohang.findFirst({
      where: { cart_id: cart.id, product_id: productId }
    });
    if (!existingDetail) return res.status(404).json({ message: "Sản phẩm không có trong giỏ" });

    const newQuantity = (existingDetail.quantity || 1) + delta;
    if (newQuantity < 1) return res.status(400).json({ message: "Số lượng tối thiểu là 1" });

    // 3. Sử dụng Prisma Transaction để cập nhật đồng thời
    await prisma.$transaction(async (tx) => {
      // Cập nhật quantity trong chitietgiohang
      await tx.chitietgiohang.update({
        where: { id_detail: existingDetail.id_detail },
        data: { quantity: newQuantity }
      });

      // Lấy tất cả chi tiết để tính tổng số lượng
      const allDetails = await tx.chitietgiohang.findMany({ where: { cart_id: cart.id } });
      const totalItems = allDetails.reduce((sum, item) => sum + (item.quantity || 0), 0);

      // Cập nhật sum trong giohang
      await tx.giohang.update({
        where: { id: cart.id },
        data: { sum: totalItems }
      });
    });

    res.status(200).json({ message: "Cập nhật số lượng thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi cập nhật giỏ hàng" });
  }
};

// API 4: Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.idusers;
    const { productId } = req.body;

    const cart = await prisma.giohang.findFirst({ where: { idusers: userId } });
    if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    await prisma.$transaction(async (tx) => {
      await tx.chitietgiohang.deleteMany({
        where: { cart_id: cart.id, product_id: productId }
      });

      const allDetails = await tx.chitietgiohang.findMany({ where: { cart_id: cart.id } });
      const totalItems = allDetails.reduce((sum, item) => sum + (item.quantity || 0), 0);

      await tx.giohang.update({
        where: { id: cart.id },
        data: { sum: totalItems }
      });
    });

    res.status(200).json({ message: "Đã xóa khỏi giỏ hàng" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm" });
  }
};