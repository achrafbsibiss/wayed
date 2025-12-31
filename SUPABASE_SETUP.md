# Supabase Setup Guide - Wayed Groupe Certificate Management

## ✅ Step 1: Supabase Project (COMPLETED)

You've already created your Supabase project!

**Your Credentials:**
- Project URL: `https://fazrpakypoxamecjwdbi.supabase.co`
- Publishable Key: `sb_publishable_6EmRI-3c2d3gq0HsGzMrkw_LbXLOS6E`

---

## 📋 Step 2: Get Additional API Keys

You need to get the **anon (public)** key and **service_role** key from Supabase dashboard.

### How to get them:

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Click on **Settings** (gear icon in sidebar)
4. Click on **API** in the settings menu
5. You'll see two keys:
   - **`anon` `public`** - This is your public anonymous key
   - **`service_role` `secret`** - This is your service role key (keep it secret!)

**⚠️ Important**: Copy both keys - you'll need them for the `.env.local` file.

---

## 🗄️ Step 3: Create Database Table

### 3.1 Open SQL Editor

1. In your Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **New Query**
3. Copy and paste the SQL below:

```sql
-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_certificates_display_order 
ON certificates(display_order);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_certificates_updated_at 
BEFORE UPDATE ON certificates 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Certificates are viewable by everyone"
ON certificates FOR SELECT
TO public
USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert certificates"
ON certificates FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Authenticated users can update certificates"
ON certificates FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete certificates"
ON certificates FOR DELETE
TO authenticated
USING (true);
```

4. Click **Run** or press `Ctrl+Enter`
5. You should see "Success. No rows returned" - that's good! ✅

---

## 📁 Step 4: Create Storage Bucket

### 4.1 Create Bucket

1. In Supabase dashboard, click **Storage** in the sidebar
2. Click **Create a new bucket**
3. Enter these details:
   - **Name**: `certificates`
   - **Public bucket**: ✅ **Check this box** (so images are publicly accessible)
   - **File size limit**: `5242880` (5MB in bytes)
   - **Allowed MIME types**: `image/*`
4. Click **Create bucket**

### 4.2 Set Storage Policies

1. Click on your `certificates` bucket
2. Click **Policies** tab
3. Click **New Policy**
4. Click **Get started quickly** and select **Policy for public read access**
5. Click **Review** then **Save**

Now add upload policy for authenticated users:

1. Click **New Policy** again
2. Select **Create policy from scratch**
3. Fill in:
   - **Policy name**: `Authenticated users can upload`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `authenticated`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
4. Click **Review** then **Save**

Add delete policy:

1. Click **New Policy**
2. Select **Create policy from scratch**
3. Fill in:
   - **Policy name**: `Authenticated users can delete`
   - **Allowed operation**: `DELETE`
   - **Target roles**: `authenticated`
   - **USING expression**: `true`
4. Click **Review** then **Save**

---

## 👤 Step 5: Create Admin User

Since we're using NextAuth.js for authentication, we need to create an admin user in a custom `users` table.

### 5.1 Create Users Table

1. Go back to **SQL Editor**
2. Create a new query and run this:

```sql
-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read users
CREATE POLICY "Authenticated users can read users"
ON users FOR SELECT
TO authenticated
USING (true);
```

3. Click **Run**

### 5.2 Create Your Admin User

**Important**: We'll create a temporary admin user. After the app is running, I'll provide a secure way to hash the password properly.

For now, run this SQL (replace with your desired email and a temporary password):

```sql
-- Create admin user (temporary - we'll update with proper hash later)
INSERT INTO users (email, password_hash, name, role)
VALUES (
  'your-email@example.com',  -- ⚠️ CHANGE THIS to your email
  'temporary_password',       -- ⚠️ CHANGE THIS to a temporary password
  'Admin User',
  'admin'
);
```

**⚠️ Note**: This is temporary! Once the app is running, we'll use bcrypt to properly hash your password.

---

## 🎉 Setup Complete!

You should now have:
- ✅ Database table `certificates` created
- ✅ Storage bucket `certificates` created with proper policies
- ✅ Admin user created in `users` table
- ✅ All necessary keys collected

---

## 📝 Next Steps

1. Copy your **anon** and **service_role** keys from Step 2
2. I'll create the `.env.local` file with all your credentials
3. We'll update the admin password with proper encryption
4. Start building the admin panel!

---

## 🆘 Troubleshooting

**Can't find API keys?**
- Go to Settings → API in Supabase dashboard

**SQL errors?**
- Make sure you're in the correct project
- Try running queries one at a time

**Storage bucket issues?**
- Ensure "Public bucket" is checked
- Verify policies are created correctly

**Need help?**
- Let me know which step you're stuck on!
