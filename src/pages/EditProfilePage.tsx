import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Plus, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";

interface EducationItem { degree: string; institution: string; year: string }
interface ExperienceItem { title: string; company: string; period: string; description: string }

const EditProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    full_name: "", headline: "", bio: "", location: "", phone: "",
    website: "", linkedin_url: "", is_public: true, avatar_url: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setForm({
          full_name: data.full_name || "", headline: (data as any).headline || "",
          bio: (data as any).bio || "", location: (data as any).location || "",
          phone: data.phone || "", website: (data as any).website || "",
          linkedin_url: (data as any).linkedin_url || "",
          is_public: (data as any).is_public ?? true, avatar_url: data.avatar_url || "",
        });
        setSkills(Array.isArray((data as any).skills) ? (data as any).skills : []);
        setEducation(Array.isArray((data as any).education) ? (data as any).education : []);
        setExperience(Array.isArray((data as any).experience) ? (data as any).experience : []);
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  if (authLoading) return <Layout><div className="container py-12 text-center text-muted-foreground">Loading...</div></Layout>;
  if (!user) return <Navigate to="/login" replace />;

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    setForm(f => ({ ...f, avatar_url: publicUrl }));
    setUploading(false);
    toast({ title: "Photo uploaded!" });
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const save = async () => {
    setSaving(true);
    const payload: any = {
      full_name: form.full_name, headline: form.headline, bio: form.bio,
      location: form.location, phone: form.phone, website: form.website,
      linkedin_url: form.linkedin_url, is_public: form.is_public,
      avatar_url: form.avatar_url, skills, education, experience,
    };
    const { error } = await supabase.from("profiles").update(payload).eq("user_id", user.id);
    if (error) { toast({ title: "Error saving", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Profile saved!" }); navigate(`/profile/${user.id}`); }
    setSaving(false);
  };

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={form.avatar_url} />
                  <AvatarFallback>{(form.full_name || "?")[0]}</AvatarFallback>
                </Avatar>
                <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:opacity-80">
                  <Camera className="h-3 w-3" />
                  <input type="file" accept="image/*" className="hidden" onChange={uploadAvatar} />
                </label>
              </div>
              <div>
                <p className="font-medium">{uploading ? "Uploading..." : "Profile Photo"}</p>
                <p className="text-sm text-muted-foreground">Click camera icon to upload</p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} /></div>
              <div><Label>Headline</Label><Input value={form.headline} onChange={e => setForm(f => ({ ...f, headline: e.target.value }))} placeholder="e.g. Full Stack Developer" /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Dhaka, Bangladesh" /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div><Label>Website</Label><Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} /></div>
              <div><Label>LinkedIn URL</Label><Input value={form.linkedin_url} onChange={e => setForm(f => ({ ...f, linkedin_url: e.target.value }))} /></div>
            </div>
            <div><Label>Bio</Label><Textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4} placeholder="Tell us about yourself..." /></div>

            {/* Public toggle */}
            <div className="flex items-center gap-3">
              <Switch checked={form.is_public} onCheckedChange={v => setForm(f => ({ ...f, is_public: v }))} />
              <Label>Make profile public (visible to everyone)</Label>
            </div>

            {/* Skills */}
            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {skills.map(s => (
                  <Badge key={s} variant="secondary" className="gap-1">
                    {s} <button onClick={() => setSkills(skills.filter(sk => sk !== s))}><X className="h-3 w-3" /></button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add a skill" onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} />
                <Button type="button" size="sm" variant="outline" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center justify-between mb-2"><Label>Experience</Label>
                <Button size="sm" variant="outline" onClick={() => setExperience([...experience, { title: "", company: "", period: "", description: "" }])}><Plus className="h-4 w-4 mr-1" />Add</Button>
              </div>
              {experience.map((exp, i) => (
                <div key={i} className="border rounded-lg p-3 mb-2 space-y-2">
                  <div className="flex justify-between"><Input value={exp.title} onChange={e => { const n = [...experience]; n[i].title = e.target.value; setExperience(n); }} placeholder="Job Title" /><Button size="icon" variant="ghost" onClick={() => setExperience(experience.filter((_, idx) => idx !== i))}><X className="h-4 w-4" /></Button></div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={exp.company} onChange={e => { const n = [...experience]; n[i].company = e.target.value; setExperience(n); }} placeholder="Company" />
                    <Input value={exp.period} onChange={e => { const n = [...experience]; n[i].period = e.target.value; setExperience(n); }} placeholder="2020-2023" />
                  </div>
                  <Textarea value={exp.description} onChange={e => { const n = [...experience]; n[i].description = e.target.value; setExperience(n); }} placeholder="Description" rows={2} />
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center justify-between mb-2"><Label>Education</Label>
                <Button size="sm" variant="outline" onClick={() => setEducation([...education, { degree: "", institution: "", year: "" }])}><Plus className="h-4 w-4 mr-1" />Add</Button>
              </div>
              {education.map((edu, i) => (
                <div key={i} className="border rounded-lg p-3 mb-2">
                  <div className="flex justify-between mb-2"><Input value={edu.degree} onChange={e => { const n = [...education]; n[i].degree = e.target.value; setEducation(n); }} placeholder="Degree" /><Button size="icon" variant="ghost" onClick={() => setEducation(education.filter((_, idx) => idx !== i))}><X className="h-4 w-4" /></Button></div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={edu.institution} onChange={e => { const n = [...education]; n[i].institution = e.target.value; setEducation(n); }} placeholder="Institution" />
                    <Input value={edu.year} onChange={e => { const n = [...education]; n[i].year = e.target.value; setEducation(n); }} placeholder="Year" />
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={save} disabled={saving} className="w-full" size="lg">
              <Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EditProfilePage;
