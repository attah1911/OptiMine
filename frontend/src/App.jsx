import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/auth/Login";
import VerifyCode from "./pages/auth/VerifyCode";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import MiningDashboard from "./pages/mining/MiningDashboard";
import Approvement from "./pages/mining/Approvement";
import WeeklyPlanMining from "./pages/mining/WeeklyPlanMining";
import EditDataMining from "./pages/mining/EditDataMining";
import ManageUser from "./pages/mining/ManageUser";

import ShippingDashboard from "./pages/shipping/ShippingDashboard";
import WeeklyPlanShipping from "./pages/shipping/WeeklyPlanShipping";
import RoutePerformance from "./pages/shipping/RoutePerformance";
import EditDataShipping from "./pages/shipping/EditDataShipping";

import ProtectedRoute from "./components/Routes/ProtectedRoute";
import ChatBot from "./components/Features/ChatBot/ChatBot";

import MapView from "./pages/map/MapView";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={`/dashboard/${user?.role}`} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Mining Planner Routes */}
        <Route
          path="/dashboard/mining_planner"
          element={
            <ProtectedRoute allowedRoles={["mining_planner"]}>
              <MiningDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mining_planner/approvement"
          element={
            <ProtectedRoute allowedRoles={["mining_planner"]}>
              <Approvement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mining_planner/weekly-plan"
          element={
            <ProtectedRoute allowedRoles={["mining_planner"]}>
              <WeeklyPlanMining />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mining_planner/edit-data"
          element={
            <ProtectedRoute allowedRoles={["mining_planner"]}>
              <EditDataMining />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mining_planner/map"
          element={
            <ProtectedRoute allowedRoles={["mining_planner"]}>
              <MapView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mining_planner/manage-user"
          element={
            <ProtectedRoute allowedRoles={["mining_planner"]}>
              <ManageUser />
            </ProtectedRoute>
          }
        />

        {/* Shipping Planner Routes */}
        <Route
          path="/dashboard/shipping_planner"
          element={
            <ProtectedRoute allowedRoles={["shipping_planner"]}>
              <ShippingDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/shipping_planner/weekly-plan"
          element={
            <ProtectedRoute allowedRoles={["shipping_planner"]}>
              <WeeklyPlanShipping />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/shipping_planner/route-performance"
          element={
            <ProtectedRoute allowedRoles={["shipping_planner"]}>
              <RoutePerformance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/shipping_planner/edit-data"
          element={
            <ProtectedRoute allowedRoles={["shipping_planner"]}>
              <EditDataShipping />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/shipping_planner/map"
          element={
            <ProtectedRoute allowedRoles={["shipping_planner"]}>
              <MapView />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={`/dashboard/${user?.role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isAuthenticated && <ChatBot />}
    </Router>
  );
}

export default App;
