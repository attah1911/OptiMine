import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineLogout,
} from "react-icons/hi";
import Logo from "../common/Logo";
import { getInitials, formatDate } from "../../utils/helpers";
import { getRoleLabel } from "../../utils/roleHelpers";
import { useMenuItems } from "../../hooks/useMenuItems";

const Sidebar = ({
  user,
  sidebarOpen,
  sidebarCollapsed,
  onClose,
  onToggleCollapse,
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = useMenuItems(user?.role);

  const isActive = (path) => location.pathname === path;

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
      >
        <div className="relative flex items-center justify-between p-6 border-b border-sage-200">
          <Logo containerClasses="w-10 h-14" size="w-32 h-16" />
          <button
            onClick={onClose}
            className="lg:hidden text-sage-600 hover:text-sage-800"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

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

        <nav className="p-4 border-b border-sage-200 bg-sage-50">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sage-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <HiOutlineLogout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        <button
          onClick={onToggleCollapse}
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

      {sidebarCollapsed && (
        <button
          onClick={onToggleCollapse}
          className="hidden lg:fixed lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:z-50 lg:flex items-center justify-center w-10 h-16 bg-white text-sage-600 hover:text-sage-800 hover:bg-sage-50 rounded-r-lg shadow-lg border-r border-sage-200 transition-all duration-300 ease-in-out"
          title="Tampilkan sidebar"
        >
          <HiOutlineChevronLeft className="w-5 h-5 rotate-180" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
