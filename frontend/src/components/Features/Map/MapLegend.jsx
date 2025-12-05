const MapLegend = () => {
  const legendItems = [
    { color: "bg-green-500", label: "Baik" },
    { color: "bg-orange-500", label: "Sedang" },
    { color: "bg-red-500", label: "Buruk" },
    { color: "bg-gray-500", label: "Ditutup" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h4 className="font-semibold mb-3">Legenda Kondisi Jalan</h4>
      <div className="flex flex-wrap gap-4">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-8 h-1 ${item.color}`}></div>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
