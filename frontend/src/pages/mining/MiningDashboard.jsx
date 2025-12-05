import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { authService } from "../../services/authService";
import DashboardLayout from "../../components/DashboardLayout";
import StatCard from "../../components/DashboardLayout/StatCard";
import { miningStats } from "../../utils/dashboardData";
import { getErrorMessage } from "../../utils/helpers";
import toast from "react-hot-toast";

const MiningDashboard = () => {
  const dispatch = useDispatch();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response.success) {
          dispatch(setUser(response.data));
          setLastUpdate(new Date());
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return (
    <DashboardLayout title="Mining Planner Dashboard" lastUpdate={lastUpdate}>
      {/* Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {miningStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </section>
    </DashboardLayout>
  );
};

export default MiningDashboard;
