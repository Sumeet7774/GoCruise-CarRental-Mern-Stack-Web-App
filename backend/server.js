import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";


// Load env variables
dotenv.config();
connectDB();

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});
