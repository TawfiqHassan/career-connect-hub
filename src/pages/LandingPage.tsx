import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase, GraduationCap, BookOpen, FileText, Users, Building2,
  Award, TrendingUp, CheckCircle, ArrowRight, Star, Zap, Shield,
  Clock, Target, PenTool
} from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-image.jpg";

const stats = [
  { label: "Active Jobs", value: "12,500+", icon: Briefcase },
  { label: "Registered Candidates", value: "85,000+", icon: Users },
  { label: "Employers", value: "3,200+", icon: Building2 },
  { label: "Courses Available", value: "450+", icon: GraduationCap },
];

const userTypes = [
  {
    title: "Job Seekers",
    description: "Find your dream job, build professional CVs, and take aptitude tests to prove your skills.",
    icon: Target,
    color: "primary",
    features: ["Smart Job Matching", "CV/Resume Builder", "Aptitude Tests", "Employability Score"],
    link: "/register",
  },
  {
    title: "Employers & Recruiters",
    description: "Post jobs, filter candidates, and find the perfect talent for your organization.",
    icon: Building2,
    color: "accent",
    features: ["Job Posting", "Candidate Filtering", "Application Management", "Analytics Dashboard"],
    link: "/register",
  },
  {
    title: "Instructors",
    description: "Create and publish courses to share your knowledge with thousands of learners.",
    icon: GraduationCap,
    color: "success",
    features: ["Course Creation", "Video Uploads", "Student Analytics", "Revenue Sharing"],
    link: "/register",
  },
  {
    title: "Writers & Authors",
    description: "Publish your books and reach a wide audience. Set your pricing or offer discounts.",
    icon: PenTool,
    color: "pro",
    features: ["Book Publishing", "Flexible Pricing", "Reader Analytics", "Pro Discounts"],
    link: "/register",
  },
];

const features = [
  { icon: FileText, title: "CV & Resume Builder", desc: "Professional templates to showcase your skills" },
  { icon: Award, title: "Aptitude Tests", desc: "Prove your employability with standardized tests" },
  { icon: TrendingUp, title: "Career Growth", desc: "Track your progress and skill development" },
  { icon: Shield, title: "Verified Employers", desc: "All employers are verified for your safety" },
  { icon: Clock, title: "Quick Apply", desc: "Apply to multiple jobs with one click" },
  { icon: Star, title: "Pro Benefits", desc: "Unlimited access with Pro membership" },
];

const pricingPreview = [
  {
    name: "Free",
    price: "০",
    period: "forever",
    features: ["Apply up to 5 jobs/day", "Basic CV templates", "Free aptitude tests", "Limited course access"],
    cta: "Get Started Free",
    variant: "outline-primary" as const,
  },
  {
    name: "Pro",
    price: "৳499",
    period: "/month",
    popular: true,
    features: ["Unlimited job applications", "Premium CV templates", "All aptitude tests", "All courses & books", "Priority support"],
    cta: "Go Pro",
    variant: "pro" as const,
  },
];

const LandingPage = () => {
  return (
    <Layout>
      {/* Offer Banner */}
      <div className="gradient-accent py-2.5">
        <div className="container flex items-center justify-center gap-2 text-sm font-semibold text-accent-foreground">
          <Zap className="h-4 w-4" />
          🔥 Flash Sale! 50% off Pro Plan — Code: <span className="font-bold underline">CAREER50</span> — Limited Time!
          <Zap className="h-4 w-4" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Star className="h-3.5 w-3.5" />
                Bangladesh's #1 Career Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-foreground">
                Build Your <span className="text-gradient-primary">Career</span>,
                <br />Shape Your <span className="text-gradient-primary">Future</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover thousands of jobs, build professional CVs, learn new skills with courses,
                and prove your worth with aptitude tests. All in one platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/register">
                    Start Free <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-primary" size="xl" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> Free forever plan</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> No credit card</span>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={heroImage} alt="CarriTiq Platform" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-lg border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">12,500+ Jobs</p>
                    <p className="text-xs text-muted-foreground">Updated daily</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-card rounded-xl p-4 shadow-lg border border-border animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-pro flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-pro-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">450+ Courses</p>
                    <p className="text-xs text-muted-foreground">Learn anything</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <stat.icon className="h-8 w-8 mx-auto text-primary" />
                <p className="text-2xl md:text-3xl font-bold font-heading text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
              One Platform, <span className="text-gradient-primary">Every Career Role</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a job seeker, employer, instructor, or writer — CarriTiq has everything you need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((type, i) => (
              <div
                key={type.title}
                className="group gradient-card rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${
                  type.color === "primary" ? "gradient-primary" :
                  type.color === "accent" ? "gradient-accent" :
                  type.color === "success" ? "bg-success" : "gradient-pro"
                }`}>
                  <type.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold font-heading text-foreground mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                <ul className="space-y-2 mb-6">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline-primary" size="sm" className="w-full" asChild>
                  <Link to={type.link}>
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
              Everything You Need to <span className="text-gradient-primary">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful tools and features designed to accelerate your career journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
              Simple, Transparent <span className="text-gradient-primary">Pricing</span>
            </h2>
            <p className="text-muted-foreground">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {pricingPreview.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${
                  plan.popular
                    ? "border-pro shadow-lg relative"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-pro text-pro-foreground text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold font-heading text-foreground">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.variant} size="lg" className="w-full" asChild>
                  <Link to="/pricing">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              See all plans including Recruiter pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 gradient-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join 85,000+ professionals who are already building their careers with CarriTiq.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="xl" asChild>
              <Link to="/register">
                Create Free Account <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/jobs">Explore Jobs</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
