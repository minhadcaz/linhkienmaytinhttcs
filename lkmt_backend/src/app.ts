import express from 'express';
import cors from 'cors';
import passport from 'passport';
import productRoutes from './routes/productroute';
import authRoutes from './routes/authroute';
import './config/passport'; // Import để chạy passport.use(...) - chỉnh lại đường dẫn nếu cần
import cartRoutes from './routes/cartroute'; 
import categoryRoutes from './routes/productroute';
import userRoutes from './routes/userroute';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); // Thêm dòng này
app.use('/api/products', productRoutes);
app.use('/api/data', categoryRoutes); 
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes); 

app.listen(port, () => {
  console.log(`Server Backend đang chạy tại http://localhost:${port}`);
});