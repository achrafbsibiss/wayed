# 🚀 Quick Start Guide - Certificate Management System

## ⚠️ IMPORTANT: Complete These Steps First!

Before running the application, you MUST complete the following setup in your Supabase dashboard.

---

## 📝 Step 1: Get Your Supabase API Keys

1. Go to: https://app.supabase.com
2. Select your project: `fazrpakypoxamecjwdbi`
3. Click **Settings** → **API**
4. Copy these two keys:
   - **`anon` `public`** key
   - **`service_role` `secret`** key

---

## 🗄️ Step 2: Create Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

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

4. Click **Run** (you should see "Success")

---

## 📁 Step 3: Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **Create a new bucket**
3. Settings:
   - **Name**: `certificates`
   - **Public bucket**: ✅ **CHECK THIS BOX**
4. Click **Create bucket**

### Set Storage Policies:

After creating the bucket:

#### Policy 1: Public Read Access (for viewing images)

1. Click on `certificates` bucket → **Policies** tab
2. Click **New Policy**
3. Click **View templates** at bottom right
4. Select: **"Allow access to JPG images in a public folder to anonymous users"**
5. Modify the SQL template to:
```sql
bucket_id = 'certificates'
```
6. Click **Review** → **Save**

**OR alternatively, create from scratch:**
- Click **New Policy** 
- **Policy name**: `Public read access`
- **Allowed operation**: ✅ `SELECT`
- **Target roles**: `anon, authenticated`
- **Policy definition**: `bucket_id = 'certificates'`
- Click **Review** → **Save**

---

#### Policy 2: Authenticated Upload (INSERT)

1. Click **New Policy**
2. Fill in the form (as shown in your second screenshot - you're doing it right!):
   - **Policy name**: `Authenticated users can upload`
   - **Allowed operation**: ✅ `INSERT` (check this box)
   - **Target roles**: `authenticated`
   - **Policy definition**: `bucket_id = 'certificates'`
3. Click **Review** → **Save**

---

#### Policy 3: Authenticated Delete

1. Click **New Policy**
2. Fill in:
   - **Policy name**: `Authenticated users can delete`
   - **Allowed operation**: ✅ `DELETE` (check this box)
   - **Target roles**: `authenticated`
   - **Policy definition**: `bucket_id = 'certificates'`
3. Click **Review** → **Save**

---

> **✅ You're on the right track!** Your second screenshot shows exactly the correct setup for the INSERT policy. Just make sure the policy definition is: `bucket_id = 'certificates'`

---

## 👤 Step 4: Create Your Admin User

1. Go back to **SQL Editor**
2. Run this SQL (replace with YOUR email and password):

```sql
INSERT INTO users (email, password_hash, name, role)
VALUES (
  'your-email@example.com',  -- ⚠️ CHANGE THIS
  'your-password',            -- ⚠️ CHANGE THIS
  'Admin User',
  'admin'
);
```

> **Note**: The password will be automatically hashed on first login for security.

---

## 🔧 Step 5: Update Environment Variables

1. **MANUAL STEP**: You need to manually create/edit `.env.local` file
2. Add these variables with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fazrpakypoxamecjwdbi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_from_step_1
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_from_step_1

# NextAuth Configuration (already set by auth secret command)
# AUTH_SECRET is already in your .env.local

# Optional: Add these for reference
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-password
```

---

## ✅ Step 6: Start the Application

Once ALL the above steps are complete:

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## 🎯 Test Your Setup

### 1. Test Admin Login
- Go to: http://localhost:3000/admin/login
- Login with your admin email and password
- You should be redirected to `/admin/certificates`

### 2. Test Adding a Certificate
- Click "Add Certificate"
- Fill in the form:
  - Title: e.g., "Global G.A.P"
  - Description: Certificate description
  - Upload an image
  - Display order: 1
- Click "Create Certificate"
- Certificate should appear in the admin list

### 3. Test Public View
- Go to: http://localhost:3000/certificates
- Your certificate should display on the public page
- Download button should work

---

## 🔍 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has all the required keys
- Restart the dev server after adding environment variables

### "Unauthorized" errors
- Make sure you completed the database setup (Step 2)
- Verify RLS policies are created
- Check that you're logged in

### Images not uploading
- Verify storage bucket is PUBLIC
- Check storage policies are configured
- Ensure bucket name is exactly `certificates`

### Can't login
- Verify admin user was created (Step 4)
- Check email and password are correct
- Password should be plain text (it will hash automatically on first login)

---

## 📚 Next Steps

After everything works:

1. **Test all CRUD operations**:
   - Create, Edit, Delete certificates
   - Upload different image types
   
2. **Change your password**:
   - After first login, update your admin user in Supabase with a bcrypt hashed password
   
3. **Add real certificates**:
   - Upload your actual certificate images
   - Add proper titles and descriptions

4. **Optional**: Set up deployment (Vercel, Netlify, etc.)

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check Supabase logs in the dashboard
3. Verify all SQL commands ran successfully
4. Ensure all environment variables are correct

---

**🎉 Once setup is complete, you'll have a fully functional certificate management system!**
