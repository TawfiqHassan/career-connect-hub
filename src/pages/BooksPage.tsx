import { Button } from "@/components/ui/button";
import { BookOpen, Star, Users, ShoppingCart, ArrowRight, BadgeCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

const mockBooks = [
  {
    id: 1, title: "Mastering JavaScript: From Zero to Hero", author: "Imran Kabir",
    rating: 4.7, readers: 1200, price: "৳350", originalPrice: "৳699", image: "📘",
    category: "Programming", pro: true,
  },
  {
    id: 2, title: "ক্যারিয়ার গাইড: সফল পেশাদারদের গল্প", author: "Sumaiya Akter",
    rating: 4.9, readers: 3400, price: "Free", originalPrice: "", image: "📗",
    category: "Career", pro: false,
  },
  {
    id: 3, title: "Data Science with Python Cookbook", author: "Tanvir Hasan",
    rating: 4.6, readers: 890, price: "৳499", originalPrice: "৳999", image: "📙",
    category: "Data Science", pro: true,
  },
  {
    id: 4, title: "Digital Marketing Bangla Guide", author: "Farhana Islam",
    rating: 4.5, readers: 2100, price: "৳199", originalPrice: "৳399", image: "📕",
    category: "Marketing", pro: false,
  },
  {
    id: 5, title: "Professional CV Writing Tips", author: "Sakib Al Hasan",
    rating: 4.8, readers: 5600, price: "Free", originalPrice: "", image: "📒",
    category: "Career", pro: false,
  },
  {
    id: 6, title: "Advanced React Patterns", author: "Nazmul Haque",
    rating: 4.9, readers: 780, price: "৳599", originalPrice: "৳1,199", image: "📓",
    category: "Programming", pro: true,
  },
];

const BooksPage = () => {
  return (
    <Layout>
      <section className="gradient-hero py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-2">
            Books & <span className="text-gradient-primary">Library</span>
          </h1>
          <p className="text-muted-foreground mb-6">Discover books from talented writers. Free, paid, or discounted for Pro users.</p>
          <div className="bg-card rounded-xl p-3 shadow-md border border-border flex flex-col md:flex-row gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search books..." className="border-0 shadow-none focus-visible:ring-0" />
            </div>
            <Button variant="hero" size="lg"><Search className="h-4 w-4" /> Search</Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBooks.map((book) => (
              <div key={book.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 bg-secondary flex items-center justify-center text-7xl relative">
                  {book.image}
                  {book.pro && (
                    <span className="absolute top-3 right-3 gradient-pro text-pro-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <BadgeCheck className="h-3 w-3" /> PRO Discount
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground">{book.category}</span>
                  <h3 className="font-semibold font-heading text-foreground mt-2 mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> {book.author}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning" /> {book.rating}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {book.readers.toLocaleString()} readers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${book.price === "Free" ? "text-success" : "text-foreground"}`}>{book.price}</span>
                      {book.originalPrice && <span className="text-sm text-muted-foreground line-through">{book.originalPrice}</span>}
                    </div>
                    <Button variant="hero" size="sm">
                      {book.price === "Free" ? "Read Free" : <><ShoppingCart className="h-4 w-4" /> Buy</>}
                    </Button>
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

export default BooksPage;
