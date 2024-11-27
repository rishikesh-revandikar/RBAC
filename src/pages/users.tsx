import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { UserService } from "@/services/userService";
import { RoleService } from "@/services/rolesService";
import { User, Role } from "@/types";
import { Loader } from "@/components/custom/loader";

// Validation Schema
const userFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    role: z.string().min(1, { message: "Role is required." }),
    status: z.enum(["active", "inactive"]),
});

export function Users() {
    // State Management
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filtering States
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [availableRoles, setAvailableRoles] = useState<string[]>(["All"]);

    // Edit and Delete States
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Fetch Users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const [fetchedUsers, fetchedRoles] = await Promise.all([
                UserService.getAll(),
                RoleService.getAll(),
            ]);
            setUsers(fetchedUsers);
            setAvailableRoles([
                "All",
                ...fetchedRoles.map((role: Role) => role.name),
            ]);
            setError(null);
        } catch (err) {
            setError("Failed to fetch users");
            toast({
                title: "Error",
                description: "Unable to fetch users",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Filter Users
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterRole === "All" || user.role === filterRole) &&
            (filterStatus === "All" || user.status === filterStatus)
    );

    // User Form
    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            status: "active",
        },
    });

    // Create User Handler
    const handleCreateUser = async (values: z.infer<typeof userFormSchema>) => {
        try {
            const newUser = await UserService.create(values);
            setUsers((prev) => [...prev, newUser]);
            if (!availableRoles.includes(values.role)) {
                setAvailableRoles((prev) => [...prev, values.role]);
            }
            toast({
                title: "Success",
                description: "User created successfully",
            });
            form.reset();
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to create user",
                variant: "destructive",
            });
        }
    };

    // Update User Handler
    const handleUpdateUser = async (values: z.infer<typeof userFormSchema>) => {
        if (!selectedUser) return;

        try {
            const updatedUser = await UserService.update(
                selectedUser.id,
                values
            );
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === selectedUser.id ? updatedUser : user
                )
            );
            if (!availableRoles.includes(values.role)) {
                setAvailableRoles((prev) => [...prev, values.role]);
            }
            toast({
                title: "Success",
                description: "User updated successfully",
            });
            setSelectedUser(null);
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to update user",
                variant: "destructive",
            });
        }
    };

    // Delete User Handler
    const handleDeleteUser = async (id: string) => {
        try {
            await UserService.delete(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
            toast({
                title: "Success",
                description: "User deleted successfully",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete user",
                variant: "destructive",
            });
        }
    };

    // Render User Form
    const renderUserForm = () => (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    selectedUser ? handleUpdateUser : handleCreateUser
                )}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {availableRoles.map(
                                        (role) =>
                                            role !== "All" && (
                                                <SelectItem
                                                    key={role}
                                                    value={role}
                                                >
                                                    {role}
                                                </SelectItem>
                                            )
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        Inactive
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {selectedUser ? "Update User" : "Create User"}
                </Button>
            </form>
        </Form>
    );

    // Loading State
    if (loading)
        return (
            <div className="h-full flex items-center justify-center">
                <Loader variant="fullscreen" size="lg" />
            </div>
        );

    // Error State
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">User Management</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                form.reset();
                                setSelectedUser(null);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {selectedUser ? "Edit User" : "Add New User"}
                            </DialogTitle>
                        </DialogHeader>
                        {renderUserForm()}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search users..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Role" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                                {role === "All" ? "All Roles" : role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* User Table */}
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.status === "active"
                                                    ? "default"
                                                    : "destructive"
                                            }
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedUser(
                                                                user
                                                            );
                                                            form.reset({
                                                                name: user.name,
                                                                email: user.email,
                                                                role: user.role,
                                                                status: user.status,
                                                            });
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit User
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    {renderUserForm()}
                                                </DialogContent>
                                            </Dialog>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will
                                                            permanently delete
                                                            the user.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
