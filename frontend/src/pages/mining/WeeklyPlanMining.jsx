import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useLastUpdate } from "../../hooks/useLastUpdate";

const WeeklyPlanMining = () => {
  const { lastUpdate } = useLastUpdate();

  return (
    <DashboardLayout title="Weekly Plan - Mining" lastUpdate={lastUpdate}>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Planning</h3>
        <p className="text-gray-600">Weekly plan content untuk Mining...</p>
      </div>
    </DashboardLayout>
  );
};

export default WeeklyPlanMining;
