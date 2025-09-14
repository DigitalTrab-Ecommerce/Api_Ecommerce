import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import emailRoutes from "./src/routes/emailRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/email", emailRoutes);

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));