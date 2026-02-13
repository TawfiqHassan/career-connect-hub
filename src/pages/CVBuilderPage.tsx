import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText, Download, Star, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  { id: 1, name: "Modern Professional", type: "Free", color: "bg-primary/10" },
  { id: 2, name: "Classic Elegant", type: "Free", color: "bg-success/10" },
  { id: 3, name: "Minimalist Clean", type: "Free", color: "bg-accent/10" },
  { id: 4, name: "Executive Bold", type: "Pro", color: "bg-pro/10" },
  { id: 5, name: "Creative Designer", type: "Pro", color: "bg-pro/10" },
  { id: 6, name: "Tech Professional", type: "Pro", color: "bg-pro/10" },
];

const CVBuilderPage = () => {
  return (
    <Layout>
      <section className="gradient-hero py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
              CV & Resume <span className="text-gradient-primary">Builder</span>
            </h1>
            <p className="text-muted-foreground mb-6">
              Create professional CVs and resumes with our beautiful templates. Free users get 3 templates, Pro users unlock 50+ premium designs.
            </p>
            <div className="flex gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/register">Start Building <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button variant="outline-primary" size="lg" asChild>
                <Link to="/pricing">View Pro Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Choose a Template</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <div key={t.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className={`h-64 ${t.color} flex items-center justify-center relative`}>
                  <FileText className="h-20 w-20 text-muted-foreground/30" />
                  {t.type === "Pro" && (
                    <div className="absolute top-3 right-3 gradient-pro text-pro-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Pro Only
                    </div>
                  )}
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold font-heading text-foreground">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.type} Template</p>
                  </div>
                  <Button variant={t.type === "Free" ? "hero" : "pro"} size="sm">
                    {t.type === "Free" ? <><Download className="h-4 w-4" /> Use</> : <><Lock className="h-4 w-4" /> Unlock</>}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl gradient-primary p-8 text-center">
            <h3 className="text-2xl font-bold font-heading text-primary-foreground mb-3">Unlock 50+ Premium Templates</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              Go Pro and access all premium CV/Resume templates, plus unlimited customization options.
            </p>
            <Button variant="accent" size="xl" asChild>
              <Link to="/pricing">Upgrade to Pro <Star className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CVBuilderPage;
