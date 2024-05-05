import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginComponent from "./routes/LoginComponent";
import SignupComponent from "./routes/SignupComponent";
import Dashboard from "./routes/Dashboard";
import Jobs from "./routes/Candidates";
import { useCookies } from "react-cookie";

const App: React.FC = () => {
  const [cookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <Router>
        <Routes>
          {cookie.token ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs/:id" element={<Jobs />} />
              <Route path="*" element={<Navigate to="/jobs" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
