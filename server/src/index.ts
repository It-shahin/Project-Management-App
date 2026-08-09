import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Route imports
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

// configurations
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send("This is home route");
});
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes)

// server
const port = process.env.PORT || process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
