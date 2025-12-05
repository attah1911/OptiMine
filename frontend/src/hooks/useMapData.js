import { useEffect, useState } from "react";
import api from "../services/api";

export const useMapData = () => {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/map/data");
        setMapData(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching map data:", err);
        setError("Gagal memuat data peta. Silakan refresh halaman.");
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
    const interval = setInterval(fetchMapData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { mapData, loading, error };
};
