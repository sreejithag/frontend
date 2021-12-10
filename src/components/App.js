import DataTable from "./DataTable";
import Login from "./Login";
import Signup from "./Signup";
import EditProfile from "./EditProfile";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";
import ProtectRoute from "./ProtectRoute";
import GoogleLogin from "./GoogleLogin";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/data"
            element={
              <ProtectRoute>
                <DataTable />
              </ProtectRoute>
            }
          />
          <Route
            path="/editProfile"
            element={
              <ProtectRoute>
                <EditProfile />
              </ProtectRoute>
            }
          />
          <Route path="/googleLogin/:token" element={<GoogleLogin />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
