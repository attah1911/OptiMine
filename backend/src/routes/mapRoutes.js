/**
 * Map Routes
 */

import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getMapData,
  getRegions,
  getRoutes,
  refreshConditions,
} from "../controllers/mapController.js";

const router = express.Router();

// All map routes require authentication
router.use(authenticateToken);

// GET /api/map/data - Complete map data
router.get("/data", getMapData);

// GET /api/map/regions - Regions only
router.get("/regions", getRegions);

// GET /api/map/routes - Routes only
router.get("/routes", getRoutes);

// POST /api/map/refresh - Trigger ML API refresh (future)
router.post("/refresh", refreshConditions);

export default router; // ← Pakai ini
