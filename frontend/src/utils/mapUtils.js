import L from "leaflet";

export const createCustomIcon = (type) => {
  const colors = {
    mining_site: "#ef4444",
    warehouse: "#3b82f6",
    port: "#10b981",
    maintenance: "#f59e0b",
    main_road_access: "#8b5cf6",
  };

  const icons = {
    mining_site: "⛏️",
    warehouse: "📦",
    port: "🚢",
    maintenance: "🔧",
    main_road_access: "🛣️",
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
        ${icons[type] || "📍"}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

export const getRouteColor = (condition) => {
  const colors = {
    good: "#10b981",
    moderate: "#f59e0b",
    poor: "#ef4444",
    closed: "#6b7280",
  };
  return colors[condition] || "#667761";
};

export const getConditionColor = (condition) => {
  if (condition === "good") return "text-green-600";
  if (condition === "moderate") return "text-orange-600";
  return "text-red-600";
};
