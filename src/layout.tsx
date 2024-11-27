// components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { Separator } from "./components/ui/separator";
import { useLocation } from "react-router-dom";
import { ModeToggle } from "./components/custom/mode-toggle";

export default function Layout() {
    const location = useLocation();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <h2 className="text-sm font-semibold text-muted-foreground">
                            {location.pathname === "/"
                                ? "Home"
                                : location.pathname.slice(1)}
                        </h2>
                    </div>
                    <ModeToggle />
                </header>
                <div className="max-w-auto px-4 py-6">
                    {/* This will render child routes */}
                    <Outlet />
                </div>{" "}
            </SidebarInset>
        </SidebarProvider>
    );
}
