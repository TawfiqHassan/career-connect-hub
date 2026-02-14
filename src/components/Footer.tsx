import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, Instagram, Zap, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Offer Banner */}
      <div className="gradient-accent py-3">
        <div className="container flex items-center justify-center gap-2 text-sm font-semibold text-accent-foreground">
          <Zap className="h-4 w-4" />
          🔥 Flash Sale! Get 50% off on Pro Plan — Use code <span className="font-bold underline">CAREER50</span> — Limited Time!
          <Zap className="h-4 w-4" />
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold font-heading">
                Carri<span className="text-primary">Tiq</span>
              </span>
            </Link>
            <p className="text-sm opacity-70 mb-4">
              Bangladesh's leading career platform. Build your future with jobs, courses, and skills.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/jobs" className="hover:opacity-100 transition-opacity">Browse Jobs</Link></li>
              <li><Link to="/cv-builder" className="hover:opacity-100 transition-opacity">CV Builder</Link></li>
              <li><Link to="/courses" className="hover:opacity-100 transition-opacity">Courses</Link></li>
              <li><Link to="/books" className="hover:opacity-100 transition-opacity">Books</Link></li>
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/register" className="hover:opacity-100 transition-opacity">Post a Job</Link></li>
              <li><Link to="/pricing" className="hover:opacity-100 transition-opacity">Recruiter Plans</Link></li>
              <li><Link to="/register" className="hover:opacity-100 transition-opacity">Find Candidates</Link></li>
              <li><Link to="/register" className="hover:opacity-100 transition-opacity">Become Instructor</Link></li>
              <li><Link to="/register" className="hover:opacity-100 transition-opacity">Publish a Book</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Verification</h4>
            <ul className="space-y-2 text-sm opacity-70 mb-6">
              <li>
                <Link to="/verify-certificate" className="hover:opacity-100 transition-opacity flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  Verify Certificate
                </Link>
              </li>
            </ul>

            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                support@carritiq.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                +880 1XXX-XXXXXX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-50">
          <p>© 2026 CarriTiq. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
