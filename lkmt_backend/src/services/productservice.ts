import { prisma } from '../models/prisma';

export const getAllProductsService = async () => {
  // Lấy danh sách sản phẩm, có thể include thêm danh mục (loaisanpham) và nhà sản xuất (nhasanxuat)
  const products = await prisma.sanpham.findMany({
    include: {
      loaisanpham: true,
      nhasanxuat: true
    }
  });
  return products;
}


