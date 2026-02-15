import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserRow {
  user_id: string;
  full_name: string | null;
  email: string;
  role: string;
  created_at: string;
  avatar_url: string | null;
}

const ROLES = ["candidate", "instructor", "employer", "writer", "admin"];

const UserManagement = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const res = await supabase.functions.invoke("admin-users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    });

    // Use fetch directly for GET with query params
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users?action=list`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (Array.isArray(data)) setUsers(data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = async (targetUserId: string, newRole: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users?action=update-role`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId, newRole }),
    });
    if (res.ok) {
      toast({ title: "Role updated" });
      fetchUsers();
    } else {
      toast({ title: "Error updating role", variant: "destructive" });
    }
  };

  const deleteUser = async (targetUserId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users?action=delete-user`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId }),
    });
    if (res.ok) {
      toast({ title: "User deleted" });
      fetchUsers();
    } else {
      toast({ title: "Error deleting user", variant: "destructive" });
    }
  };

  const filtered = users.filter(u => {
    const matchSearch = !search || (u.full_name || "").toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2"><Users className="h-5 w-5" /> User Management</span>
          <Badge variant="secondary">{users.length} users</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading users...</p>
        ) : (
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(u => (
                  <TableRow key={u.user_id}>
                    <TableCell className="font-medium">{u.full_name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Select value={u.role} onValueChange={val => updateRole(u.user_id, val)}>
                        <SelectTrigger className="w-[130px] h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => deleteUser(u.user_id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No users found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
