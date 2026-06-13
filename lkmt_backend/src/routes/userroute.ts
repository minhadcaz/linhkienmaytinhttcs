import express from 'express';
import { getAllUsers } from '../controllers/admincontroller/usercontroller';
import { verifyToken } from '../middlewares/jwtmiddleware';

const router = express.Router();

// Route lấy danh sách người dùng (cần verifyToken bảo vệ)
router.get('/', verifyToken, getAllUsers);

export default router;