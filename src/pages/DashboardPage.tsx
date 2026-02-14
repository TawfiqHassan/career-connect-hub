import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, BookOpen, FileText, Users, TrendingUp, Star, Clock } from "lucide-react";

const CandidateDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Candidate Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Jobs Applied", value: "0", icon: Briefcase, color: "text-primary" },
        { title: "CV Templates", value: "3 Free", icon: FileText, color: "text-accent" },
        { title: "Tests Taken", value: "0", icon: Star, color: "text-success" },
        { title: "Plan", value: "Free", icon: TrendingUp, color: "text-pro" },
      ].map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No activity yet. Start by browsing jobs or building your CV!</p>
      </CardContent>
    </Card>
  </div>
);

const InstructorDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Instructor Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Courses", value: "0", icon: GraduationCap, color: "text-primary" },
        { title: "Students", value: "0", icon: Users, color: "text-accent" },
        { title: "Earnings", value: "৳0", icon: TrendingUp, color: "text-success" },
        { title: "Pending", value: "0", icon: Clock, color: "text-muted-foreground" },
      ].map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stat.value}</p></CardContent>
        </Card>
      ))}
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
      {[
        { title: "Active Jobs", value: "0", icon: Briefcase, color: "text-primary" },
        { title: "Applications", value: "0", icon: Users, color: "text-accent" },
        { title: "Shortlisted", value: "0", icon: Star, color: "text-success" },
        { title: "Plan", value: "Free", icon: TrendingUp, color: "text-pro" },
      ].map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stat.value}</p></CardContent>
        </Card>
      ))}
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
      {[
        { title: "Published Books", value: "0", icon: BookOpen, color: "text-primary" },
        { title: "Total Sales", value: "0", icon: TrendingUp, color: "text-accent" },
        { title: "Earnings", value: "৳0", icon: Star, color: "text-success" },
        { title: "Drafts", value: "0", icon: Clock, color: "text-muted-foreground" },
      ].map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stat.value}</p></CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader><CardTitle>Your Books</CardTitle></CardHeader>
      <CardContent><p className="text-muted-foreground">No books published yet. Start writing your first book!</p></CardContent>
    </Card>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Total Users", value: "0", icon: Users, color: "text-primary" },
        { title: "Total Jobs", value: "0", icon: Briefcase, color: "text-accent" },
        { title: "Total Courses", value: "0", icon: GraduationCap, color: "text-success" },
        { title: "Revenue", value: "৳0", icon: TrendingUp, color: "text-pro" },
      ].map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stat.value}</p></CardContent>
        </Card>
      ))}
    </div>
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
