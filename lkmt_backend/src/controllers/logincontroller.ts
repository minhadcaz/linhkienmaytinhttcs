import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { prisma } from '../models/prisma';

// 1. Cấu hình kiểm tra Username và Password
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) return done(null, false, { message: 'Sai tên đăng nhập.' });

    const isMatch = await bcrypt.compare(password, user.pass); // [8]
    if (!isMatch) return done(null, false, { message: 'Sai mật khẩu.' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// 2. Lưu User ID vào Session
passport.serializeUser((user: any, done) => {
  done(null, user.idusers); // [9]
});

// 3. Lấy ra dữ liệu User kèm Khachhang khi Frontend truy cập API [10]
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.users.findUnique({
      where: { idusers: id },
      include: { khachhang: true } // Kéo theo data khách hàng để trả về Profile
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});