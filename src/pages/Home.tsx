import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LucideShield, 
  LucideUsers, 
  LucideLock, 
  LucideServerCog 
} from "lucide-react"
import { Link } from "react-router-dom"

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
      <Icon className="w-8 h-8 text-primary" />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Role-Based Access Control
              <span className="block text-primary mt-2">Management Dashboard</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              A comprehensive solution for managing user roles, permissions, 
              and access control in your organization. Secure, efficient, 
              and user-friendly.
            </p>
            
            <div className="flex space-x-4">
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
             
            </div>
          </div>
          
          {/* Illustration or Image Placeholder */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="w-full max-w-md bg-muted rounded-lg p-8">
              <div className="w-full h-64 bg-primary/10 rounded-lg flex justify-center items-center">
                <LucideServerCog className="w-32 h-32 text-primary/70" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empower your organization with granular access control and 
            comprehensive user management.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={LucideUsers}
            title="User Management"
            description="Efficiently manage users with intuitive controls and detailed profiles."
          />
          
          <FeatureCard 
            icon={LucideShield}
            title="Role Management"
            description="Create and manage roles with granular permission controls."
          />
          
          <FeatureCard 
            icon={LucideLock}
            title="Access Control"
            description="Define and enforce access policies with comprehensive settings."
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary/10">
        <div className="container mx-auto px-4 py-16 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Ready to Secure Your Organization?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start your journey towards comprehensive access management today.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 RBAC Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
