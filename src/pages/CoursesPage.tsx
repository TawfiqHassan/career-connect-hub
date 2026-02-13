import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, Clock, Users, Star, Play, BookOpen, Filter, ArrowRight, BadgeCheck
} from "lucide-react";
import Layout from "@/components/Layout";

const categories = ["All", "Web Development", "Data Science", "Marketing", "Design", "Business", "Language"];

const mockCourses = [
  {
    id: 1, title: "Complete React & Next.js Mastery", instructor: "Rafiq Ahmed",
    rating: 4.8, students: 2340, duration: "42 hours", price: "৳1,999", originalPrice: "৳3,999",
    category: "Web Development", level: "Intermediate", image: "🖥️", pro: true,
  },
  {
    id: 2, title: "Digital Marketing A-Z Guide", instructor: "Nusrat Jahan",
    rating: 4.6, students: 5120, duration: "28 hours", price: "৳999", originalPrice: "৳1,999",
    category: "Marketing", level: "Beginner", image: "📱", pro: false,
  },
  {
    id: 3, title: "Python for Data Science", instructor: "Kamal Hossain",
    rating: 4.9, students: 3890, duration: "36 hours", price: "৳2,499", originalPrice: "৳4,999",
    category: "Data Science", level: "Beginner", image: "🐍", pro: true,
  },
  {
    id: 4, title: "UI/UX Design Fundamentals", instructor: "Tasnim Akter",
    rating: 4.7, students: 1890, duration: "20 hours", price: "Free", originalPrice: "",
    category: "Design", level: "Beginner", image: "🎨", pro: false,
  },
  {
    id: 5, title: "Business English Communication", instructor: "Shahid Rahman",
    rating: 4.5, students: 6700, duration: "15 hours", price: "৳499", originalPrice: "৳999",
    category: "Language", level: "All Levels", image: "🗣️", pro: false,
  },
  {
    id: 6, title: "Advanced Excel & Data Analytics", instructor: "Meherun Nessa",
    rating: 4.8, students: 4200, duration: "24 hours", price: "৳1,499", originalPrice: "৳2,999",
    category: "Business", level: "Advanced", image: "📊", pro: true,
  },
];

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <Layout>
      <section className="gradient-hero py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-2">
            Learn & <span className="text-gradient-primary">Grow</span>
          </h1>
          <p className="text-muted-foreground mb-6">450+ courses from top instructors across Bangladesh</p>
          <div className="bg-card rounded-xl p-3 shadow-md border border-border flex flex-col md:flex-row gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search courses..." className="border-0 shadow-none focus-visible:ring-0" />
            </div>
            <Button variant="hero" size="lg">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {categories.map((cat) => (
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <div key={course.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-44 bg-secondary flex items-center justify-center text-6xl relative">
                  {course.image}
                  {course.pro && (
                    <span className="absolute top-3 right-3 gradient-pro text-pro-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <BadgeCheck className="h-3 w-3" /> PRO
                    </span>
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground">{course.level}</span>
                    <span className="text-xs text-muted-foreground">{course.category}</span>
                  </div>
                  <h3 className="font-semibold font-heading text-foreground mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> {course.instructor}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning" /> {course.rating}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.students.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${course.price === "Free" ? "text-success" : "text-foreground"}`}>{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                      )}
                    </div>
                    <Button variant="hero" size="sm">Enroll <ArrowRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoursesPage;
