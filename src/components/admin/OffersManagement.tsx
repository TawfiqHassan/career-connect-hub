import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Bell, Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Offer {
  id: string;
  title: string;
  code: string | null;
  discount_percent: number;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

const emptyOffer = { title: "", code: "", discount_percent: 10, start_date: "", end_date: "" };

const OffersManagement = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [form, setForm] = useState(emptyOffer);
  const { toast } = useToast();

  const fetchOffers = async () => {
    setLoading(true);
    const { data } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
    setOffers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOffers(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyOffer); setDialogOpen(true); };
  const openEdit = (o: Offer) => {
    setEditing(o);
    setForm({ title: o.title, code: o.code || "", discount_percent: o.discount_percent, start_date: o.start_date?.split("T")[0] || "", end_date: o.end_date?.split("T")[0] || "" });
    setDialogOpen(true);
  };

  const save = async () => {
    const payload: any = { title: form.title, code: form.code || null, discount_percent: form.discount_percent, start_date: form.start_date || null, end_date: form.end_date || null };
    if (editing) {
      const { error } = await supabase.from("offers").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("offers").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setDialogOpen(false);
    fetchOffers();
  };

  const toggleActive = async (o: Offer) => {
    await supabase.from("offers").update({ is_active: !o.is_active } as any).eq("id", o.id);
    fetchOffers();
  };

  const deleteOffer = async (id: string) => {
    if (!confirm("Delete this offer?")) return;
    await supabase.from("offers").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchOffers();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2"><Bell className="h-5 w-5" /> Offers & Flash Sales</span>
          <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4 mr-1" /> Create Offer</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : (
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.map(o => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.title}</TableCell>
                    <TableCell className="font-mono text-sm">{o.code || "—"}</TableCell>
                    <TableCell>{o.discount_percent}%</TableCell>
                    <TableCell><Switch checked={o.is_active} onCheckedChange={() => toggleActive(o)} /></TableCell>
                    <TableCell className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(o)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteOffer(o.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {offers.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-6">No offers yet</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit Offer" : "Create Offer"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><Label>Code</Label><Input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="e.g. SAVE20" /></div>
              <div><Label>Discount %</Label><Input type="number" value={form.discount_percent} onChange={e => setForm(f => ({ ...f, discount_percent: Number(e.target.value) }))} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Start Date</Label><Input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} /></div>
                <div><Label>End Date</Label><Input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} /></div>
              </div>
              <Button onClick={save} className="w-full">{editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default OffersManagement;
