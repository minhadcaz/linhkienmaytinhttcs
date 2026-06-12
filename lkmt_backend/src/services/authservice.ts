import { prisma } from '../models/prisma';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // Import thư viện tạo ID chuỗi ngẫu nhiên

export const registerUserService = async (data: any) => {
  const { username, email, password, fullName } = data;

  // 1. Kiểm tra xem username hoặc email đã tồn tại trong CSDL chưa
  const existingUser = await prisma.users.findFirst({
    where: { 
      OR: [ { username: username }, { email: email } ] 
    }
  });
  
  if (existingUser) {
    throw new Error("Tên đăng nhập hoặc Email đã được sử dụng!");
  }

  // 2. Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Nested Write: Tạo user và khachhang cùng lúc
  const newUser = await prisma.users.create({
    data: {
      idusers: uuidv4(),
      username: username,
      email: email,
      pass: hashedPassword,
      roles: "customer", // Phân quyền mặc định là customer
      khachhang: {
        create: {
          idkh: uuidv4(),
          tenkh: fullName || username, // Nếu không nhập tên, lấy username làm tên
        }
      }
    }
  });

  return newUser;
};