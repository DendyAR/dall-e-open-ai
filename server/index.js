import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import denURoutes from "./routes/denURoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "100mb"}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/den-u', denURoutes);


app.get('/', async (req, res) => {
    res.send("Hello from DEN-U 2.0");
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT || 9002, ()  => console.log(`Server Started on port http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error.message)
    }
}


startServer()