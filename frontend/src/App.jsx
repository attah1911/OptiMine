import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import VerifyCode from "./pages/VerifyCode";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MiningDashboard from "./pages/MiningDashboard";
import ShippingDashboard from "./pages/ShippingDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Protected routes */}
        <Route
          path="/dashboard/mining_planner"
          element={
            <ProtectedRoute allowedRoles={["mining_planner"]}>
              <MiningDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/shipping_planner"
          element={
            <ProtectedRoute allowedRoles={["shipping_planner"]}>
              <ShippingDashboard />
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
    </Router>
  );
}

export default App;
