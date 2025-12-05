import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import Sidebar from "./DashboardLayout/Sidebar";
import Header from "./DashboardLayout/Header";
import MobileTopBar from "./DashboardLayout/MobileTopBar";

const DashboardLayout = ({ children, title, lastUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout berhasil");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        sidebarOpen={sidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-0" : "lg:ml-64"
        }`}
      >
        {/* Mobile Top Bar */}
        <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Header */}
        <Header title={title} lastUpdate={lastUpdate} />

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
