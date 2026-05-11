# SOOT Operating System - Complete Build Prompt

You are building a complete Operating System for "School of Odd Thinkers (SOOT)" — a digital marketing academy in Jodhpur, India.

This is NOT just an LMS. This is a complete business operating system that handles:
- Student lifecycle (lead → enrolled → learning → certified → alumni)
- Course delivery & progress tracking
- Payments & billing
- Live classes & scheduling
- Marketing automation
- Admin operations & analytics
- Trainer management
- Community & engagement

---

## 🎯 PROJECT NAME: SOOT Operating System (SOOT OS)

---

## 🏗️ TECH STACK (ALL FREE TIER)

### Frontend:
- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS + shadcn/ui components
- React Hook Form + Zod (form validation)

### Backend & Infrastructure:
- **Supabase** (Free tier: 500MB DB, 1GB file storage, 2GB bandwidth)
  - PostgreSQL database
  - File storage (videos, PDFs, certificates)
  - Edge Functions (serverless functions)
  - Realtime subscriptions

### Authentication:
- **Clerk** (Free tier: 10,000 monthly active users)
  - Email/password login
  - Phone OTP login
  - Social logins (Google, Facebook)
  - Role-based access control
  - User management UI

### Analytics:
- **PostHog** (Free tier: 1M events/month)
  - User behavior tracking
  - Session recordings
  - Feature flags
  - A/B testing
  - Funnels & retention

### Email:
- **Resend** (Free tier: 3,000 emails/month)
  - Transactional emails
  - Email templates (React Email)
  - Deliverability tracking

### WhatsApp:
- **Green API** (Free tier: 100 messages/day)
  - OR Baileys (Open-source WhatsApp Web API - completely free)
  - Send WhatsApp messages
  - Message templates

### Payment:
- **Razorpay** (No monthly fee, only 2% per transaction)
  - UPI, Cards, Netbanking, Wallets
  - Webhook integration

### Video Hosting:
- **Cloudflare Stream** (Free tier: 1000 minutes storage, 10,000 minutes watched/month)
  - OR YouTube (Unlisted videos - completely free)
  - Video embed
  - Adaptive streaming

### Live Classes:
- **Daily.co** (Free tier: 10 rooms, unlimited participants)
  - OR Whereby (Free tier: 1 room, 4 participants)
  - OR Zoom Free (40-min limit)

### File Storage:
- Supabase Storage (1GB free)
  - PDFs, certificates, assignments

### Certificate Generation:
- jsPDF (free npm package)
  - OR Puppeteer (server-side PDF generation)

### Deployment:
- **Vercel** (Free tier: Unlimited deployments, 100GB bandwidth)
  - Next.js hosting
  - Serverless functions
  - Edge functions

### Monitoring:
- **Sentry** (Free tier: 5,000 errors/month)
  - Error tracking
  - Performance monitoring

---

## 📊 DATABASE SCHEMA (Supabase PostgreSQL)

```sql
-- Note: User authentication is handled by Clerk, but we store additional profile data

-- Table: user_profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'admin', 'trainer')) DEFAULT 'student',
  avatar_url TEXT,
  bio TEXT,
  city TEXT,
  state TEXT,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  thumbnail_url TEXT,
  intro_video_url TEXT,
  price NUMERIC DEFAULT 0,
  discounted_price NUMERIC,
  duration_weeks INTEGER,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  enrollment_count INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: modules
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  video_duration_seconds INTEGER,
  video_platform TEXT CHECK (video_platform IN ('cloudflare', 'youtube', 'vimeo', 'bunny')),
  content TEXT,
  order_index INTEGER NOT NULL,
  is_free_preview BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: lesson_resources
CREATE TABLE lesson_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT CHECK (file_type IN ('pdf', 'doc', 'ppt', 'zip', 'other')),
  file_size_mb NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: enrollments
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  course_id UUID REFERENCES courses(id),
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount_paid NUMERIC,
  currency TEXT DEFAULT 'INR',
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  completion_percentage NUMERIC DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Table: lesson_progress
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  lesson_id UUID REFERENCES lessons(id),
  enrollment_id UUID REFERENCES enrollments(id),
  is_completed BOOLEAN DEFAULT false,
  watch_time_seconds INTEGER DEFAULT 0,
  last_watched_position_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Table: live_classes
CREATE TABLE live_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  meeting_platform TEXT CHECK (meeting_platform IN ('daily', 'whereby', 'zoom', 'meet')),
  meeting_room_url TEXT,
  meeting_id TEXT,
  meeting_password TEXT,
  trainer_id UUID REFERENCES user_profiles(id),
  status TEXT CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')) DEFAULT 'scheduled',
  recording_url TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: live_class_attendees
CREATE TABLE live_class_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_class_id UUID REFERENCES live_classes(id),
  user_id UUID REFERENCES user_profiles(id),
  joined_at TIMESTAMP WITH TIME ZONE,
  left_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  UNIQUE(live_class_id, user_id)
);

-- Table: certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  course_id UUID REFERENCES courses(id),
  certificate_number TEXT UNIQUE NOT NULL,
  certificate_url TEXT NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  verification_code TEXT UNIQUE,
  UNIQUE(user_id, course_id)
);

-- Table: leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT CHECK (status IN ('new', 'contacted', 'interested', 'demo_scheduled', 'enrolled', 'lost')) DEFAULT 'new',
  notes TEXT,
  assigned_to UUID REFERENCES user_profiles(id),
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: lead_activities
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  activity_type TEXT CHECK (activity_type IN ('call', 'email', 'whatsapp', 'meeting', 'note')),
  description TEXT,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error', 'class_reminder', 'assignment_due', 'certificate_issued')),
  action_url TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: assignments
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  max_score INTEGER DEFAULT 100,
  due_date TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: assignment_submissions
CREATE TABLE assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES assignments(id),
  user_id UUID REFERENCES user_profiles(id),
  submission_text TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  score INTEGER,
  grade TEXT,
  feedback TEXT,
  graded_by UUID REFERENCES user_profiles(id),
  graded_at TIMESTAMP WITH TIME ZONE,
  status TEXT CHECK (status IN ('submitted', 'graded', 'revision_requested')) DEFAULT 'submitted',
  UNIQUE(assignment_id, user_id)
);

-- Table: quizzes
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INTEGER DEFAULT 70,
  time_limit_minutes INTEGER,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: quiz_questions
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer')),
  options JSONB,
  correct_answer TEXT,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER
);

-- Table: quiz_attempts
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id),
  user_id UUID REFERENCES user_profiles(id),
  score INTEGER,
  total_points INTEGER,
  percentage NUMERIC,
  answers JSONB,
  passed BOOLEAN,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Table: discussions
CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  lesson_id UUID REFERENCES lessons(id),
  user_id UUID REFERENCES user_profiles(id),
  title TEXT,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: discussion_replies
CREATE TABLE discussion_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: email_logs
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  email_type TEXT,
  subject TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT CHECK (status IN ('sent', 'failed', 'bounced')) DEFAULT 'sent',
  error_message TEXT
);

-- Table: whatsapp_logs
CREATE TABLE whatsapp_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  phone TEXT,
  message_type TEXT,
  message_content TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT CHECK (status IN ('sent', 'delivered', 'failed')) DEFAULT 'sent',
  error_message TEXT
);

-- Table: referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES user_profiles(id),
  referred_email TEXT,
  referred_phone TEXT,
  status TEXT CHECK (status IN ('pending', 'signed_up', 'enrolled')) DEFAULT 'pending',
  reward_earned NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: coupons
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  applicable_courses UUID[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: coupon_usage
CREATE TABLE coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID REFERENCES coupons(id),
  user_id UUID REFERENCES user_profiles(id),
  enrollment_id UUID REFERENCES enrollments(id),
  discount_amount NUMERIC,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_is_published ON courses(is_published);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_live_classes_scheduled_at ON live_classes(scheduled_at);
```

---

## 🔐 ROW LEVEL SECURITY (Supabase RLS Policies)

Enable RLS on ALL tables.

### user_profiles:
- SELECT: Public can read (for displaying instructor names)
- INSERT/UPDATE: Only the user themselves OR admin
- DELETE: Only admin

### courses, modules, lessons:
- SELECT: Public can read if is_published = true
- INSERT/UPDATE/DELETE: Only admin or assigned trainer

### enrollments:
- SELECT: User can see their own enrollments OR admin can see all
- INSERT: User enrolling themselves OR admin
- UPDATE: Only admin (for payment status)

### lesson_progress:
- SELECT/INSERT/UPDATE: User can only access their own progress OR admin

### notifications:
- SELECT/UPDATE: User can only see their own notifications OR admin
- INSERT: Admin or system (via Edge Functions)

### assignments, assignment_submissions:
- SELECT: Enrolled students + trainers + admin
- INSERT: Students (submissions) / Admin (assignments)
- UPDATE: Admin and trainers (grading)

### All other tables: Similar role-based policies

---

## 🎨 USER INTERFACES TO BUILD

### 1️⃣ PUBLIC WEBSITE (Marketing Side)

#### Routes:

**/ - Homepage**
- Hero section with CTA "Start Learning" (Clerk SignUp button)
- Featured courses carousel
- Stats (500+ students, 50+ courses, etc.)
- Testimonials
- Why SOOT section
- CTA section

**/courses - Course catalog**
- Grid of all published courses
- Filter by category, difficulty
- Search bar
- Sort by: Popular, Newest, Price

**/courses/[slug] - Course detail page**
- Course hero (title, price, thumbnail, instructor)
- "Enroll Now" button (if not enrolled) → Opens Razorpay
- "Continue Learning" button (if enrolled) → Go to course player
- Course curriculum (modules & lessons accordion)
- Free preview lessons (video modal)
- Course description
- What you'll learn
- Requirements
- Instructor bio
- Reviews/ratings
- Related courses

**/about** - About SOOT

**/contact** - Contact form (saves to leads table + sends email via Resend)

**/blog** - Blog posts (optional)

**/sign-in** - Clerk login page

**/sign-up** - Clerk signup page

---

### 2️⃣ STUDENT DASHBOARD (/dashboard)

**Layout:** Sidebar + Top navbar with user menu (Clerk UserButton)

#### Sidebar Navigation:
- 🏠 Dashboard (overview)
- 📚 My Courses
- 🎥 Live Classes
- 📝 Assignments
- 🏆 Certificates
- 💬 Discussions
- 👤 Profile Settings

#### /dashboard - Overview
- Welcome message: "Welcome back, {firstName}!"
- Continue Learning section (enrolled courses with progress)
- Upcoming Live Classes (next 3)
- Recent Notifications
- Learning Stats (total hours, completed lessons, certificates earned)

#### /dashboard/courses - My Courses
- Grid of enrolled courses
- Each card shows: thumbnail, title, progress bar, "Continue" button
- Click → Go to course player

#### /dashboard/courses/[slug] - Course Player
**Left sidebar:** Course curriculum (modules & lessons)
- Click lesson → Load video player
- Completed lessons show checkmark ✓
- Locked lessons show lock icon 🔒 (if sequential unlock enabled)

**Main content area:**
- Video player (Cloudflare Stream embed or YouTube embed)
- Lesson title & description
- "Mark as Complete" button (if not auto-marked)
- "Previous Lesson" | "Next Lesson" buttons
- Resources section (Download PDFs)
- Discussions (lesson-specific comments)

**Right sidebar (optional):**
- Course progress: X% complete
- Upcoming assignments
- Trainer info

#### /dashboard/live-classes - Live Classes
- Tabs: Upcoming | Past | Recordings
- Upcoming classes table:
  - Date, Time, Title, Trainer, "Join Class" button
  - Countdown timer (if starting soon)
- Past classes: Recording links (if available)

#### /dashboard/assignments - Assignments
- Tabs: Pending | Submitted | Graded
- Pending: Assignment card with due date, "Submit" button
- Submit modal: Text area + file upload → Save to assignment_submissions
- Graded: Show score, feedback, download submission

#### /dashboard/certificates - Certificates
- Grid of completed courses with certificate cards
- "Download Certificate" button (generates PDF on-demand or retrieves cached)
- Certificate preview modal

#### /dashboard/discussions - Discussions (Community Forum)
- List of discussion threads (course-wise or global)
- "New Discussion" button
- Click thread → View discussion + replies
- Reply form

#### /dashboard/profile - Profile Settings (Clerk UserProfile component)
- Clerk handles: Name, email, phone, password, avatar
- Additional fields: Bio, City, State → Save to user_profiles

---

### 3️⃣ ADMIN DASHBOARD (/admin)

**Protected:** Only users with role = 'admin' in user_profiles

#### Sidebar Navigation:
- 📊 Dashboard (Analytics)
- 📚 Courses
- 👥 Students
- 🎯 Leads & CRM
- 🎥 Live Classes
- 💳 Payments
- 📧 Communications
- 🏆 Certificates
- 🎟️ Coupons
- ⚙️ Settings

#### /admin - Analytics Dashboard
**KPI cards:**
- Total Revenue (this month, all-time)
- Active Students
- New Enrollments (this month)
- Conversion Rate (leads → enrollments)

**Charts (use Recharts library):**
- Revenue over time (line chart - last 6 months)
- Enrollments trend (line chart)
- Top courses by enrollment (bar chart)
- Traffic sources (pie chart from leads.source)

**Tables:**
- Recent Enrollments (student name, course, amount, date)
- Upcoming Live Classes
- Pending Assignments (need grading)

**PostHog Analytics Integration:**
- Embedded PostHog dashboard
- Or link to PostHog dashboard

#### /admin/courses - Course Management
- "Create New Course" button
- Table: All courses (title, price, enrollments, status, actions)
- Actions: Edit, Delete, Publish/Unpublish

#### /admin/courses/new - Create Course
- Form: Title, Slug (auto-generate from title), Description, Thumbnail upload
- Price, Discounted Price, Duration, Difficulty, Category
- "Save Draft" | "Publish" buttons

#### /admin/courses/[id]/edit - Edit Course
- Same form as Create
- Tabs:
  - Basic Info
  - Curriculum (add/edit modules & lessons)
  - Pricing
  - SEO Settings

**Curriculum Tab:**
- List of modules (drag-drop reorder)
- "Add Module" button
- Each module expands to show lessons
- "Add Lesson" button per module
- Edit Lesson modal:
  - Title, Description
  - Video URL (paste Cloudflare/YouTube link)
  - Video duration (auto-detect if possible)
  - Rich text editor for content
  - Upload resources (PDFs) → Supabase Storage
  - "Add Assignment" checkbox (opens assignment form)
  - "Add Quiz" checkbox (opens quiz builder)
  - Is Free Preview?
  - Order index (drag-drop reorder)

#### /admin/students - Student Management
- Table: All users with role = 'student'
  - Name, Email, Phone, Enrolled Courses, Status, Actions
- Search & Filter
- Actions: View Profile, Deactivate, Manual Enroll, Send Email
- "Manual Enroll" → Select student + course → Create enrollment (payment_status = 'completed', amount_paid = 0 or discounted)

#### /admin/students/[id] - Student Profile
- Student details
- Enrolled courses with progress
- Payment history
- Activity log
- Send email/WhatsApp button

#### /admin/leads - Leads & CRM
- Table: All leads
  - Name, Email, Phone, Source, Status, Assigned To, Created Date, Actions
- Filter by Status, Source, Assigned To
- Actions: Call, Email, WhatsApp, Convert to Student, Add Note, Delete
- "Convert to Student" → Create Clerk account + Create user_profile + Manual enroll in course
- Kanban board view (optional): Drag leads between status columns

#### /admin/leads/[id] - Lead Detail
- Lead info form (editable)
- Activity timeline (calls, emails, notes)
- "Add Activity" button
- "Convert to Student" button

#### /admin/live-classes - Live Classes Management
- "Schedule New Class" button
- Table: All classes (Upcoming | Past)
- Edit/Cancel class

#### /admin/live-classes/new - Schedule Live Class
- Form:
  - Course (dropdown)
  - Title, Description
  - Date & Time (datetime picker)
  - Duration (minutes)
  - Meeting Platform (Daily.co / Whereby / Zoom)
  - Auto-generate meeting room (integrate with chosen platform API)
  - Trainer (dropdown)
- Save → Creates live_class record
- Automation: 1 hour before → Send email + WhatsApp to all enrolled students

#### /admin/payments - Payments & Revenue
- Table: All enrollments with payment details
  - Student, Course, Amount, Payment ID, Status, Date
- Export to CSV
- Razorpay webhook logs (for debugging)

#### /admin/communications - Email & WhatsApp
- Tabs: Email Templates | WhatsApp Templates | Send Broadcast | Logs

**Email Templates:**
- Pre-built templates (Welcome, Enrollment, Class Reminder, Certificate)
- Edit templates (use React Email components)

**WhatsApp Templates:**
- Pre-approved templates (Green API requires template approval)

**Send Broadcast:**
- Select audience: All students, Specific course, Specific students
- Compose message
- Send via Email or WhatsApp

**Logs:**
- Tables: email_logs, whatsapp_logs
- View sent messages, status, errors

#### /admin/certificates - Certificate Management
- Table: All issued certificates
  - Student, Course, Certificate Number, Issued Date, Download
- "Issue Certificate Manually" button (for edge cases)
- Verify Certificate (by certificate number)

#### /admin/coupons - Coupon Management
- "Create Coupon" button
- Table: All coupons (code, discount, valid until, used/max, status, actions)
- Edit/Deactivate coupon

#### /admin/coupons/new - Create Coupon
- Form:
  - Code (auto-generate or custom)
  - Discount Type (percentage / fixed)
  - Discount Value
  - Valid From/Until
  - Max Uses
  - Applicable Courses (multi-select)
- Save → Creates coupon

#### /admin/settings - System Settings
- School Info (name, logo, contact)
- Email Settings (Resend API key)
- WhatsApp Settings (Green API credentials)
- Payment Settings (Razorpay key)
- PostHog Settings (API key, project ID)
- Video Settings (Cloudflare Stream ID)
- Certificate Template (upload custom template image)

---

### 4️⃣ TRAINER DASHBOARD (/trainer)

**Protected:** Only users with role = 'trainer'

#### Sidebar:
- 📊 Dashboard
- 📚 My Courses
- 🎥 Live Classes
- 📝 Assignments
- 👥 My Students
- 📤 Upload Content

#### /trainer - Dashboard
- My assigned courses
- Upcoming live classes
- Pending assignments to grade
- Student engagement stats

#### /trainer/courses - My Courses
- List of courses where created_by = trainer's user ID
- View course curriculum
- Basic analytics (enrollments, completion rate)

#### /trainer/courses/[id]/content - Upload Content
- Similar to admin's curriculum editor
- Can add/edit modules, lessons, resources
- Upload videos to Supabase Storage (then use Cloudflare Stream or direct Supabase URL)

#### /trainer/live-classes - My Live Classes
- Schedule new class
- View upcoming/past classes
- Start/Join class button

#### /trainer/assignments - Assignments
- Tabs: Pending Grading | Graded
- View submissions
- Provide score, grade, feedback
- Save → Updates assignment_submissions

#### /trainer/students - My Students
- List of students enrolled in trainer's courses
- View progress, contact info
- Send email/message

---

## ⚙️ KEY FEATURES TO IMPLEMENT

### 🔐 AUTHENTICATION FLOW (Clerk)

1. User signs up via Clerk (email/password or social login)
2. Clerk webhook triggers → Create user_profile in Supabase
3. Default role = 'student'
4. Admin can change role via admin dashboard

**Clerk Configuration:**
- Enable email/password, Google, Facebook login
- Setup webhook to sync users to Supabase
- Customize sign-up fields (phone number)
- Setup redirect URLs after sign-in/sign-up

**Role-Based Access:**
- Use Clerk's publicMetadata to store role
- OR store role in Supabase user_profiles (sync via webhook)
- Protect routes using Clerk's middleware
- Example:
  - /dashboard → Requires authentication
  - /admin → Requires role = 'admin'
  - /trainer → Requires role = 'trainer'

---

### 💳 PAYMENT FLOW (Razorpay)

User clicks "Enroll Now" on course page:

**Frontend:**
1. Check if user is logged in (Clerk)
   - If not → Redirect to /sign-in
2. Check if user already enrolled
   - If yes → Show "Continue Learning" instead
3. User clicks "Enroll Now"
4. Call your Next.js API route: POST /api/payment/create-order
   - Body: { courseId, couponCode (optional) }
5. API creates Razorpay order:
   - Calculate amount (apply coupon if valid)
   - Create enrollment record (payment_status = 'pending')
   - Create Razorpay order via Razorpay API
   - Return: { orderId, amount, currency }
6. Frontend opens Razorpay checkout modal
7. User completes payment
8. Razorpay sends payment_id, order_id, signature to frontend
9. Frontend calls: POST /api/payment/verify
   - Body: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
10. API verifies signature (Razorpay SDK)
11. If valid:
    - Update enrollment (payment_status = 'completed', razorpay_payment_id)
    - Send welcome email (Resend)
    - Send WhatsApp message (Green API)
    - Create notification
    - Return success
12. Frontend redirects to /dashboard/courses/[slug]

**Webhook (for redundancy):**
- Razorpay webhook endpoint: POST /api/webhooks/razorpay
- Listens for payment.captured, payment.failed events
- Updates enrollment status accordingly

---

### 📹 VIDEO PLAYER & PROGRESS TRACKING

**Option A: Cloudflare Stream (Recommended)**
- Admin uploads video to Cloudflare Stream via API
- Store Cloudflare video UID in lessons.video_url
- Embed using Cloudflare Stream iframe
- Features: Adaptive streaming, thumbnail generation, analytics

**Option B: YouTube Unlisted**
- Admin uploads video to YouTube (unlisted)
- Paste YouTube URL in lessons.video_url
- Embed using YouTube iframe API
- Features: Free, reliable, but less control

**Option C: Supabase Storage Direct**
- Upload MP4 to Supabase Storage
- Store public URL in lessons.video_url
- Use HTML5 <video> tag or React Player
- Cons: No adaptive streaming, higher bandwidth cost

**Progress Tracking:**
- Use video player API (Cloudflare Stream SDK or YouTube IFrame API)
- Track current time every 5 seconds → Update lesson_progress.last_watched_position_seconds
- On pause/end → Save progress
- When 90% watched → Auto-mark as complete
- OR user clicks "Mark as Complete" button
- When marked complete:
  - Update lesson_progress.is_completed = true
  - Recalculate enrollment.completion_percentage
  - If 100% → Trigger certificate generation

---

### 🎓 CERTIFICATE GENERATION

**Trigger:** enrollment.completion_percentage = 100

**Backend Function (Edge Function or API route):**
1. Check if certificate already exists for user+course
2. If not:
   - Generate unique certificate_number: SOOT-2026-XXXX
   - Generate verification_code (UUID)
   - Create certificate PDF:
     
     **Option A: jsPDF (Client-side or server-side)**
     - Use certificate template image as background
     - Overlay text: Student name, Course name, Date
     - Generate PDF blob
     
     **Option B: Puppeteer (Server-side)**
     - Create HTML template with certificate design
     - Use Puppeteer to render HTML to PDF
     - More flexible for complex designs
     
   - Upload PDF to Supabase Storage
   - Save certificate URL to certificates table
3. Send email (Resend) with certificate link
4. Send WhatsApp (Green API) with certificate link
5. Create notification

**Certificate Design:**
- Use SOOT branding (logo, colors)
- Professional layout
- Include: Student name, Course title, Completion date, Certificate number
- Optional: QR code linking to /verify/[certificate_number]

**Public Verification Page:**
- Route: /verify/[certificate_number]
- Look up certificate in database
- Display certificate details (name, course, date)
- Show verified badge
- Download link

---

### 📧 EMAIL AUTOMATION (Resend)

**Setup React Email templates:**
- emails/welcome.tsx
- emails/enrollment.tsx
- emails/class-reminder.tsx
- emails/certificate.tsx

**Email Triggers:**
1. After Clerk signup → Send welcome email
2. After payment completed → Send enrollment email (course access)
3. 1 hour before live class → Send class reminder
4. After certificate issued → Send certificate email

**Implementation:**
- Use Resend SDK in API routes
- Email templates use React Email components
- Track sent emails in email_logs table

**Example: Send Welcome Email**
```typescript
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'School of Odd Thinkers <hello@schoolofoddthinkers.com>',
  to: user.email,
  subject: 'Welcome to SOOT!',
  react: WelcomeEmail({ firstName: user.firstName }),
});
```

---

### 📱 WHATSAPP AUTOMATION (Green API or Baileys)

**Option A: Green API (Easier, Paid after 100 free msgs/day)**
- Setup account at green-api.com
- Get Instance ID and Token
- Use their REST API to send messages

**Option B: Baileys (Free, Open-source)**
- Self-host WhatsApp Web client
- More complex setup but completely free
- No message limits

**WhatsApp Triggers:**
1. After enrollment → "Welcome! Your [Course Name] access is ready. Login: [link]"
2. 1 hour before class → "Reminder: Live class starting soon. Join: [link]"
3. After certificate → "Congratulations! Download certificate: [link]"

**Implementation (Green API):**
```typescript
const sendWhatsApp = async (phone: string, message: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${process.env.GREEN_API_INSTANCE_ID}/sendMessage/${process.env.GREEN_API_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${phone}@c.us`, // Format: 919876543210@c.us
        message: message,
      }),
    }
  );
  return response.json();
};
```

---

### 🎥 LIVE CLASS INTEGRATION

**Option A: Daily.co (Recommended for Free Tier)**
- Free: 10 concurrent rooms, unlimited participants
- Create room via Daily REST API
- Embed using Daily Prebuilt or Daily React SDK

**Flow:**
1. Admin schedules class via /admin/live-classes/new
2. Backend calls Daily API to create room
3. Store room URL in live_classes.meeting_room_url
4. 1 hour before class → Send email + WhatsApp to all enrolled students
5. Student clicks "Join Class" → Redirects to room URL or embedded iframe

**Example: Create Daily Room**
```typescript
const createDailyRoom = async (className: string) => {
  const response = await fetch('https://api.daily.co/v1/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
    },
    body: JSON.stringify({
      name: `soot-${Date.now()}`, // Unique room name
      properties: {
        enable_chat: true,
        enable_screenshare: true,
        enable_recording: 'cloud', // Optional
      },
    }),
  });
  const room = await response.json();
  return room.url; // https://your-domain.daily.co/room-name
};
```

**Option B: Whereby**
- Free: 1 room, 4 participants (very limited)
- Use only if small classes (<4 students)

**Option C: Zoom (If you have Zoom Pro)**
- Integrate Zoom API
- More features but requires paid Zoom account

---

### 📊 ANALYTICS (PostHog)

**Setup:**
1. Create PostHog account (posthog.com)
2. Get Project API Key
3. Install posthog-js in Next.js

**Track Events:**
- Page views (automatic)
- User signup (Clerk webhook → PostHog)
- Course enrollment
- Lesson completed
- Video watched (% completion)
- Quiz taken
- Certificate earned
- Payment completed

**Custom Events:**
```typescript
import posthog from 'posthog-js';

// Track enrollment
posthog.capture('course_enrolled', {
  course_id: course.id,
  course_title: course.title,
  amount_paid: enrollment.amount_paid,
});

// Track lesson completion
posthog.capture('lesson_completed', {
  lesson_id: lesson.id,
  course_id: course.id,
  watch_time: progress.watch_time_seconds,
});
```

**Session Recordings:**
- Enable in PostHog settings
- Records user sessions (GDPR compliant)
- View how users navigate your platform

**Funnels:**
- Track: Landing Page → Sign Up → Course Page → Payment → Enrolled
- Identify drop-off points

**Admin Dashboard:**
- Embed PostHog dashboard in /admin (iframe)
- OR link to PostHog dashboard

---

### 🔔 NOTIFICATIONS SYSTEM

Real-time notifications using Supabase Realtime:

**Frontend (Student Dashboard):**
- Subscribe to notifications table filtered by user_id
- Show notification bell icon with unread count
- Dropdown shows recent notifications
- Click notification → Mark as read, navigate to action_url

**Backend:**
- When event happens (enrollment, class reminder, assignment graded):
  - Insert into notifications table
  - Supabase Realtime broadcasts to subscribed clients
  - User sees notification instantly

**Example: Subscribe to Notifications**
```typescript
const { data, error } = await supabase
  .from('notifications')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(20);

// Real-time subscription
supabase
  .channel('notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`,
  }, (payload) => {
    // Add new notification to state
    setNotifications(prev => [payload.new, ...prev]);
  })
  .subscribe();
```

---

### 🛡️ SECURITY

1. Clerk handles authentication (secure by default)
2. Supabase RLS policies enforce data access rules
3. API routes protected with Clerk middleware
4. Video URLs signed/protected (Cloudflare Stream has built-in protection)
5. Environment variables never exposed to client
6. HTTPS everywhere (Vercel enforces this)
7. Rate limiting on API routes (use Vercel Edge Config or Upstash Redis)
8. Input validation (Zod schemas)
9. SQL injection protection (Supabase client uses parameterized queries)
10. XSS protection (React escapes by default, sanitize rich text content)

---

### 📱 MOBILE OPTIMIZATION

- Use Tailwind's responsive utilities (sm:, md:, lg:, xl:)
- Mobile-first design approach
- Sidebar collapses to hamburger menu on mobile
- Video player responsive (16:9 aspect ratio maintained)
- Touch-friendly buttons (min height 44px)
- Test on actual devices
- Optional: Create Progressive Web App (PWA)
  - Add manifest.json
  - Service worker for offline support
  - "Add to Home Screen" prompt

---

### ⚡ PERFORMANCE

- Use Next.js Image component (automatic optimization)
- Lazy load components (React.lazy, Suspense)
- Server components for static content (Next.js App Router)
- Client components only where interactivity needed
- Database query optimization (use indexes)
- CDN for static assets (Vercel handles this)
- Video streaming (Cloudflare Stream = adaptive bitrate)
- Pagination for long lists (courses, students, etc.)
- Debounce search inputs
- Cache frequently accessed data (use React Query or SWR)

---

## 🚀 DEPLOYMENT & SETUP

### Environment Variables (.env.local):

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (for server-side only)

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=xxx... (server-side only)

# Resend
RESEND_API_KEY=re_...

# Green API (WhatsApp)
GREEN_API_INSTANCE_ID=7103...
GREEN_API_TOKEN=xxx...

# Daily.co (Live Classes)
DAILY_API_KEY=xxx...

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Cloudflare Stream (Optional)
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_STREAM_API_TOKEN=xxx

# App Config
NEXT_PUBLIC_APP_URL=https://soot-os.vercel.app (or your domain)
```

### Deployment Steps:
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!
5. Setup custom domain (schoolofoddthinkers.com)
6. Setup Clerk webhook to sync users to Supabase
7. Setup Razorpay webhook for payment confirmations
8. Test payment flow end-to-end

### Initial Setup:
1. Create first admin user manually in Supabase (set role = 'admin')
2. Login as admin
3. Create first course
4. Test enrollment flow

---

## 📦 FOLDER STRUCTURE

```
soot-os/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx (Clerk)
│   │   │   └── sign-up/[[...sign-up]]/page.tsx (Clerk)
│   │   ├── (public)/
│   │   │   ├── page.tsx (Homepage)
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx (Course catalog)
│   │   │   │   └── [slug]/page.tsx (Course detail)
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (protected)/
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx (Student dashboard layout)
│   │   │   │   ├── page.tsx (Dashboard overview)
│   │   │   │   ├── courses/
│   │   │   │   │   ├── page.tsx (My courses)
│   │   │   │   │   └── [slug]/page.tsx (Course player)
│   │   │   │   ├── live-classes/page.tsx
│   │   │   │   ├── assignments/page.tsx
│   │   │   │   ├── certificates/page.tsx
│   │   │   │   ├── discussions/page.tsx
│   │   │   │   └── profile/page.tsx
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx (Admin dashboard layout)
│   │   │   │   ├── page.tsx (Analytics)
│   │   │   │   ├── courses/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── new/page.tsx
│   │   │   │   │   └── [id]/edit/page.tsx
│   │   │   │   ├── students/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── leads/page.tsx
│   │   │   │   ├── live-classes/page.tsx
│   │   │   │   ├── payments/page.tsx
│   │   │   │   ├── communications/page.tsx
│   │   │   │   ├── certificates/page.tsx
│   │   │   │   ├── coupons/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   └── trainer/
│   │   │       ├── layout.tsx (Trainer dashboard layout)
│   │   │       └── ... (similar to admin, limited access)
│   │   ├── api/
│   │   │   ├── webhooks/
│   │   │   │   ├── clerk/route.ts (Sync users to Supabase)
│   │   │   │   └── razorpay/route.ts (Payment confirmations)
│   │   │   ├── payment/
│   │   │   │   ├── create-order/route.ts
│   │   │   │   └── verify/route.ts
│   │   │   ├── courses/
│   │   │   │   └── [id]/progress/route.ts (Update lesson progress)
│   │   │   ├── certificates/
│   │   │   │   └── generate/route.ts
│   │   │   ├── email/
│   │   │   │   └── send/route.ts
│   │   │   └── whatsapp/
│   │   │       └── send/route.ts
│   │   └── verify/[certificate_number]/page.tsx (Public certificate verification)
│   ├── components/
│   │   ├── ui/ (shadcn/ui components)
│   │   ├── course-card.tsx
│   │   ├── video-player.tsx
│   │   ├── progress-bar.tsx
│   │   ├── sidebar.tsx
│   │   ├── navbar.tsx
│   │   └── ... (other reusable components)
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts (Supabase client)
│   │   │   └── server.ts (Supabase server client)
│   │   ├── clerk.ts (Clerk utilities)
│   │   ├── razorpay.ts (Razorpay utilities)
│   │   ├── resend.ts (Resend email)
│   │   ├── whatsapp.ts (WhatsApp API)
│   │   ├── daily.ts (Daily.co API)
│   │   ├── posthog.ts (PostHog client)
│   │   └── utils.ts (Helper functions)
│   ├── emails/ (React Email templates)
│   │   ├── welcome.tsx
│   │   ├── enrollment.tsx
│   │   ├── class-reminder.tsx
│   │   └── certificate.tsx
│   └── types/
│       └── database.types.ts (Supabase generated types)
├── public/
│   ├── logo.png
│   ├── certificate-template.png
│   └── ... (static assets)
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql (Sample data for testing)
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## ✅ ACCEPTANCE CRITERIA

- ✓ User can sign up via Clerk and auto-sync to Supabase
- ✓ Admin can create a course with modules and lessons in <5 minutes
- ✓ Admin can upload videos (Cloudflare Stream or YouTube)
- ✓ User can browse courses, click "Enroll Now", pay via Razorpay
- ✓ After payment, user auto-enrolled, receives email + WhatsApp
- ✓ User can access course player, watch videos
- ✓ Progress tracked automatically (90% watched = auto-complete)
- ✓ Progress bar updates in real-time
- ✓ When 100% complete → Certificate auto-generates
- ✓ User can download certificate PDF
- ✓ Admin can schedule live class (Daily.co integration)
- ✓ Students receive email + WhatsApp reminder 1 hour before class
- ✓ Students can join class via "Join" button
- ✓ Admin can view analytics (revenue, enrollments, conversions)
- ✓ PostHog tracks all events (signups, enrollments, lessons, payments)
- ✓ Notifications show in real-time (Supabase Realtime)
- ✓ Mobile responsive (test on phone)
- ✓ Fast loading (<3 seconds on 4G)
- ✓ No console errors, no broken links
- ✓ RLS policies tested (students can't see others' data)
- ✓ Payment webhook tested (successful and failed payments)

---

## 🎯 BUILD PRIORITY (MVP First)

### PHASE 1 (Week 1-2): Core Learning Platform
- ✓ Setup Next.js + Clerk + Supabase
- ✓ Database schema creation
- ✓ Clerk webhook (user sync)
- ✓ Public pages (homepage, course catalog, course detail)
- ✓ Admin: Create course, add modules, add lessons
- ✓ Student: View enrolled courses, watch videos
- ✓ Video player with progress tracking
- ✓ Payment integration (Razorpay)
- ✓ Auto-enrollment after payment

### PHASE 2 (Week 3-4): Automation & Certificates
- ✓ Email automation (Resend)
- ✓ WhatsApp automation (Green API)
- ✓ Certificate generation (jsPDF)
- ✓ Download certificate
- ✓ Notifications system (Supabase Realtime)
- ✓ Lead capture forms (contact page)

### PHASE 3 (Week 5-6): Live Classes & CRM
- ✓ Live class scheduling (Daily.co)
- ✓ Class reminders (email + WhatsApp)
- ✓ Admin: Leads & CRM system
- ✓ Convert lead to student
- ✓ Analytics dashboard (PostHog integration)

### PHASE 4 (Week 7-8): Advanced Features
- ✓ Assignments & submissions
- ✓ Quizzes (MCQ, True/False)
- ✓ Discussions forum
- ✓ Trainer dashboard
- ✓ Coupons system
- ✓ Referral system
- ✓ Performance optimization
- ✓ Final testing & bug fixes

---

## 📋 DELIVERABLES

1. Complete Next.js codebase (GitHub repo)
2. Supabase SQL migration files
3. Environment variables template (.env.example)
4. Deployment guide (README.md)
5. Admin setup instructions
6. User manual (for trainers and students)
7. API documentation
8. Testing checklist

---

## 🚀 START BUILDING

**BEGIN WITH PHASE 1.** Build the foundational enrollment and course delivery system first.

Generate all necessary code files following Next.js 14 best practices, TypeScript strict mode, and the folder structure outlined above.

Use modern React patterns (Server Components, Client Components separation).

Implement proper error handling and loading states.

Follow accessibility guidelines (ARIA labels, keyboard navigation).

Write clean, documented code with comments for complex logic.

**NOW START BUILDING!**
