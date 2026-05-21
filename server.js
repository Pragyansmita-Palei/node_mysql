import express from "express"
import cors from "cors"
import morgan from "morgan"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import resturantRoutes from './routes/resturantRoutes.js'

const app = express();

app.use(express.json())
app.use(cors());


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1',resturantRoutes)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});