

## Full Project Progress Report

### COMPLETED (what's already built)
- Landing page with hero, stats, user types, features, pricing preview, CTA
- Jobs, Courses, Books, Pricing, CV Builder pages (UI only, static data)
- Blog page (static listing) and Certificate Verification page (static form)
- Login and Register pages with role selection (Candidate, Instructor, Employer, Writer)
- Auth system with AuthContext, session management, and role detection
- Database: `profiles` table (user_id, full_name, avatar_url, phone) and `user_roles` table
- `handle_new_user()` trigger function + `has_role()` security definer function
- Navbar: auth-aware (shows user name, role badge, Dashboard link, Sign Out when logged in)
- Footer: Instagram, Blog, Certificate Verification links added
- Role-specific dashboard shells for all 5 roles (Candidate, Instructor, Employer, Writer, Admin)
- Your account set to Admin role
- Design system (Teal/Amber gradients, typography, button variants)

### NOT YET BUILT (remaining for the full platform)
- Candidate public profile system (profile picture, bio, skills, education, experience)
- Employer job posting + applicant viewing system
- Admin dashboard with real CRUD functionality (currently placeholder UI only)
- Real job listings stored in database
- Real course/book content management
- Payment/subscription system
- File storage for profile pictures and documents

---

## YOUR CURRENT REQUEST (what needs to be done now)

### A. Candidate Profile System (Public + Private)

**Database changes:**
1. Expand `profiles` table with new columns: `bio`, `headline`, `location`, `skills` (text array), `education` (jsonb), `experience` (jsonb), `website`, `linkedin_url`, `is_public` (boolean, default true)
2. Create a storage bucket `avatars` for profile picture uploads
3. Create RLS policies:
   - Public profiles: anyone can SELECT profiles where `is_public = true`, but email and phone are hidden
   - Only the profile owner can see their own email/phone
   - Only employers (via `has_role`) can view contact details of candidates who applied to their jobs

**New pages/components:**
- `src/pages/ProfilePage.tsx` -- Public profile view at `/profile/:userId`
  - Shows: avatar, name, headline, bio, skills, education, experience, website, LinkedIn
  - Hides: email, phone (shown only to employers who received an application from this candidate)
  - Shareable URL for social media
- `src/pages/EditProfilePage.tsx` -- Edit profile at `/profile/edit`
  - Upload profile picture (to storage bucket)
  - Edit all profile fields
- Update Candidate Dashboard to include "Edit Profile" and "View Public Profile" links

**Privacy logic:**
- Public view: no email or phone visible
- Employer view: after a candidate applies to their job, the employer can see contact info
- This requires a `job_applications` table (at minimum: id, job_id, candidate_id, employer_id, status, created_at)

### B. Admin Dashboard -- Full CRUD Functionality

Replace all placeholder sections with working features:

**1. User Management Tab (real data)**
- Fetch all users from `profiles` + `user_roles` using an edge function (since admin needs to read all profiles, bypassing RLS)
- Display in a searchable, filterable table
- Admin can change any user's role (update `user_roles`)
- Admin can delete users

**2. Content Management Tab**
- Since jobs/courses/books tables don't exist yet, create placeholder tables:
  - `jobs` table: id, title, company, location, type, salary, description, employer_id, status (pending/approved/rejected), created_at
  - `courses` table: id, title, description, instructor_id, price, status, created_at
  - `books` table: id, title, description, writer_id, price, status, created_at
- Admin can approve/reject/delete content
- RLS: admin has full access, owners can read/update their own

**3. Offers & Banners Tab**
- `offers` table: id, title, code, discount_percent, is_active, start_date, end_date, created_at
- Admin can create, edit, toggle, and delete offers

**4. Analytics Tab**
- Show real counts from database (total users, jobs, courses, books)
- Simple bar/pie charts using recharts (already installed)

**5. Settings Tab**
- Platform settings stored in a `settings` table (key-value pairs)
- Admin can update site name, contact email, etc.

---

## Technical Plan (Implementation Order)

### Step 1: Database Migration
New tables and columns:
```text
-- Expand profiles with bio, headline, location, skills, education, experience, etc.
-- Create jobs table
-- Create courses table  
-- Create books table
-- Create job_applications table
-- Create offers table
-- Create settings table
-- Create avatars storage bucket
-- RLS policies for all new tables
```

### Step 2: Edge Function for Admin Operations
- `admin-users` edge function: list all users with profiles+roles (bypasses RLS using service role key), update roles, delete users

### Step 3: New Files to Create
- `src/pages/ProfilePage.tsx` -- Public candidate profile
- `src/pages/EditProfilePage.tsx` -- Edit profile form with avatar upload
- `src/components/admin/UserManagement.tsx` -- Real user table with role editing
- `src/components/admin/ContentManagement.tsx` -- Jobs/courses/books moderation
- `src/components/admin/OffersManagement.tsx` -- CRUD for offers/banners
- `src/components/admin/AnalyticsPanel.tsx` -- Real stats with charts
- `src/components/admin/SettingsPanel.tsx` -- Platform settings

### Step 4: Files to Modify
- `src/pages/DashboardPage.tsx` -- Replace placeholder admin tabs with real components; add profile links to Candidate dashboard
- `src/App.tsx` -- Add `/profile/:userId` and `/profile/edit` routes

### Step 5: Storage Setup
- Create `avatars` bucket (public) for profile pictures
- Profile picture upload component with preview and crop

This is a large feature set. Implementation will be done in stages, starting with the database schema, then the candidate profile system, then the admin CRUD features.

