import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useLastUpdate } from "../../hooks/useLastUpdate";

const EditDataMining = () => {
  const { lastUpdate } = useLastUpdate();

  return (
    <DashboardLayout title="Edit Data - Mining" lastUpdate={lastUpdate}>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Mining Data</h3>
        <p className="text-gray-600">Edit data content untuk Mining...</p>
      </div>
    </DashboardLayout>
  );
};

export default EditDataMining;
