/**
 * Map Controller - Handle HTTP requests untuk map data
 */

import * as mapService from "../services/mapService.js";
import logger from "../utils/logger.js";

/**
 * GET /api/map/data
 * Get complete map data (regions, routes, conditions)
 */
export const getMapData = async (req, res) => {
  try {
    const data = await mapService.getMapData();

    res.json({
      success: true,
      data,
      message: "Map data berhasil diambil",
    });
  } catch (error) {
    logger.error("Error getting map data:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data map",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * GET /api/map/regions
 * Get regions only
 */
export const getRegions = async (req, res) => {
  try {
    const regions = await mapService.getRegions();

    res.json({
      success: true,
      data: regions,
      message: "Regions berhasil diambil",
    });
  } catch (error) {
    logger.error("Error getting regions:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data regions",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * GET /api/map/routes
 * Get routes only
 */
export const getRoutes = async (req, res) => {
  try {
    const routes = await mapService.getRoutes();

    res.json({
      success: true,
      data: routes,
      message: "Routes berhasil diambil",
    });
  } catch (error) {
    logger.error("Error getting routes:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data routes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * POST /api/map/refresh
 * Trigger refresh conditions dari ML API (future)
 */
export const refreshConditions = async (req, res) => {
  try {
    await mapService.refreshConditionsFromMLAPI();

    res.json({
      success: true,
      message: "Route conditions berhasil di-refresh dari ML API",
    });
  } catch (error) {
    logger.error("Error refreshing conditions:", error);

    // Check kalau error karena ML API belum ready
    if (error.message.includes("belum diimplementasi")) {
      return res.status(501).json({
        success: false,
        message: "ML API integration belum tersedia. Menggunakan dummy data.",
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Gagal refresh conditions dari ML API",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
