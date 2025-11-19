import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { GiMining } from "react-icons/gi";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import { getInitials, formatDate, hasRole } from "../utils/helpers";
import { USER_ROLES } from "../utils/constants";
import toast from "react-hot-toast";
import Logo from "./common/Logo";

const DashboardLayout = ({ children, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout berhasil");
    navigate("/login");
  };

  const getRoleLabel = (role) => {
    if (role === USER_ROLES.MINING_PLANNER) return "Mining Planner";
    if (role === USER_ROLES.SHIPPING_PLANNER) return "Shipping Planner";
    return "User";
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: HiOutlineHome,
      path: `/dashboard/${user?.role}`,
    },
    {
      name: "Perencanaan",
      icon: HiOutlineChartBar,
      path: `/dashboard/${user?.role}/planning`,
    },
    {
      name: "Pengaturan",
      icon: HiOutlineCog,
      path: `/dashboard/${user?.role}/settings`,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="relative flex items-center justify-between p-6 border-b border-sage-200">
          <Logo containerClasses="w-10 h-14" size="w-32 h-16" />

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-sage-600 hover:text-sage-800"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-sage-200 bg-sage-50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              {getInitials(user?.username || user?.email || "User")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sage-800 truncate">
                {user?.username}
              </p>
              <p className="text-xs text-sage-600">
                {getRoleLabel(user?.role)}
              </p>
            </div>
          </div>
          {user?.last_login && (
            <p className="text-xs text-sage-500 mt-2">
              Last login: {formatDate(user.last_login)}
            </p>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 border-b border-sage-200 bg-sage-50">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-sage-700 hover:bg-sage-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sage-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <HiOutlineLogout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex fixed left-64 top-1/2 -translate-y-1/2 z-50 items-center justify-center w-10 h-16 bg-white text-sage-600 hover:text-sage-800 hover:bg-sage-50 rounded-r-lg shadow-lg border-l border-sage-200 transition-all duration-300 ease-in-out"
          style={{ left: sidebarCollapsed ? "0px" : "256px" }}
          title={sidebarCollapsed ? "Tampilkan sidebar" : "Sembunyikan sidebar"}
        >
          <HiOutlineChevronLeft
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-0" : "lg:ml-64"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-sage-200 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-sage-600 hover:text-sage-800"
            >
              <HiOutlineMenu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-sage-800">Mining DS</h1>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-sage-800">{title}</h2>
          </div>
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="hidden lg:fixed lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:z-50 lg:flex items-center justify-center w-10 h-16 bg-white text-sage-600 hover:text-sage-800 hover:bg-sage-50 rounded-r-lg shadow-lg border-r border-sage-200 transition-all duration-300 ease-in-out"
          title="Tampilkan sidebar"
        >
          <HiOutlineChevronLeft className="w-5 h-5 rotate-180" />
        </button>
      )}
    </div>
  );
};

export default DashboardLayout;
