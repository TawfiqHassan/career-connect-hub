import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, BookOpen, FileText, Users, TrendingUp, Star, Clock, ShieldCheck, Settings, Bell, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color}`} />
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const CandidateDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Candidate Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Jobs Applied" value="0" icon={Briefcase} color="text-primary" />
      <StatCard title="CV Templates" value="3 Free" icon={FileText} color="text-accent" />
      <StatCard title="Tests Taken" value="0" icon={Star} color="text-success" />
      <StatCard title="Plan" value="Free" icon={TrendingUp} color="text-pro" />
    </div>
    <Card>
      <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
      <CardContent><p className="text-muted-foreground">No activity yet. Start by browsing jobs or building your CV!</p></CardContent>
    </Card>
  </div>
);

const InstructorDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Instructor Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Courses" value="0" icon={GraduationCap} color="text-primary" />
      <StatCard title="Students" value="0" icon={Users} color="text-accent" />
      <StatCard title="Earnings" value="৳0" icon={TrendingUp} color="text-success" />
      <StatCard title="Pending" value="0" icon={Clock} color="text-muted-foreground" />
    </div>
    <Card>
      <CardHeader><CardTitle>Your Courses</CardTitle></CardHeader>
      <CardContent><p className="text-muted-foreground">No courses yet. Start creating your first course!</p></CardContent>
    </Card>
  </div>
);

const EmployerDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Employer Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Active Jobs" value="0" icon={Briefcase} color="text-primary" />
      <StatCard title="Applications" value="0" icon={Users} color="text-accent" />
      <StatCard title="Shortlisted" value="0" icon={Star} color="text-success" />
      <StatCard title="Plan" value="Free" icon={TrendingUp} color="text-pro" />
    </div>
    <Card>
      <CardHeader><CardTitle>Posted Jobs</CardTitle></CardHeader>
      <CardContent><p className="text-muted-foreground">No jobs posted yet. Post your first job listing!</p></CardContent>
    </Card>
  </div>
);

const WriterDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Writer Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Published Books" value="0" icon={BookOpen} color="text-primary" />
      <StatCard title="Total Sales" value="0" icon={TrendingUp} color="text-accent" />
      <StatCard title="Earnings" value="৳0" icon={Star} color="text-success" />
      <StatCard title="Drafts" value="0" icon={Clock} color="text-muted-foreground" />
    </div>
    <Card>
      <CardHeader><CardTitle>Your Books</CardTitle></CardHeader>
      <CardContent><p className="text-muted-foreground">No books published yet. Start writing your first book!</p></CardContent>
    </Card>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Full system control and management</p>
      </div>
      <Badge className="bg-destructive text-destructive-foreground text-xs">
        <ShieldCheck className="h-3 w-3 mr-1" /> Super Admin
      </Badge>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Users" value="—" icon={Users} color="text-primary" />
      <StatCard title="Total Jobs" value="—" icon={Briefcase} color="text-accent" />
      <StatCard title="Total Courses" value="—" icon={GraduationCap} color="text-success" />
      <StatCard title="Revenue" value="৳0" icon={TrendingUp} color="text-pro" />
    </div>

    <Tabs defaultValue="users" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="users"><Users className="h-4 w-4 mr-1.5" />User Management</TabsTrigger>
        <TabsTrigger value="content"><BookOpen className="h-4 w-4 mr-1.5" />Content</TabsTrigger>
        <TabsTrigger value="offers"><Bell className="h-4 w-4 mr-1.5" />Offers & Banners</TabsTrigger>
        <TabsTrigger value="analytics"><BarChart3 className="h-4 w-4 mr-1.5" />Analytics</TabsTrigger>
        <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-1.5" />Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              User Management
              <Button size="sm" variant="outline">Export Users</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">View, manage, and assign roles to all platform users.</p>
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">User management table coming soon</p>
              <p className="text-sm">You'll be able to view all users, search, filter by role, and change roles here.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="content">
        <Card>
          <CardHeader><CardTitle>Content Moderation</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Review and moderate jobs, courses, books, and blog posts.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Pending Jobs", count: 0, icon: Briefcase },
                { label: "Pending Courses", count: 0, icon: GraduationCap },
                { label: "Pending Books", count: 0, icon: BookOpen },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border p-4 text-center">
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">{item.count}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="offers">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Offers & Flash Sales
              <Button size="sm">Create Offer</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Manage promotional banners, discount codes, and flash sales.</p>
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Offer management coming soon</p>
              <p className="text-sm">Create and manage promotional offers, coupon codes, and flash sale banners.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader><CardTitle>Platform Analytics</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Analytics dashboard coming soon</p>
              <p className="text-sm">View detailed analytics on user growth, revenue, and platform usage.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader><CardTitle>Platform Settings</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              <Settings className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Settings panel coming soon</p>
              <p className="text-sm">Configure platform-wide settings, payment gateways, and email templates.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

const dashboardByRole: Record<string, React.FC> = {
  candidate: CandidateDashboard,
  instructor: InstructorDashboard,
  employer: EmployerDashboard,
  writer: WriterDashboard,
  admin: AdminDashboard,
};

const DashboardPage = () => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const DashComponent = dashboardByRole[role || "candidate"] || CandidateDashboard;

  return (
    <Layout>
      <div className="container py-8">
        <DashComponent />
      </div>
    </Layout>
  );
};

export default DashboardPage;
