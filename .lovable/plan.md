

## Current Status

### Completed
- Landing, Jobs, Courses, Books, Pricing, CV Builder pages with full UI
- Design system (colors, typography, gradients, button variants)
- Navbar, Footer (with flash sale banner), Layout component
- Login and Register pages with role selection
- Auth context with role detection
- Database tables: `profiles`, `user_roles` with RLS policies
- `handle_new_user()` function exists in DB
- Role-specific dashboard shells (Candidate, Instructor, Employer, Writer, Admin)

### Issues Found
1. **Database trigger missing** -- The `handle_new_user()` function exists but is NOT attached as a trigger to `auth.users`. New signups don't auto-create profiles/roles.
2. **Navbar ignores auth state** -- Always shows "Sign In / Get Started" even when logged in. Should show user name, role badge, and sign-out button.
3. **User has wrong role** -- You're currently assigned "writer" but need to be "admin".

---

## What Will Be Done

### 1. Fix the database trigger (so new users get roles assigned automatically)
- Create the missing trigger: `on_auth_user_created AFTER INSERT ON auth.users` that calls `handle_new_user()`.

### 2. Assign you as Admin
- Update your role from "writer" to "admin" in the `user_roles` table.

### 3. Update Navbar to show auth state
- When logged in: show user name, role badge, Dashboard link, and Sign Out button.
- When logged out: show Sign In / Get Started (current behavior).

### 4. Build full Admin Dashboard
- System overview cards (total users, jobs, courses, revenue)
- User management section (view all users, change roles)
- Content moderation section placeholder
- Flash sale / offer banner management placeholder
- Full administrative controls

### 5. Add Instagram to social links (Footer)
- Add Instagram icon alongside Facebook, LinkedIn, YouTube.

### 6. Add Blog page and route
- Create `/blog` page as a subsite with a blog listing layout.
- Add Blog link to Navbar and Footer.

### 7. Add Certificate Verification link in Footer
- Add a "Verify Certificate" link above the Contact section in the footer.
- Create a `/verify-certificate` page with a verification form (enter certificate ID to check).

---

## Technical Details

### Database Changes
```sql
-- 1. Create missing trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Update your role to admin
UPDATE public.user_roles
SET role = 'admin'
WHERE user_id = '1d8ff678-f2e2-4336-b5d5-55e89d08312c';
```

### Files to Create
- `src/pages/BlogPage.tsx` -- Blog listing page
- `src/pages/CertificateVerifyPage.tsx` -- Certificate verification page

### Files to Modify
- `src/components/Navbar.tsx` -- Add auth-aware rendering (user menu when logged in, blog link)
- `src/components/Footer.tsx` -- Add Instagram, Blog link, Certificate Verification link
- `src/pages/DashboardPage.tsx` -- Expand Admin dashboard with management features
- `src/App.tsx` -- Add `/blog` and `/verify-certificate` routes

