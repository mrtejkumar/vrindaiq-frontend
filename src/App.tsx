import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ScreenerPage from "./pages/ScreenerPage";
import NewsPage from "./pages/NewsPage";
import PortfolioPage from "./pages/PortfolioPage";
import HeatmapPage from "./pages/HeatmapPage";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthStore } from "./features/auth/authStore";
import MainLayout from "./layouts/MainLayout";

function AppContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* Root path: if logged in go to dashboard, else go to login */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Login route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      {/* Register route */}
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Screener */}
      <Route
        path="/screener"
        element={
          <PrivateRoute>
            <MainLayout>
              <ScreenerPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* News */}
      <Route
        path="/news"
        element={
          <PrivateRoute>
            <MainLayout>
              <NewsPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Portfolio */}
      <Route
        path="/portfolio"
        element={
          <PrivateRoute>
            <MainLayout>
              <PortfolioPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Heatmap */}
      <Route
        path="/heatmap"
        element={
          <PrivateRoute>
            <MainLayout>
              <HeatmapPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Fallback: redirect unknown routes to root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
