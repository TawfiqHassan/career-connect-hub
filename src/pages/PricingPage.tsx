import { Button } from "@/components/ui/button";
import { CheckCircle, X, ArrowRight, Zap, Building2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: PlanFeature[];
  cta: string;
  variant: "outline-primary" | "pro" | "accent" | "hero" | "default";
}

const candidatePlans: Plan[] = [
  {
    name: "Free",
    price: "০",
    period: "forever",
    description: "Get started with basic features",
    features: [
      { text: "Apply up to 5 jobs/day", included: true },
      { text: "Basic CV templates (3)", included: true },
      { text: "Free aptitude tests", included: true },
      { text: "Free courses only", included: true },
      { text: "Free books only", included: true },
      { text: "Unlimited job applications", included: false },
      { text: "Premium CV templates (50+)", included: false },
      { text: "All aptitude & employability tests", included: false },
      { text: "Pro course & book discounts", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    variant: "outline-primary",
  },
  {
    name: "Pro",
    price: "৳499",
    period: "/month",
    description: "Everything you need to succeed",
    popular: true,
    features: [
      { text: "Unlimited job applications", included: true },
      { text: "Premium CV templates (50+)", included: true },
      { text: "All aptitude & employability tests", included: true },
      { text: "All courses with discounts", included: true },
      { text: "All books with discounts", included: true },
      { text: "Advanced job matching", included: true },
      { text: "Profile verification badge", included: true },
      { text: "Employer visibility boost", included: true },
      { text: "Priority support 24/7", included: true },
      { text: "Early access to new features", included: true },
    ],
    cta: "Go Pro — Save 50% Today",
    variant: "pro",
  },
];

const recruiterPlans: Plan[] = [
  {
    name: "Free Recruiter",
    price: "০",
    period: "forever",
    description: "Basic job posting for small teams",
    features: [
      { text: "Post 1 job at a time", included: true },
      { text: "Basic applicant list", included: true },
      { text: "Company profile page", included: true },
      { text: "Multiple job postings", included: false },
      { text: "Candidate filtering & search", included: false },
      { text: "Featured job listings", included: false },
      { text: "Analytics dashboard", included: false },
      { text: "Bulk messaging", included: false },
    ],
    cta: "Start Free",
    variant: "outline-primary",
  },
  {
    name: "Recruiter Plus",
    price: "৳2,999",
    period: "/month",
    description: "Advanced recruiting features",
    popular: true,
    features: [
      { text: "Unlimited job postings", included: true },
      { text: "Advanced candidate filtering", included: true },
      { text: "Featured job listings", included: true },
      { text: "Verified employer badge", included: true },
      { text: "Analytics & reporting", included: true },
      { text: "Bulk messaging to candidates", included: true },
      { text: "Priority placement in search", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    cta: "Upgrade to Plus",
    variant: "accent",
  },
];

const PlanCard = ({ plan }: { plan: Plan }) => (
  <div className={`rounded-2xl p-8 border relative ${plan.popular ? "border-pro shadow-lg" : "border-border"}`}>
    {plan.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-pro text-pro-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
        <Star className="h-3 w-3" /> Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold font-heading text-foreground">{plan.name}</h3>
    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
    <div className="mt-4 mb-6">
      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
      <span className="text-muted-foreground">/{plan.period}</span>
    </div>
    <ul className="space-y-3 mb-8">
      {plan.features.map((f) => (
        <li key={f.text} className={`flex items-center gap-2 text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50"}`}>
          {f.included ? <CheckCircle className="h-4 w-4 text-success shrink-0" /> : <X className="h-4 w-4 shrink-0" />}
          {f.text}
        </li>
      ))}
    </ul>
    <Button variant={plan.variant} size="lg" className="w-full" asChild>
      <Link to="/register">{plan.cta} <ArrowRight className="h-4 w-4" /></Link>
    </Button>
  </div>
);

const PricingPage = () => {
  return (
    <Layout>
      <section className="gradient-hero py-16">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Zap className="h-3.5 w-3.5" /> Flash Sale — 50% Off Pro Plans!
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
            Choose Your <span className="text-gradient-primary">Plan</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Flexible pricing for candidates and recruiters. Start free, upgrade anytime. Prices in BDT.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-foreground">Candidate Plans</h2>
              <p className="text-sm text-muted-foreground">For job seekers & learners</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {candidatePlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg gradient-accent flex items-center justify-center">
              <Building2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-foreground">Recruiter Plans</h2>
              <p className="text-sm text-muted-foreground">For employers & hiring teams</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {recruiterPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container text-center">
          <h3 className="text-xl font-bold font-heading text-foreground mb-3">Payment Methods</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            We accept bKash, Nagad, and SSLCommerz. All prices are in BDT (৳) and can be adjusted by admin.
          </p>
          <div className="flex justify-center gap-4 items-center">
            <div className="bg-card px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground">bKash</div>
            <div className="bg-card px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground">Nagad</div>
            <div className="bg-card px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground">SSLCommerz</div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;
