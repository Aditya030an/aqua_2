import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDb from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import blogRoutes from "./routes/blogRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

//App config
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

// Health check — deliberately registered before the DB middleware so it still
// answers (and tells you what's misconfigured) when the database is unreachable.
app.get("/", (req, res) => {
    res.json({
        status: "API working",
        db: ["disconnected", "connected", "connecting", "disconnecting"][
            mongooseReadyState()
        ],
        env: {
            MONGO_URI: !!process.env.MONGO_URI,
            JWT_SECRET: !!process.env.JWT_SECRET,
            ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
            EMAIL_USER: !!process.env.EMAIL_USER,
            EMAIL_PASS: !!process.env.EMAIL_PASS,
        },
    });
});

function mongooseReadyState() {
    try {
        return global._mongoose?.conn?.connection?.readyState ?? 0;
    } catch {
        return 0;
    }
}

// On serverless every cold start begins with no database connection, so it has
// to be established per invocation rather than once at boot. connectDb caches
// the connection globally, so warm invocations reuse it instead of reconnecting.
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        console.error("Database connection failed:", error.message);
        res.status(503).json({
            success: false,
            message: "Database unavailable, please try again shortly",
        });
    }
});

//api end points
app.use("/api/user" , userRouter);
app.use("/api/booking" , bookingRouter);
app.use("/api/blogs", blogRoutes);
app.use("/api/product" , productRoutes);
app.use("/api/payment" , orderRouter);
app.use("/api/news" , newsRoutes);

// Surface errors as JSON instead of letting the serverless function crash with
// an opaque FUNCTION_INVOCATION_FAILED.
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

// Only listen locally. On Vercel the exported app is invoked as a serverless
// handler — calling listen() there is what crashes the function.
if (!process.env.VERCEL) {
    const startServer = async () => {
        try {
            await connectDb();
            console.log("MongoDB connected successfully");
        } catch (error) {
            console.warn("MongoDB connection failed. Starting server without database connection.");
        }

        app.listen(port , ()=>{
            console.log("server started on PORT:" + port)
        })
    };

    startServer();
}

export default app;
