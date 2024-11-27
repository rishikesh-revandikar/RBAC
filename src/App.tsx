import { ThemeProvider } from "./components/custom/theme-provider";
import AppRouter from "./routes/Router";
import { Toaster } from "@/components/ui/toaster";

function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AppRouter />
                <Toaster />
            </ThemeProvider>
        </>
    );
}

export default App;
