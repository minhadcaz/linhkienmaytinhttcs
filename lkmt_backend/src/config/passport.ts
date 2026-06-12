import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { prisma } from '../models/prisma';

// Chỉ giữ lại phần kiểm tra Username và Password
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) return done(null, false, { message: 'Sai tên đăng nhập.' });

    const isMatch = await bcrypt.compare(password, user.pass); 
    if (!isMatch) return done(null, false, { message: 'Sai mật khẩu.' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


