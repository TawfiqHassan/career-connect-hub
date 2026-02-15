import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Globe, Linkedin, Briefcase, GraduationCap, Share2, Mail, Phone, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [canSeeContact, setCanSeeContact] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      const { data } = await supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle();
      setProfile(data);

      // Check if current user is employer who received application from this candidate
      if (user && user.id !== userId) {
        const { data: apps } = await supabase
          .from("job_applications")
          .select("id")
          .eq("candidate_id", userId)
          .eq("employer_id", user.id)
          .limit(1);
        setCanSeeContact(!!apps && apps.length > 0);
      } else if (user?.id === userId) {
        setCanSeeContact(true);
      }
      setLoading(false);
    };
    fetch();
  }, [userId, user]);

  const share = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Profile link copied!" });
  };

  if (loading) return <Layout><div className="container py-12 text-center text-muted-foreground">Loading profile...</div></Layout>;
  if (!profile) return <Layout><div className="container py-12 text-center text-muted-foreground">Profile not found</div></Layout>;

  const isOwner = user?.id === userId;
  const education = Array.isArray(profile.education) ? profile.education : [];
  const experience = Array.isArray(profile.experience) ? profile.experience : [];

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar_url || ""} />
                <AvatarFallback className="text-2xl">{(profile.full_name || "?")[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.full_name || "Unnamed"}</h1>
                    {profile.headline && <p className="text-muted-foreground">{profile.headline}</p>}
                    {profile.location && <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{profile.location}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={share}><Share2 className="h-4 w-4" /></Button>
                    {isOwner && <Button size="sm" variant="outline" asChild><Link to="/profile/edit"><Pencil className="h-4 w-4 mr-1" />Edit</Link></Button>}
                  </div>
                </div>

                {(canSeeContact) && (
                  <div className="flex gap-4 mt-3 text-sm">
                    {profile.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{profile.phone}</span>}
                  </div>
                )}

                <div className="flex gap-3 mt-3">
                  {profile.website && <a href={profile.website} target="_blank" className="text-primary hover:underline flex items-center gap-1 text-sm"><Globe className="h-3 w-3" />Website</a>}
                  {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" className="text-primary hover:underline flex items-center gap-1 text-sm"><Linkedin className="h-3 w-3" />LinkedIn</a>}
                </div>
              </div>
            </div>

            {profile.bio && <div className="mt-6"><h3 className="font-semibold mb-2">About</h3><p className="text-muted-foreground">{profile.bio}</p></div>}

            {profile.skills?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">{profile.skills.map((s: string) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
              </div>
            )}

            {experience.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Briefcase className="h-4 w-4" /> Experience</h3>
                <div className="space-y-3">{experience.map((e: any, i: number) => (
                  <div key={i} className="border-l-2 border-primary pl-4">
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-muted-foreground">{e.company} {e.period && `· ${e.period}`}</p>
                    {e.description && <p className="text-sm mt-1">{e.description}</p>}
                  </div>
                ))}</div>
              </div>
            )}

            {education.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Education</h3>
                <div className="space-y-3">{education.map((e: any, i: number) => (
                  <div key={i} className="border-l-2 border-accent pl-4">
                    <p className="font-medium">{e.degree}</p>
                    <p className="text-sm text-muted-foreground">{e.institution} {e.year && `· ${e.year}`}</p>
                  </div>
                ))}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
