import { Marker, Popup } from "react-leaflet";
import { createCustomIcon } from "../../../utils/mapUtils";

const MapMarkers = ({ regions }) => {
  return (
    <>
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
    </>
  );
};

export default MapMarkers;
