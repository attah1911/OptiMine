/**
 * Map Data Transformer
 * Transform data antar format (ML API → Internal, dll)
 */

/**
 * Transform ML API response ke internal format
 * Nanti adjust sesuai format real ML API
 */
export const transformMLAPIResponse = (mlApiData, route) => {
  // Detect ML API version/format
  if (mlApiData.prediction) {
    return transformMLAPIv2(mlApiData, route);
  }

  // Default format (v1)
  return transformMLAPIv1(mlApiData, route);
};

/**
 * Transform ML API v1 format
 */
export const transformMLAPIv1 = (data, route) => {
  return {
    route_id: route.id,
    condition: data.status || "moderate",
    traffic_level: Math.round((data.traffic || 0.5) * 100),
    weather_impact: Math.round((data.weather_severity || 0.3) * 100),
    current_capacity_ton_per_day:
      data.capacity_estimate || route.max_capacity_ton_per_day * 0.8,
    data_source: "ML_API_V1",
    external_api_response: data,
    recorded_at: new Date().toISOString(),
  };
};

/**
 * Transform ML API v2 format (future-proof)
 */
export const transformMLAPIv2 = (data, route) => {
  const pred = data.prediction;
  const roadQuality = pred.conditions?.road_quality || 70;

  return {
    route_id: route.id,
    condition: mapRoadQualityToCondition(roadQuality),
    traffic_level: pred.conditions?.congestion_index || 50,
    weather_impact: extractWeatherImpact(
      pred.conditions?.environmental_factors
    ),
    current_capacity_ton_per_day:
      pred.estimated_capacity || route.max_capacity_ton_per_day * 0.8,
    data_source: "ML_API_V2",
    external_api_response: data,
    recorded_at: new Date().toISOString(),
  };
};

/**
 * Helper: Map road quality score to condition enum
 */
export const mapRoadQualityToCondition = (quality) => {
  if (quality >= 80) return "good";
  if (quality >= 50) return "moderate";
  if (quality >= 20) return "poor";
  return "closed";
};

/**
 * Helper: Extract weather impact from nested array
 */
export const extractWeatherImpact = (envFactors = []) => {
  const weatherFactor = envFactors.find((f) => f.type === "weather");
  return weatherFactor?.impact || 0;
};

/**
 * Enrich route conditions dengan route info
 */
export const enrichConditionsWithRouteInfo = (conditions, routes) => {
  return conditions.map((condition) => {
    const route = routes.find((r) => r.id === condition.route_id);
    return {
      ...condition,
      route_name: route?.name,
      distance_km: route?.distance_km,
      from_region: route?.from_region_name,
      to_region: route?.to_region_name,
    };
  });
};
