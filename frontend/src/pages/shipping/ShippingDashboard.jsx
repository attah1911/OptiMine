import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { authService } from "../../services/authService";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import StatCard from "../../components/Dashboard/StatCard";
import { shippingStats } from "../../utils/dashboardData";
import { getErrorMessage } from "../../utils/helpers";
import { useLastUpdate } from "../../hooks/useLastUpdate";
import toast from "react-hot-toast";

const ShippingDashboard = () => {
  const dispatch = useDispatch();
  const { lastUpdate, updateLastUpdate } = useLastUpdate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response.success) {
          dispatch(setUser(response.data));
          updateLastUpdate();
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    };

    fetchCurrentUser();
  }, [dispatch, updateLastUpdate]);

  return (
    <DashboardLayout title="Shipping Planner Dashboard" lastUpdate={lastUpdate}>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shippingStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </section>
    </DashboardLayout>
  );
};

export default ShippingDashboard;
