import { Polyline, Tooltip } from "react-leaflet";
import { getRouteColor } from "../../../utils/mapUtils";

const MapRoutes = ({ routes, routeConditions, onRouteClick }) => {
  return (
    <>
      {routes.map((route) => {
        const condition = routeConditions.find((c) => c.route_id === route.id);
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
              click: () => onRouteClick({ ...route, condition }),
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
    </>
  );
};

export default MapRoutes;
