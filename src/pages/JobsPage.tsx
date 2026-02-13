import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, MapPin, Briefcase, Clock, Building2, Filter, ChevronDown,
  BookmarkPlus, ArrowRight, Star
} from "lucide-react";
import Layout from "@/components/Layout";

const jobCategories = ["All", "IT & Software", "Marketing", "Finance", "Engineering", "Healthcare", "Education", "Design"];

const mockJobs = [
  {
    id: 1, title: "Senior React Developer", company: "Tech Solutions BD", location: "Dhaka",
    type: "Full-time", salary: "৳80,000 - ৳1,20,000", posted: "2 hours ago",
    tags: ["React", "TypeScript", "Node.js"], featured: true,
  },
  {
    id: 2, title: "Digital Marketing Manager", company: "GrowthLab", location: "Chattogram",
    type: "Full-time", salary: "৳50,000 - ৳70,000", posted: "5 hours ago",
    tags: ["SEO", "Social Media", "Analytics"], featured: false,
  },
  {
    id: 3, title: "UI/UX Designer", company: "DesignHub BD", location: "Remote",
    type: "Contract", salary: "৳60,000 - ৳90,000", posted: "1 day ago",
    tags: ["Figma", "UI Design", "Prototyping"], featured: true,
  },
  {
    id: 4, title: "Data Analyst", company: "FinCorp Bangladesh", location: "Dhaka",
    type: "Full-time", salary: "৳45,000 - ৳65,000", posted: "1 day ago",
    tags: ["Python", "SQL", "Power BI"], featured: false,
  },
  {
    id: 5, title: "Content Writer", company: "MediaPress", location: "Remote",
    type: "Part-time", salary: "৳25,000 - ৳35,000", posted: "2 days ago",
    tags: ["Content", "SEO Writing", "English"], featured: false,
  },
  {
    id: 6, title: "Mobile App Developer", company: "AppWorks Ltd", location: "Dhaka",
    type: "Full-time", salary: "৳70,000 - ৳1,00,000", posted: "3 days ago",
    tags: ["Flutter", "React Native", "Firebase"], featured: true,
  },
];

const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-2">
            Find Your Dream <span className="text-gradient-primary">Job</span>
          </h1>
          <p className="text-muted-foreground mb-6">Browse 12,500+ job opportunities across Bangladesh</p>

          <div className="bg-card rounded-xl p-3 shadow-md border border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                placeholder="Job title, company, or keyword..."
                className="border-0 shadow-none focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 px-3">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                placeholder="Location"
                className="border-0 shadow-none focus-visible:ring-0 w-40"
              />
            </div>
            <Button variant="hero" size="lg">
              <Search className="h-4 w-4" /> Search Jobs
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {jobCategories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{mockJobs.length}</span> jobs</p>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" /> Filters <ChevronDown className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-card rounded-xl p-5 border transition-all hover:shadow-md ${
                  job.featured ? "border-primary/30 shadow-sm" : "border-border"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {job.featured && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          <Star className="h-3 w-3" /> Featured
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{job.posted}</span>
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-foreground mb-1">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                      <span className="font-semibold text-foreground">{job.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-secondary px-2.5 py-1 rounded-md text-secondary-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="icon">
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                    <Button variant="hero" size="sm">
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline-primary" size="lg">Load More Jobs</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobsPage;
