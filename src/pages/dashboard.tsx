import  { useState, useEffect } from "react";
import {
    Users,
    ShieldCheck,
    Activity,
    Server,
    Lock,
    BarChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { UserService } from "@/services/userService";
import { RoleService } from "@/services/rolesService";
import { User, Role } from "@/types";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/custom/loader";

export function Dashboard() {
    //state for navigation
    const navigate = useNavigate();

    // State for dashboard data
    const [userCount, setUserCount] = useState(0);
    const [roleCount, setRoleCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch dashboard data
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch users and roles concurrently
            const [fetchedUsers, fetchedRoles] = await Promise.all([
                UserService.getAll(),
                RoleService.getAll(),
            ]);

            setUsers(fetchedUsers);
            setRoles(fetchedRoles);

            // Calculate counts
            setUserCount(fetchedUsers.length);
            setRoleCount(fetchedRoles.length);

            setError(null);
        } catch (err) {
            setError("Failed to fetch dashboard data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Prepare role distribution data for chart
    const roleDistributionData = roles.map((role) => ({
        role: role.name,
        count: users.filter((user) => user.role === role.name).length,
    }));

    // Recent activity based on users
    const recentActivityData = users
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, 3)
        .map((user) => ({
            action: "User Added",
            details: `${user.name} (${user.role})`,
            time: new Date(user.createdAt).toLocaleString(),
        }));

    // User stats
    const userStats = [
        {
            name: "Total Users",
            value: userCount,
            icon: Users,
            color: "text-blue-500",
        },
        {
            name: "Active Roles",
            value: roleCount,
            icon: ShieldCheck,
            color: "text-green-500",
        },
        {
            name: "Permissions",
            value: roles.reduce(
                (total, role) => total + role.permissions.length,
                0
            ),
            icon: Lock,
            color: "text-purple-500",
        },
    ];

    if (loading)
        return (
            <div className="h-full flex items-center justify-center">
                <Loader variant="fullscreen" size="lg" />
            </div>
        );
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button variant="outline">
                    <Activity className="mr-2 h-4 w-4" />
                    Refresh Data
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userStats.map((stat) => (
                    <Card key={stat.name}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.name}
                            </CardTitle>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Dashboard Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role Distribution Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BarChart className="mr-2 h-5 w-5 text-primary" />
                            Role Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={roleDistributionData}>
                                <XAxis dataKey="role" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Server className="mr-2 h-5 w-5 text-primary" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivityData.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center border-b pb-3 last:border-b-0"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {activity.action}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {activity.details}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4">
                        <Button onClick={() => navigate("/users")}>
                            <Users className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/roles")}
                        >
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Create Role
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/roles")}
                        >
                            <Lock className="mr-2 h-4 w-4" />
                            Manage Permissions
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
