// /**
//  * ML API Client
//  * Handle communication dengan ML API
//  */

// import axios from "axios";
// import logger from "../utils/logger.js";

// const ML_API_BASE_URL = process.env.ML_API_URL || "https://ml-api.example.com";
// const ML_API_TIMEOUT = 10000; // 10 seconds

// /**
//  * Fetch road conditions dari ML API
//  */
// export const fetchRoadConditions = async (routes) => {
//   try {
//     const response = await axios.post(
//       `${ML_API_BASE_URL}/predict/road-conditions`,
//       {
//         routes: routes.map((r) => ({
//           id: r.id,
//           distance_km: r.distance_km,
//           from_lat: r.from_latitude,
//           from_lng: r.from_longitude,
//           to_lat: r.to_latitude,
//           to_lng: r.to_longitude,
//         })),
//       },
//       {
//         timeout: ML_API_TIMEOUT,
//         headers: {
//           Authorization: `Bearer ${process.env.ML_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     logger.error("ML API fetch error:", error.message);
//     throw error;
//   }
// };

// /**
//  * Health check ML API
//  */
// export const checkHealth = async () => {
//   try {
//     const response = await axios.get(`${ML_API_BASE_URL}/health`, {
//       timeout: 5000,
//     });
//     return response.status === 200;
//   } catch (error) {
//     return false;
//   }
// };
