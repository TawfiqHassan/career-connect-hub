import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock, User, ArrowRight, Briefcase, GraduationCap, BookOpen, PenTool } from "lucide-react";
import Layout from "@/components/Layout";

const roles = [
  {
    value: "candidate",
    label: "Candidate",
    description: "Find jobs, build CV, take tests",
    icon: User,
    color: "border-primary/50 bg-primary/5 data-[selected=true]:border-primary data-[selected=true]:bg-primary/10",
  },
  {
    value: "instructor",
    label: "Instructor",
    description: "Create & publish courses",
    icon: GraduationCap,
    color: "border-accent/50 bg-accent/5 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
  },
  {
    value: "employer",
    label: "Employer",
    description: "Post jobs & recruit talent",
    icon: Briefcase,
    color: "border-success/50 bg-success/5 data-[selected=true]:border-success data-[selected=true]:bg-success/10",
  },
  {
    value: "writer",
    label: "Writer",
    description: "Publish & sell books",
    icon: PenTool,
    color: "border-pro/50 bg-pro/5 data-[selected=true]:border-pro data-[selected=true]:bg-pro/10",
  },
] as const;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("candidate");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
          role: selectedRole,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email to verify your account!");
      navigate("/login");
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 gradient-hero">
        <Card className="w-full max-w-lg shadow-lg border-border/50">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <CardTitle className="text-2xl font-heading">Create Account</CardTitle>
            <CardDescription>Join CarriTiq and start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>I am a...</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      data-selected={selectedRole === role.value}
                      className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${role.color}`}
                      onClick={() => setSelectedRole(role.value)}
                    >
                      <role.icon className="h-6 w-6" />
                      <span className="text-sm font-semibold">{role.label}</span>
                      <span className="text-xs text-muted-foreground text-center">{role.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    className="pl-9"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min 6 characters"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;
