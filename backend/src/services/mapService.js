/**
 * Map Service - Main orchestrator
 * Coordinate between repository, transformer, and data generator
 */

import {
  findAllRegions,
  findAllRoutesWithRegions,
} from "../repositories/mapRepository.js";
import {
  generateRouteCondition,
  generateRegionCapacity,
} from "../utils/dummyDataGenerator.js";
import { transformMLAPIResponse } from "../utils/mapTransformer.js";
import logger from "../utils/logger.js";

/**
 * Get regions dari database
 */
export const getRegions = async () => {
  return await findAllRegions();
};

/**
 * Get routes dari database
 */
export const getRoutes = async () => {
  return await findAllRoutesWithRegions();
};

/**
 * Get complete map data dengan conditions
 * Main endpoint untuk frontend
 */
export const getMapData = async () => {
  try {
    // Fetch data dari database
    const [regions, routes] = await Promise.all([
      findAllRegions(),
      findAllRoutesWithRegions(),
    ]);

    // Generate dummy conditions (nanti ganti dengan ML API)
    const routeConditions = routes.map(generateRouteCondition);
    const regionCapacities = regions.map(generateRegionCapacity);

    return {
      regions,
      routes,
      route_conditions: routeConditions,
      region_capacities: regionCapacities,
      metadata: {
        timestamp: new Date().toISOString(),
        data_source: "DUMMY",
        total_regions: regions.length,
        total_routes: routes.length,
      },
    };
  } catch (error) {
    logger.error("Error in getMapData:", error);
    throw error;
  }
};

/**
 * Refresh conditions dari ML API (future implementation)
 * Panggil function ini dari cron job atau manual trigger
 */
export const refreshConditionsFromMLAPI = async () => {
  // TODO: Implement when ML API ready
  // const mlApiClient = require('./mlApiClient');
  // const routes = await getRoutes();
  // const mlData = await mlApiClient.fetchConditions(routes);
  // const transformed = mlData.map(d => transformer.transformMLAPIResponse(d, route));
  // await mapRepository.saveRouteConditions(transformed);

  throw new Error("ML API integration belum diimplementasi");
};
