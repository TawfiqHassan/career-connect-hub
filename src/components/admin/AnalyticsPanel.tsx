import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Briefcase, GraduationCap, BookOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

const AnalyticsPanel = () => {
  const [stats, setStats] = useState({ users: 0, jobs: 0, courses: 0, books: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [u, j, c, b] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("books").select("id", { count: "exact", head: true }),
      ]);
      setStats({ users: u.count || 0, jobs: j.count || 0, courses: c.count || 0, books: b.count || 0 });
      setLoading(false);
    };
    fetch();
  }, []);

  const barData = [
    { name: "Users", value: stats.users },
    { name: "Jobs", value: stats.jobs },
    { name: "Courses", value: stats.courses },
    { name: "Books", value: stats.books },
  ];

  const pieData = barData.filter(d => d.value > 0);

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Platform Analytics</CardTitle></CardHeader>
      <CardContent>
        {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Users", value: stats.users, icon: Users },
                { label: "Total Jobs", value: stats.jobs, icon: Briefcase },
                { label: "Total Courses", value: stats.courses, icon: GraduationCap },
                { label: "Total Books", value: stats.books, icon: BookOpen },
              ].map(s => (
                <div key={s.label} className="rounded-lg border p-4 text-center">
                  <s.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Content Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {pieData.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;
