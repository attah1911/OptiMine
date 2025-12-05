import { useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useLastUpdate } from "../../hooks/useLastUpdate";

const Approvement = () => {
  const { lastUpdate } = useLastUpdate();

  return (
    <DashboardLayout title="Approvement - Mining" lastUpdate={lastUpdate}>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Approvement - Mining</h3>
        <p className="text-gray-600">Approvement content untuk Mining...</p>
      </div>
    </DashboardLayout>
  );
};

export default Approvement;
