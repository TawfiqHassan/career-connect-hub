import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, BookOpen, FileText, Users, TrendingUp, Star, Clock, ShieldCheck, Settings, Bell, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import ContentManagement from "@/components/admin/ContentManagement";
import OffersManagement from "@/components/admin/OffersManagement";
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";
import SettingsPanel from "@/components/admin/SettingsPanel";

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

const CandidateDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">Candidate Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/profile/edit">Edit Profile</Link></Button>
          {user && <Button variant="outline" asChild><Link to={`/profile/${user.id}`}>View Public Profile</Link></Button>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Jobs Applied" value="0" icon={Briefcase} color="text-primary" />
        <StatCard title="CV Templates" value="3 Free" icon={FileText} color="text-accent" />
        <StatCard title="Tests Taken" value="0" icon={Star} color="text-primary" />
        <StatCard title="Plan" value="Free" icon={TrendingUp} color="text-accent" />
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">No activity yet. Start by browsing jobs or building your CV!</p></CardContent>
      </Card>
    </div>
  );
};

const InstructorDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Instructor Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Courses" value="0" icon={GraduationCap} color="text-primary" />
      <StatCard title="Students" value="0" icon={Users} color="text-accent" />
      <StatCard title="Earnings" value="৳0" icon={TrendingUp} color="text-primary" />
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
      <StatCard title="Shortlisted" value="0" icon={Star} color="text-primary" />
      <StatCard title="Plan" value="Free" icon={TrendingUp} color="text-accent" />
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
      <StatCard title="Earnings" value="৳0" icon={Star} color="text-primary" />
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

    <Tabs defaultValue="users" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="users"><Users className="h-4 w-4 mr-1.5" />Users</TabsTrigger>
        <TabsTrigger value="content"><BookOpen className="h-4 w-4 mr-1.5" />Content</TabsTrigger>
        <TabsTrigger value="offers"><Bell className="h-4 w-4 mr-1.5" />Offers</TabsTrigger>
        <TabsTrigger value="analytics"><BarChart3 className="h-4 w-4 mr-1.5" />Analytics</TabsTrigger>
        <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-1.5" />Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="users"><UserManagement /></TabsContent>
      <TabsContent value="content"><ContentManagement /></TabsContent>
      <TabsContent value="offers"><OffersManagement /></TabsContent>
      <TabsContent value="analytics"><AnalyticsPanel /></TabsContent>
      <TabsContent value="settings"><SettingsPanel /></TabsContent>
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
