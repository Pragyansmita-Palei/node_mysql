import express from "express"
import cors from "cors"
import morgan from "morgan"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import resturantRoutes from './routes/resturantRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
const app = express();

app.use(express.json())
app.use(cors());


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1',resturantRoutes);
app.use('/api/v1',categoryRoutes);
app.use('/api/v1',foodRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});