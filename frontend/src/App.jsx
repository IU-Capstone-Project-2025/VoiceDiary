import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useState } from "react";
import OnboardingPage from "./pages/OnboardingPage";
import AuthPage from "./pages/AuthPage";
import ResultPage from "./pages/ResultPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./app/ProtectedRoute";
import InitializeAuth from "./features/auth/InitializeAuth";

export default function App() {
  const [globalError, setGlobalError] = useState(null);

  return (
    <Provider store={store}>
      <Router>
        <InitializeAuth />
        <div className="app">
          <main className="app-content">
            {globalError && (
              <div className="global-error" role="alert">
                {globalError}
                <button onClick={() => setGlobalError(null)} aria-label="Close">
                  ✕
                </button>
              </div>
            )}
            <Routes>
             
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/settings" element={<SettingsPage />} />
                <Route path="/result" element={<ResultPage />} />
              </Route>

              <Route path="*" element={<OnboardingPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}