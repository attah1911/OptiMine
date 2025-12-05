import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useLastUpdate } from "../../hooks/useLastUpdate";

const ManageUser = () => {
  const { lastUpdate } = useLastUpdate();

  return (
    <DashboardLayout title="Manage User - Mining" lastUpdate={lastUpdate}>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Manage User - Mining</h3>
        <p className="text-gray-600">Manage user content untuk Mining...</p>
      </div>
    </DashboardLayout>
  );
};

export default ManageUser;
