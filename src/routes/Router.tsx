import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import Layout from "@/layout";
import { Dashboard } from "@/pages/dashboard";
import { Users } from "@/pages/users";
import { Roles } from "@/pages/roles";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/roles" element={<Roles />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
