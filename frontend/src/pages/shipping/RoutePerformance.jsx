import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useLastUpdate } from "../../hooks/useLastUpdate";

const RoutePerformance = () => {
  const { lastUpdate } = useLastUpdate();

  return (
    <DashboardLayout
      title="Route Performance - Shipping"
      lastUpdate={lastUpdate}
    >
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Route Performance - Shipping
        </h3>
        <p className="text-gray-600">
          Route performance content untuk Shipping...
        </p>
      </div>
    </DashboardLayout>
  );
};

export default RoutePerformance;
