import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Shield } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { RoleService } from "@/services/rolesService";
import { Role } from "@/types";
import { Loader } from "@/components/custom/loader";

// Permission Categories
const PERMISSION_CATEGORIES = {
    USER: ["user_view", "user_create", "user_edit", "user_delete"],
    ROLE: ["role_view", "role_create", "role_edit", "role_delete"],
    DASHBOARD: ["dashboard_view", "dashboard_analytics"],
};

// Validation Schema
const roleFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    description: z.string().optional(),
    permissions: z
        .array(z.string())
        .min(1, { message: "At least one permission is required." }),
});

export function Roles() {
    // State Management
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filtering States
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPermission, setFilterPermission] = useState<
        "All" | keyof typeof PERMISSION_CATEGORIES
    >("All");

    // Edit and Delete States
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    // Fetch Roles
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const fetchedRoles = await RoleService.getAll();
            setRoles(fetchedRoles);
            setError(null);
        } catch (err) {
            setError("Failed to fetch roles");
            toast({
                title: "Error",
                description: "Unable to fetch roles",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Filter Roles
    const filteredRoles = roles.filter(
        (role) =>
            role.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterPermission === "All" ||
                role.permissions.some((p) =>
                    PERMISSION_CATEGORIES[filterPermission].includes(p)
                ))
    );

    // Role Form
    const form = useForm<z.infer<typeof roleFormSchema>>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: [],
        },
    });

    // Create Role Handler
    const handleCreateRole = async (values: z.infer<typeof roleFormSchema>) => {
        try {
            const newRole = await RoleService.create({
                ...values,
                description: values.description || "",
            });
            setRoles((prev) => [...prev, newRole]);
            toast({
                title: "Success",
                description: "Role created successfully",
            });
            form.reset();
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to create role",
                variant: "destructive",
            });
        }
    };

    // Update Role Handler
    const handleUpdateRole = async (values: z.infer<typeof roleFormSchema>) => {
        if (!selectedRole) return;

        try {
            const updatedRole = await RoleService.update(
                selectedRole.id,
                values
            );
            setRoles((prev) =>
                prev.map((role) =>
                    role.id === selectedRole.id ? updatedRole : role
                )
            );
            toast({
                title: "Success",
                description: "Role updated successfully",
            });
            setSelectedRole(null);
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to update role",
                variant: "destructive",
            });
        }
    };

    // Delete Role Handler
    const handleDeleteRole = async (id: string) => {
        try {
            await RoleService.delete(id);
            setRoles((prev) => prev.filter((role) => role.id !== id));
            toast({
                title: "Success",
                description: "Role deleted successfully",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete role",
                variant: "destructive",
            });
        }
    };

    // Render Role Form
    const renderRoleForm = () => (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    selectedRole ? handleUpdateRole : handleCreateRole
                )}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter role name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter role description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Permissions Matrix */}
                <div>
                    <FormLabel>Permissions</FormLabel>
                    {Object.entries(PERMISSION_CATEGORIES).map(
                        ([category, permissions]) => (
                            <div key={category} className="mb-4">
                                <h4 className="font-medium mb-2 capitalize">
                                    {category} Permissions
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {permissions.map((permission) => (
                                        <FormField
                                            key={permission}
                                            control={form.control}
                                            name="permissions"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                checked={field.value?.includes(
                                                                    permission
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    return checked
                                                                        ? field.onChange(
                                                                              [
                                                                                  ...field.value,
                                                                                  permission,
                                                                              ]
                                                                          )
                                                                        : field.onChange(
                                                                              field.value?.filter(
                                                                                  (
                                                                                      value
                                                                                  ) =>
                                                                                      value !==
                                                                                      permission
                                                                              )
                                                                          );
                                                                }}
                                                            />
                                                            <FormLabel>
                                                                {permission.replace(
                                                                    "_",
                                                                    " "
                                                                )}
                                                            </FormLabel>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>

                <Button type="submit">
                    {selectedRole ? "Update Role" : "Create Role"}
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

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Role Management</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                form.reset();
                                setSelectedRole(null);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Role
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedRole ? "Edit Role" : "Create New Role"}
                            </DialogTitle>
                        </DialogHeader>
                        {renderRoleForm()}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search roles..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select
                    value={filterPermission}
                    onValueChange={(
                        value: "All" | keyof typeof PERMISSION_CATEGORIES
                    ) => setFilterPermission(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Permission" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Permissions</SelectItem>
                        {Object.keys(PERMISSION_CATEGORIES).map((category) => (
                            <SelectItem key={category} value={category}>
                                {category} Permissions
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Roles Table */}
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRoles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Shield className="mr-2 h-4 w-4 text-primary" />
                                            {role.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{role.description}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            {role.permissions
                                                .slice(0, 3)
                                                .map((perm) => (
                                                    <Badge
                                                        key={perm}
                                                        variant="secondary"
                                                    >
                                                        {perm}
                                                    </Badge>
                                                ))}
                                            {role.permissions.length > 3 && (
                                                <Badge variant="outline">
                                                    +
                                                    {role.permissions.length -
                                                        3}{" "}
                                                    more
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedRole(
                                                                role
                                                            );
                                                            form.reset({
                                                                name: role.name,
                                                                description:
                                                                    role.description,
                                                                permissions:
                                                                    role.permissions,
                                                            });
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit Role
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    {renderRoleForm()}
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
                                                            the role.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDeleteRole(
                                                                    role.id
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
