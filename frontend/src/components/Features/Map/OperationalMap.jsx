import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useMapData } from "../../../hooks/useMapData";
import MapMarkers from "./MapMarkers";
import MapRoutes from "./MapRoutes";
import RouteDetailsPanel from "./RouteDetailsPanel";
import MapLegend from "./MapLegend";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MAP_CENTER = [-1.68, 113.38];
const MAP_ZOOM = 7;
const KALIMANTAN_BOUNDS = [
  [4.5, 108.0],
  [-5.0, 120.0],
];

const OperationalMap = () => {
  const { mapData, loading, error } = useMapData();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const detailPanelRef = useRef(null);

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
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ height: "600px" }}
      >
        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_ZOOM}
          minZoom={6.5}
          maxZoom={12}
          maxBounds={KALIMANTAN_BOUNDS}
          maxBoundsViscosity={1.0}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapRoutes
            routes={routes}
            routeConditions={route_conditions}
            onRouteClick={setSelectedRoute}
          />
          <MapMarkers regions={regions} />
        </MapContainer>
      </div>

      {selectedRoute && (
        <RouteDetailsPanel
          selectedRoute={selectedRoute}
          onClose={() => setSelectedRoute(null)}
          panelRef={detailPanelRef}
        />
      )}

      <MapLegend />
    </div>
  );
};

export default OperationalMap;
