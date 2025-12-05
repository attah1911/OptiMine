/**
 * Map Repository - Database queries only
 * Single responsibility: Talk to database
 */

import pool from "../config/database.js";

/**
 * Get all active regions
 */
export const findAllRegions = async () => {
  const result = await pool.query(`
    SELECT 
      id, name, region_type, description,
      latitude, longitude, is_active
    FROM regions
    WHERE is_active = true
    ORDER BY 
      CASE region_type
        WHEN 'mining_site' THEN 1
        WHEN 'warehouse' THEN 2
        WHEN 'port' THEN 3
        WHEN 'maintenance' THEN 4
        WHEN 'main_road_access' THEN 5
      END
  `);
  return result.rows;
};

/**
 * Get all active routes with region details
 */
export const findAllRoutesWithRegions = async () => {
  const result = await pool.query(`
    SELECT 
      r.id, r.name,
      r.from_region_id, r.to_region_id,
      r.distance_km, r.estimated_travel_time_minutes,
      r.max_capacity_ton_per_day,
      fr.name as from_region_name,
      fr.latitude as from_latitude,
      fr.longitude as from_longitude,
      tr.name as to_region_name,
      tr.latitude as to_latitude,
      tr.longitude as to_longitude
    FROM routes r
    JOIN regions fr ON r.from_region_id = fr.id
    JOIN regions tr ON r.to_region_id = tr.id
    WHERE r.is_active = true
  `);
  return result.rows;
};

/**
 * Save route conditions to database
 */
export const saveRouteConditions = async (conditions) => {
  const values = conditions.map((c) => [
    c.route_id,
    c.condition,
    c.traffic_level,
    c.weather_impact,
    c.current_capacity_ton_per_day,
    c.data_source,
    JSON.stringify(c.external_api_response || {}),
  ]);

  const query = `
    INSERT INTO route_conditions (
      route_id, condition, traffic_level, weather_impact,
      current_capacity_ton_per_day, data_source, external_api_response
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  const promises = values.map((v) => pool.query(query, v));
  await Promise.all(promises);
};

/**
 * Get latest route conditions
 */
export const findLatestRouteConditions = async () => {
  const result = await pool.query(`
    SELECT DISTINCT ON (route_id)
      route_id, condition, traffic_level, weather_impact,
      current_capacity_ton_per_day, data_source, recorded_at
    FROM route_conditions
    ORDER BY route_id, recorded_at DESC
  `);
  return result.rows;
};
