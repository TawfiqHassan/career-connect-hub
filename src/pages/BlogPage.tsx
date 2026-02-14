import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 In-Demand Skills for 2026 in Bangladesh",
    excerpt: "Discover the most sought-after skills that employers in Bangladesh are looking for this year.",
    category: "Career Tips",
    author: "CarriTiq Team",
    date: "Feb 10, 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "How to Build a Winning CV That Gets Noticed",
    excerpt: "Expert tips on crafting a professional CV that stands out from the competition.",
    category: "CV Tips",
    author: "HR Expert",
    date: "Feb 8, 2026",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "The Future of Remote Work in Bangladesh",
    excerpt: "How remote work is reshaping the job market and what it means for your career.",
    category: "Industry Trends",
    author: "CarriTiq Team",
    date: "Feb 5, 2026",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Top Certifications That Boost Your Salary",
    excerpt: "Investing in the right certifications can significantly increase your earning potential.",
    category: "Certifications",
    author: "Career Coach",
    date: "Feb 2, 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Interview Preparation: A Complete Guide",
    excerpt: "Master your next job interview with these proven strategies and techniques.",
    category: "Career Tips",
    author: "CarriTiq Team",
    date: "Jan 28, 2026",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Freelancing vs Full-Time: Which Path is Right for You?",
    excerpt: "Compare the pros and cons of freelancing and traditional employment in Bangladesh.",
    category: "Industry Trends",
    author: "Career Coach",
    date: "Jan 25, 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
  },
];

const BlogPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-heading mb-3">
            Carri<span className="text-primary">Tiq</span> Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Career tips, industry insights, and expert advice to help you build a successful career in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit mb-2 text-xs">{post.category}</Badge>
                <CardTitle className="text-lg leading-snug line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                </div>
                <Button variant="link" className="mt-3 p-0 h-auto text-primary">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
