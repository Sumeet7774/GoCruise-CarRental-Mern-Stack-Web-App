import express from "express"
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import carRoutes from "./routes/carRoutes.js"


const app = express();


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoutes)
app.use("/api/cars", carRoutes)



export default app