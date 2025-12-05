import { getConditionColor } from "../../../utils/mapUtils";

const RouteDetailsPanel = ({ selectedRoute, onClose, panelRef }) => {
  if (!selectedRoute) return null;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}j ${mins}m`;
  };

  return (
    <div
      ref={panelRef}
      className="bg-white rounded-lg shadow-lg p-6 scroll-mt-4"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {selectedRoute.name}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DetailItem label="Jarak" value={`${selectedRoute.distance_km} km`} />
        <DetailItem
          label="Estimasi Waktu"
          value={formatTime(selectedRoute.estimated_travel_time_minutes)}
        />
        <DetailItem
          label="Kondisi Jalan"
          value={selectedRoute.condition?.condition || "N/A"}
          valueClassName={getConditionColor(selectedRoute.condition?.condition)}
          capitalize
        />
        <DetailItem
          label="Traffic Level"
          value={`${selectedRoute.condition?.traffic_level || 0}%`}
        />
        <DetailItem
          label="Kapasitas Maksimal"
          value={`${selectedRoute.max_capacity_ton_per_day?.toLocaleString()} ton/hari`}
        />
        <DetailItem
          label="Kapasitas Saat Ini"
          value={`${selectedRoute.condition?.current_capacity_ton_per_day?.toLocaleString()} ton/hari`}
        />
        <DetailItem
          label="Cuaca"
          value={selectedRoute.condition?.weather_description}
        />
        <DetailItem
          label="Weather Impact"
          value={`${selectedRoute.condition?.weather_impact}%`}
        />
      </div>
    </div>
  );
};

const DetailItem = ({
  label,
  value,
  valueClassName = "",
  capitalize = false,
}) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-lg font-semibold ${valueClassName}`}>
      {capitalize ? value.charAt(0).toUpperCase() + value.slice(1) : value}
    </p>
  </div>
);

export default RouteDetailsPanel;
