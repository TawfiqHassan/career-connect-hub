import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPanel = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("settings").select("key, value");
      const map: Record<string, string> = {};
      (data || []).forEach((s: any) => { map[s.key] = s.value || ""; });
      setSettings(map);
      setLoading(false);
    };
    fetch();
  }, []);

  const save = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("settings").update({ value } as any).eq("key", key);
    }
    toast({ title: "Settings saved" });
    setSaving(false);
  };

  const update = (key: string, value: string) => setSettings(s => ({ ...s, [key]: value }));

  const labels: Record<string, string> = {
    site_name: "Site Name",
    contact_email: "Contact Email",
    support_phone: "Support Phone",
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Platform Settings</CardTitle></CardHeader>
      <CardContent>
        {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : (
          <div className="space-y-4 max-w-lg">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key}>
                <Label>{labels[key] || key}</Label>
                <Input value={value} onChange={e => update(key, e.target.value)} />
              </div>
            ))}
            <Button onClick={save} disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save Settings"}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
