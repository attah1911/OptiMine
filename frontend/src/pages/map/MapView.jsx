import DashboardLayout from "../../components/Layouts/DashboardLayout";
import OperationalMap from "../../components/Features/Map/OperationalMap";

const MapView = () => {
  return (
    <DashboardLayout title="Map - Operasional">
      <div className="space-y-6">
        {/* Map Component */}
        <OperationalMap />
      </div>
    </DashboardLayout>
  );
};

export default MapView;
