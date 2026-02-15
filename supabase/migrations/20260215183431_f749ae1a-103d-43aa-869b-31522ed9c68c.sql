
-- 1. Expand profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS headline text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS education jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS experience jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT true;

-- 2. Create jobs table
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text,
  type text DEFAULT 'full-time',
  salary text,
  description text,
  employer_id uuid NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved jobs" ON public.jobs FOR SELECT USING (status = 'approved' OR auth.uid() = employer_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Employers can insert their own jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = employer_id);
CREATE POLICY "Employers can update their own jobs" ON public.jobs FOR UPDATE USING (auth.uid() = employer_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete jobs" ON public.jobs FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Create courses table
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor_id uuid NOT NULL,
  price numeric DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved courses" ON public.courses FOR SELECT USING (status = 'approved' OR auth.uid() = instructor_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Instructors can insert their own courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = instructor_id);
CREATE POLICY "Instructors can update their own courses" ON public.courses FOR UPDATE USING (auth.uid() = instructor_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete courses" ON public.courses FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Create books table
CREATE TABLE public.books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  writer_id uuid NOT NULL,
  price numeric DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved books" ON public.books FOR SELECT USING (status = 'approved' OR auth.uid() = writer_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Writers can insert their own books" ON public.books FOR INSERT WITH CHECK (auth.uid() = writer_id);
CREATE POLICY "Writers can update their own books" ON public.books FOR UPDATE USING (auth.uid() = writer_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete books" ON public.books FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Create job_applications table
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_id uuid NOT NULL,
  employer_id uuid NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending','reviewed','shortlisted','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view their own applications" ON public.job_applications FOR SELECT USING (auth.uid() = candidate_id);
CREATE POLICY "Employers can view applications to their jobs" ON public.job_applications FOR SELECT USING (auth.uid() = employer_id);
CREATE POLICY "Admins can view all applications" ON public.job_applications FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Candidates can apply to jobs" ON public.job_applications FOR INSERT WITH CHECK (auth.uid() = candidate_id);
CREATE POLICY "Employers can update application status" ON public.job_applications FOR UPDATE USING (auth.uid() = employer_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete applications" ON public.job_applications FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 6. Create offers table
CREATE TABLE public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  code text UNIQUE,
  discount_percent integer DEFAULT 0,
  is_active boolean DEFAULT true,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active offers" ON public.offers FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert offers" ON public.offers FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update offers" ON public.offers FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete offers" ON public.offers FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 7. Create settings table
CREATE TABLE public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
  ('site_name', 'SkillBD'),
  ('contact_email', 'admin@skillbd.com'),
  ('support_phone', '+880-1234-567890');

-- 8. Update profiles RLS: allow public viewing of public profiles (without phone)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Owner can see everything
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);

-- Public can view public profiles (phone hidden via view/query logic)
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (is_public = true);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete profiles
CREATE POLICY "Admins can delete profiles" ON public.profiles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 9. Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
