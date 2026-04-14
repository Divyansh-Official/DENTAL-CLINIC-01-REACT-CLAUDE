import "dotenv/config";
import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointments.js";
import { startScheduler } from "./services/scheduler.js";

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use("/api/appointments", appointmentRoutes);

// Health check
app.get("/health", (_, res) => res.json({ status: "ok", time: new Date() }));

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🦷 WhiteDental API running on http://localhost:${PORT}`);
  startScheduler();
});
