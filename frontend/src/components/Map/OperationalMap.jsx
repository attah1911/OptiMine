import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons untuk berbagai tipe region
const createCustomIcon = (type) => {
  const colors = {
    mining_site: "#ef4444", // Red
    warehouse: "#3b82f6", // Blue
    port: "#10b981", // Green
    maintenance: "#f59e0b", // Orange
    main_road_access: "#8b5cf6", // Purple
  };

  return new L.DivIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${colors[type] || "#667761"};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 16px;
      ">
        ${
          type === "mining_site"
            ? "⛏️"
            : type === "warehouse"
            ? "📦"
            : type === "port"
            ? "🚢"
            : type === "maintenance"
            ? "🔧"
            : "🛣️"
        }
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

// Warna polyline berdasarkan kondisi jalan
const getRouteColor = (condition) => {
  const colors = {
    good: "#10b981", // Green
    moderate: "#f59e0b", // Orange
    poor: "#ef4444", // Red
    closed: "#6b7280", // Gray
  };
  return colors[condition] || "#667761";
};

const OperationalMap = () => {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const detailPanelRef = useRef(null);

  // Center map di Kalimantan Tengah
  const center = [-1.68, 113.38];
  const zoom = 7;

  const kalimantanBounds = [
    [4.5, 108.0], // Northwest (Kalimantan Utara bagian atas)
    [-5.0, 120.0], // Southeast (Kalimantan Selatan bagian bawah)
  ];

  // Fetch map data dari backend
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/map/data", {
          headers: { Authorization: `Bearer ${token}` },
        });

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

    // Auto-refresh every 30 seconds (simulasi real-time update)
    const interval = setInterval(fetchMapData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedRoute && detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedRoute]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-sage-700">Memuat peta operasional...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!mapData) return null;

  const { regions, routes, route_conditions } = mapData;

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ height: "600px" }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={6.5}
          maxZoom={12}
          maxBounds={kalimantanBounds}
          maxBoundsViscosity={1.0}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render Routes (Polylines) */}
          {routes.map((route) => {
            const condition = route_conditions.find(
              (c) => c.route_id === route.id
            );
            const positions = [
              [route.from_latitude, route.from_longitude],
              [route.to_latitude, route.to_longitude],
            ];

            return (
              <Polyline
                key={route.id}
                positions={positions}
                color={getRouteColor(condition?.condition)}
                weight={4}
                opacity={0.7}
                eventHandlers={{
                  click: () => setSelectedRoute({ ...route, condition }),
                }}
              >
                <Tooltip>
                  <div className="text-xs">
                    <strong>{route.name}</strong>
                    <br />
                    Jarak: {route.distance_km} km
                    <br />
                    Kondisi:{" "}
                    <span className="font-semibold capitalize">
                      {condition?.condition}
                    </span>
                  </div>
                </Tooltip>
              </Polyline>
            );
          })}

          {/* Render Regions (Markers) */}
          {regions.map((region) => (
            <Marker
              key={region.id}
              position={[region.latitude, region.longitude]}
              icon={createCustomIcon(region.region_type)}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-base mb-2">{region.name}</h3>
                  <p className="text-gray-600 mb-2">{region.description}</p>
                  <div className="text-xs space-y-1">
                    <p>
                      <strong>Tipe:</strong>{" "}
                      <span className="capitalize">
                        {region.region_type.replace(/_/g, " ")}
                      </span>
                    </p>
                    <p>
                      <strong>Koordinat:</strong> {region.latitude},{" "}
                      {region.longitude}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Route Details Panel */}
      {selectedRoute && (
        <div
          ref={detailPanelRef}
          className="bg-white rounded-lg shadow-lg p-6 scroll-mt-4"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedRoute.name}
            </h3>
            <button
              onClick={() => setSelectedRoute(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Jarak</p>
              <p className="text-lg font-semibold">
                {selectedRoute.distance_km} km
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimasi Waktu</p>
              <p className="text-lg font-semibold">
                {Math.floor(selectedRoute.estimated_travel_time_minutes / 60)}j{" "}
                {selectedRoute.estimated_travel_time_minutes % 60}m
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kondisi Jalan</p>
              <p
                className={`text-lg font-semibold capitalize ${
                  selectedRoute.condition?.condition === "good"
                    ? "text-green-600"
                    : selectedRoute.condition?.condition === "moderate"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {selectedRoute.condition?.condition || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Traffic Level</p>
              <p className="text-lg font-semibold">
                {selectedRoute.condition?.traffic_level || 0}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kapasitas Maksimal</p>
              <p className="text-lg font-semibold">
                {selectedRoute.max_capacity_ton_per_day?.toLocaleString()}{" "}
                ton/hari
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kapasitas Saat Ini</p>
              <p className="text-lg font-semibold">
                {selectedRoute.condition?.current_capacity_ton_per_day?.toLocaleString()}{" "}
                ton/hari
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cuaca</p>
              <p className="text-lg font-semibold">
                {selectedRoute.condition?.weather_description}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weather Impact</p>
              <p className="text-lg font-semibold">
                {selectedRoute.condition?.weather_impact}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold mb-3">Legenda Kondisi Jalan</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-green-500"></div>
            <span className="text-sm">Baik</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-orange-500"></div>
            <span className="text-sm">Sedang</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-red-500"></div>
            <span className="text-sm">Buruk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gray-500"></div>
            <span className="text-sm">Ditutup</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalMap;
