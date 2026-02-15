import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, GraduationCap, BookOpen, Check, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ContentItem = { id: string; title: string; status: string; created_at: string; owner?: string };

const ContentManagement = () => {
  const [jobs, setJobs] = useState<ContentItem[]>([]);
  const [courses, setCourses] = useState<ContentItem[]>([]);
  const [books, setBooks] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAll = async () => {
    setLoading(true);
    const [j, c, b] = await Promise.all([
      supabase.from("jobs").select("id, title, status, created_at, company").order("created_at", { ascending: false }),
      supabase.from("courses").select("id, title, status, created_at").order("created_at", { ascending: false }),
      supabase.from("books").select("id, title, status, created_at").order("created_at", { ascending: false }),
    ]);
    setJobs((j.data || []).map(i => ({ ...i, owner: (i as any).company })));
    setCourses(c.data || []);
    setBooks(b.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const updateStatus = async (table: string, id: string, status: string) => {
    const { error } = await (supabase.from(table as any) as any).update({ status }).eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: `Item ${status}` });
    fetchAll();
  };

  const deleteItem = async (table: string, id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await (supabase.from(table as any) as any).delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted" });
    fetchAll();
  };

  const statusBadge = (s: string) => {
    const variant = s === "approved" ? "default" : s === "rejected" ? "destructive" : "secondary";
    return <Badge variant={variant}>{s}</Badge>;
  };

  const ContentTable = ({ items, table }: { items: ContentItem[]; table: string }) => (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(i => (
            <TableRow key={i.id}>
              <TableCell className="font-medium">{i.title}</TableCell>
              <TableCell>{statusBadge(i.status)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{new Date(i.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-1">
                {i.status !== "approved" && <Button size="icon" variant="ghost" onClick={() => updateStatus(table, i.id, "approved")}><Check className="h-4 w-4 text-green-600" /></Button>}
                {i.status !== "rejected" && <Button size="icon" variant="ghost" onClick={() => updateStatus(table, i.id, "rejected")}><X className="h-4 w-4 text-red-600" /></Button>}
                <Button size="icon" variant="ghost" onClick={() => deleteItem(table, i.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-6">No items yet</TableCell></TableRow>}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Card>
      <CardHeader><CardTitle>Content Moderation</CardTitle></CardHeader>
      <CardContent>
        {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : (
          <Tabs defaultValue="jobs">
            <TabsList>
              <TabsTrigger value="jobs"><Briefcase className="h-4 w-4 mr-1" />Jobs ({jobs.length})</TabsTrigger>
              <TabsTrigger value="courses"><GraduationCap className="h-4 w-4 mr-1" />Courses ({courses.length})</TabsTrigger>
              <TabsTrigger value="books"><BookOpen className="h-4 w-4 mr-1" />Books ({books.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="jobs"><ContentTable items={jobs} table="jobs" /></TabsContent>
            <TabsContent value="courses"><ContentTable items={courses} table="courses" /></TabsContent>
            <TabsContent value="books"><ContentTable items={books} table="books" /></TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentManagement;
