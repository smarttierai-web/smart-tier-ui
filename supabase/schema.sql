-- ============================================================
-- 1. PROFILES TABLE (Linked to auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  company_name text,
  email text,
  role text default 'admin',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ============================================================
-- 2. EMPLOYEES TABLE (Recipients)
-- ============================================================
create table if not exists public.employees (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  email text not null,
  campaign_name text default '',
  avatar text default 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
  department text default 'General',
  status text default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.employees enable row level security;

drop policy if exists "Allow read employees" on public.employees;
create policy "Allow read employees" on public.employees for select using (true);

drop policy if exists "Allow insert employees" on public.employees;
create policy "Allow insert employees" on public.employees for insert with check (true);

drop policy if exists "Allow update employees" on public.employees;
create policy "Allow update employees" on public.employees for update using (true);

drop policy if exists "Allow delete employees" on public.employees;
create policy "Allow delete employees" on public.employees for delete using (true);

-- ============================================================
-- 3. REWARDS TABLE (Dynamic Available Rewards Catalog)
-- ============================================================
create table if not exists public.rewards (
  id uuid default gen_random_uuid() primary key,
  tier integer not null,
  title text not null,
  description text default '',
  category text default 'Shopping',
  type text default 'icon',
  image_url text default '',
  icon_bg text default '#EFF6FF',
  icon_svg text default '',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.rewards enable row level security;

drop policy if exists "Allow read rewards" on public.rewards;
create policy "Allow read rewards" on public.rewards for select using (true);

drop policy if exists "Allow insert rewards" on public.rewards;
create policy "Allow insert rewards" on public.rewards for insert with check (true);

drop policy if exists "Allow update rewards" on public.rewards;
create policy "Allow update rewards" on public.rewards for update using (true);

drop policy if exists "Allow delete rewards" on public.rewards;
create policy "Allow delete rewards" on public.rewards for delete using (true);

-- Seed Dynamic Rewards
insert into public.rewards (tier, title, category, type, icon_bg, icon_svg, is_active)
values
  -- Tier 2,500
  (2500, 'Gourmet Artisanal Chocolate Box', 'Dining & Treats', 'icon', '#FEF3C7', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" /><path d="M3 9h18" /><path d="M3 15h18" /></svg>', true),
  (2500, 'Specialty Coffee Bean Roasters Pack', 'Beverages', 'icon', '#EFF6FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>', true),
  (2500, 'Premium Bookstore & Kindle Gift Card', 'Lifestyle', 'icon', '#ECFDF5', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>', true),
  (2500, 'Movie & Streaming Pass Voucher', 'Entertainment', 'icon', '#F3E8FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>', true),

  -- Tier 5,000
  (5000, 'Amazon Shopping Gift Card', 'Shopping', 'icon', '#FEF3C7', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>', true),
  (5000, 'Artisan Coffee Roasters Machine Set', 'Kitchen', 'icon', '#EFF6FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>', true),
  (5000, 'Local Fine Bistro Dining Experience', 'Dining', 'icon', '#ECFDF5', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /></svg>', true),
  (5000, 'Ergonomic Desk Workspace Kit', 'Productivity', 'icon', '#FEF2F2', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', true),

  -- Tier 10,000
  (10000, 'Active Noise Cancelling Wireless Earbuds', 'Electronics', 'icon', '#F3E8FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>', true),
  (10000, 'Luxury 5-Star Wellness & Spa Retreat', 'Wellness', 'icon', '#EFF6FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>', true),
  (10000, 'Smart Home Voice Assistant Speaker Hub', 'Smart Home', 'icon', '#ECFDF5', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="14" r="4" /><line x1="12" y1="6" x2="12.01" y2="6" /></svg>', true),
  (10000, 'Apple Watch / Smart Fitness Tracker', 'Wearables', 'icon', '#FEF3C7', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="16" rx="3"/><path d="M9 4V1h6v3"/><path d="M9 20v3h6v-3"/></svg>', true);

print('Successfully updated supabase/schema.sql with dynamic rewards!')


-- ============================================================
-- 3. REWARDS TABLE (Dynamic Available Rewards)
-- ============================================================
create table if not exists public.rewards (
  id uuid default gen_random_uuid() primary key,
  tier integer not null, -- 2500, 5000, 10000, etc.
  title text not null,
  type text default 'icon', -- 'image' or 'icon'
  image text,
  icon_bg text default '#EEF2FF',
  icon_svg text,
  badge text default 'Curated',
  category text default 'General',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.rewards enable row level security;
drop policy if exists "Allow read rewards" on public.rewards;
create policy "Allow read rewards" on public.rewards for select using (true);
drop policy if exists "Allow insert rewards" on public.rewards;
create policy "Allow insert rewards" on public.rewards for insert with check (true);
drop policy if exists "Allow update rewards" on public.rewards;
create policy "Allow update rewards" on public.rewards for update using (true);
drop policy if exists "Allow delete rewards" on public.rewards;
create policy "Allow delete rewards" on public.rewards for delete using (true);

-- Insert seed dynamic rewards
insert into public.rewards (tier, title, type, icon_bg, icon_svg, badge, category)
values
  -- Tier 2500
  (2500, 'Gourmet Chocolate Box', 'icon', '#FEF3C7', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18" /><path d="M15 3v18" /><path d="M3 9h18" /><path d="M3 15h18" /></svg>', 'Curated', 'Food & Dining'),
  (2500, 'Book Store Gift Card', 'icon', '#EFF6FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>', 'Curated', 'Lifestyle'),
  (2500, 'Artisan Coffee Roasters Bag', 'icon', '#FEF2F2', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>', 'Curated', 'Food & Dining'),
  (2500, 'Movie Nights Duo Pass', 'icon', '#F3E8FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></svg>', 'Popular', 'Entertainment'),

  -- Tier 5000
  (5000, 'Amazon / Flipkart Voucher', 'icon', '#EEF2FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>', 'Most Claimed', 'Shopping'),
  (5000, 'Premium Coffee Machine Set', 'icon', '#ECFDF5', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /></svg>', 'Curated', 'Appliances'),
  (5000, 'Luxury Spa & Wellness Pass', 'icon', '#FDF2F8', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" /><path d="M12 7v5l3 3" /></svg>', 'Trending', 'Wellness'),
  (5000, 'Noise Cancelling Headphones', 'icon', '#F0FDF4', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>', 'Staff Pick', 'Electronics'),

  -- Tier 10000
  (10000, 'Smart Watch Active Pro', 'icon', '#EEF2FF', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="16" rx="3" /><path d="M9 1h6" /><path d="M9 23h6" /></svg>', 'Curated', 'Gadgets'),
  (10000, 'Weekend Getaway Experience', 'icon', '#FEF3C7', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>', 'Premium', 'Travel'),
  (10000, 'Smart Home Speaker Hub', 'icon', '#ECFDF5', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="14" r="4" /><line x1="12" y1="6" x2="12.01" y2="6" /></svg>', 'Curated', 'Smart Home'),
  (10000, 'Fine Dining 5-Course Voucher', 'icon', '#FDF2F8', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /></svg>', 'Curated', 'Fine Dining');
