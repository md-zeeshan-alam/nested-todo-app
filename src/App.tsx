import { Navigate, Route, Routes } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" Component={SignInForm} />
      <Route path="/dashboard" Component={Dashboard} />
    </Routes>
  );
}

export default App;
