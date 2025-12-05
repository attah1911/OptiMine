import DashboardLayout from "../../components/DashboardLayout";
import OperationalMap from "../../components/map/OperationalMap";

const MapView = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Peta Operasional</h1>
          <p className="text-gray-600 mt-2">
            Visualisasi real-time kondisi jalan, rute distribusi, dan status
            operasional region
          </p>
        </div>

        {/* Map Component */}
        <OperationalMap />

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              📦 North Region (Warehouse)
            </h3>
            <p className="text-sm text-blue-700">
              Gudang penyimpanan batubara sebelum distribusi
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">
              🚢 East Region (Port)
            </h3>
            <p className="text-sm text-green-700">
              Pelabuhan ekspor batubara ke customer
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">
              🔧 South Region (Maintenance)
            </h3>
            <p className="text-sm text-orange-700">
              Fasilitas maintenance kendaraan & equipment
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;
