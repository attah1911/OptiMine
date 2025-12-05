/**
 * Dummy Data Generator
 * Generate realistic dummy data untuk development
 */

/**
 * Generate random weighted condition (lebih banyak good/moderate)
 */
export const generateRandomCondition = () => {
  const rand = Math.random();
  if (rand < 0.5) return "good";
  if (rand < 0.85) return "moderate";
  return "poor";
};

/**
 * Generate traffic level berdasarkan jam operasional
 */
export const generateTrafficLevel = () => {
  const hour = new Date().getHours();
  const isRushHour = (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18);
  const baseTraffic = isRushHour ? 60 : 20;
  return Math.min(100, baseTraffic + Math.floor(Math.random() * 30));
};

/**
 * Generate weather scenario
 */
export const generateWeatherScenario = () => {
  const scenarios = [
    { impact: 10, description: "Cerah" },
    { impact: 30, description: "Berawan" },
    { impact: 60, description: "Hujan ringan" },
    { impact: 85, description: "Hujan lebat" },
  ];
  return scenarios[Math.floor(Math.random() * scenarios.length)];
};

/**
 * Calculate capacity based on condition & weather
 */
export const calculateCapacity = (maxCapacity, condition, weatherImpact) => {
  const conditionMultiplier = {
    good: 1.0,
    moderate: 0.75,
    poor: 0.4,
    closed: 0,
  }[condition];

  const weatherPenalty = 1 - weatherImpact / 200;
  return Math.floor(maxCapacity * conditionMultiplier * weatherPenalty);
};

/**
 * Generate dummy route conditions untuk 1 route
 */
export const generateRouteCondition = (route) => {
  const condition = generateRandomCondition();
  const weather = generateWeatherScenario();
  const trafficLevel = generateTrafficLevel();
  const capacity = calculateCapacity(
    route.max_capacity_ton_per_day,
    condition,
    weather.impact
  );

  return {
    route_id: route.id,
    route_name: route.name,
    condition,
    traffic_level: trafficLevel,
    weather_impact: weather.impact,
    weather_description: weather.description,
    current_capacity_ton_per_day: capacity,
    max_capacity_ton_per_day: route.max_capacity_ton_per_day,
    data_source: "DUMMY_GENERATOR",
    recorded_at: new Date().toISOString(),
  };
};

/**
 * Generate dummy region capacity berdasarkan tipe
 */
export const generateRegionCapacity = (region) => {
  const capacityByType = {
    warehouse: () => ({
      max_capacity_ton: 50000,
      current_tonnage: Math.floor(Math.random() * 50000),
      operational_status: "OPERATIONAL",
    }),
    port: () => ({
      max_capacity_ton: 100000,
      current_tonnage: Math.floor(Math.random() * 80000),
      operational_status: Math.random() > 0.2 ? "OPERATIONAL" : "LIMITED",
    }),
    maintenance: () => ({
      available_trucks: Math.floor(Math.random() * 20) + 5,
      available_excavators: Math.floor(Math.random() * 10) + 2,
      operational_status: "OPERATIONAL",
    }),
    main_road_access: () => ({
      operational_status: Math.random() > 0.1 ? "OPERATIONAL" : "LIMITED",
    }),
    mining_site: () => ({
      current_tonnage: Math.floor(Math.random() * 20000) + 5000,
      available_trucks: Math.floor(Math.random() * 30) + 10,
      available_excavators: Math.floor(Math.random() * 15) + 5,
      operational_status: "OPERATIONAL",
    }),
  };

  const typeData = capacityByType[region.region_type]();
  const baseCapacity = {
    region_id: region.id,
    region_name: region.name,
    region_type: region.region_type,
    recorded_at: new Date().toISOString(),
  };

  // Calculate available capacity jika ada
  if (typeData.max_capacity_ton && typeData.current_tonnage) {
    typeData.available_capacity_ton =
      typeData.max_capacity_ton - typeData.current_tonnage;
  }

  return { ...baseCapacity, ...typeData };
};
