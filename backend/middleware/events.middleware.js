import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events",eventRoutes);

app.get("/",(req,res)=>{
    res.json({
        message : "CampusConnect API is running",
    })
})