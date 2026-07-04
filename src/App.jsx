import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Categories from "./pages/Categories/Categories";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />}/>

        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
}