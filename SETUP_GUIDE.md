# Solani Construction - Setup Guide

This guide will help you set up the Solani Construction website with Supabase backend for property management.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at https://supabase.com)
- Git installed

## 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- Supabase JS Client
- Leaflet for interactive maps
- React Three Fiber for 3D components
- All other dependencies

## 2. Supabase Setup

### Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: Solani Construction
   - Database Password: (save this securely)
   - Region: Choose closest to your users
4. Wait for the project to be created (2-3 minutes)

### Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (e.g., https://xxxxx.supabase.co)
   - **anon/public key** (this is safe to use in client-side code)

### Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SITE_URL=https://solaniconstruction.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Create Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `database/schema.sql`
4. Paste into the SQL Editor
5. Click "Run" to execute the script

This will create:
- `properties` table with all required columns
- Indexes for better query performance
- Row Level Security (RLS) policies
- Auto-update timestamp trigger

### Step 5: Create Admin User

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click "Add User" > "Create new user"
3. Fill in:
   - Email: your-admin-email@example.com
   - Password: (create a strong password)
   - Auto Confirm User: YES
4. Click "Create User"

This user will be able to access the admin dashboard at `/admin`

## 3. Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Admin Dashboard

Access the admin dashboard at `http://localhost:3000/admin`

Login with the credentials you created in Step 5.

Features:
- Add new properties
- Edit existing properties
- Delete properties
- Upload property images
- Set coordinates for map display

## 4. Adding Property Data

### Option 1: Via Admin Dashboard (Recommended)

1. Go to `http://localhost:3000/admin`
2. Login with your admin credentials
3. Click "Add New Property"
4. Fill in all required fields:
   - Title
   - Description
   - Price (in GHS)
   - Type (Land, Residential, Commercial, Industrial)
   - Status (Available, Under Offer, Sold)
   - Location
   - Area in square meters
   - Images (one URL per line)
   - Features (one per line)
   - Latitude/Longitude (optional, for map markers)

### Option 2: Direct Database Insert

You can also insert data directly via Supabase SQL Editor:

```sql
INSERT INTO properties (
  title,
  description,
  price,
  type,
  status,
  location,
  area_sq_m,
  images,
  features,
  latitude,
  longitude
) VALUES (
  'Prime Commercial Land - Bibiani Central',
  'Strategically located commercial land in the heart of Bibiani...',
  450000,
  'Commercial',
  'Available',
  'Bibiani, Western North Region',
  2000,
  ARRAY['/project 1.jpg', '/project 2.jpg'],
  ARRAY['City Center Location', 'Main Road Access', 'Utilities Available'],
  6.46,
  -2.32
);
```

## 5. Interactive Map Configuration

For properties to appear on the interactive map:

1. You must provide valid `latitude` and `longitude` coordinates
2. Coordinates should be in decimal degrees format
3. Ghana coordinates reference:
   - Latitude: approximately 4.5° to 11° North
   - Longitude: approximately -3.5° to 1.5° East (use negative values for West)

You can find coordinates using:
- Google Maps: Right-click > "What's here?"
- OpenStreetMap: Right-click > "Show address"

## 6. Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. Go to https://vercel.com and sign up/login
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Update Site URL

After deployment, update the site URL in:
1. `.env.local` (for local development)
2. Vercel environment variables
3. Supabase dashboard > Authentication > URL Configuration

## 7. Security Considerations

### Row Level Security (RLS)

The database schema includes RLS policies:
- **Public users**: Can READ all properties
- **Authenticated users**: Can CREATE, UPDATE, DELETE properties

### Admin Access

- Admin dashboard requires authentication via Supabase Auth
- Only users created in Supabase Authentication can access admin features
- Never share your Supabase service role key (only use anon key in frontend)

### API Routes

All API routes (`/api/properties/*`) are serverless functions that:
- Handle CRUD operations
- Validate data
- Return appropriate error messages
- Work with Supabase RLS policies

## 8. Features Overview

### Public Features

1. **Properties Listing Page** (`/properties`)
   - View all available properties
   - Filter by type, status, location, price range
   - Dynamic data from Supabase

2. **Property Detail Page** (`/properties/[id]`)
   - Full property information
   - Image gallery
   - Contact form
   - Dynamic data from Supabase

3. **Interactive Map**
   - Leaflet-powered map
   - Property markers with coordinates
   - Click markers to view property details
   - Auto-fit bounds to show all properties

### Admin Features

1. **Authentication**
   - Secure login via Supabase Auth
   - Session management
   - Logout functionality

2. **Property Management**
   - Create new properties
   - Edit existing properties
   - Delete properties
   - Upload multiple images
   - Add custom features
   - Set map coordinates

## 9. Troubleshooting

### Issue: Map not loading

**Solution**: Check that Leaflet CSS is properly imported and coordinates are valid.

### Issue: Authentication not working

**Solutions**:
1. Verify Supabase URL and anon key in `.env.local`
2. Check that user exists in Supabase Authentication
3. Ensure Auto Confirm is enabled for the user

### Issue: Properties not showing

**Solutions**:
1. Check browser console for errors
2. Verify database contains properties: Go to Supabase > Table Editor > properties
3. Check that images URLs are valid and accessible
4. Verify API routes are working: Visit `/api/properties` directly

### Issue: Cannot create/edit/delete properties

**Solutions**:
1. Ensure you're logged in to the admin dashboard
2. Check that RLS policies are applied correctly
3. Verify your user has authenticated status in Supabase

## 10. API Endpoints

### GET `/api/properties`

Fetch all properties with optional filters.

Query parameters:
- `type`: Filter by property type
- `status`: Filter by status
- `location`: Search in location field
- `minPrice`: Minimum price
- `maxPrice`: Maximum price

### GET `/api/properties/[id]`

Fetch a single property by ID.

### POST `/api/properties`

Create a new property (requires authentication).

Body: Property object with all required fields.

### PUT `/api/properties/[id]`

Update an existing property (requires authentication).

Body: Partial property object with fields to update.

### DELETE `/api/properties/[id]`

Delete a property (requires authentication).

## Support

For issues or questions:
- Email: solanigloballtd@yahoo.com
- Phone: +233 24 821 2624

---

**Note**: This is a production-ready setup. No hardcoded mockup data is included. All property data is managed through Supabase and the admin dashboard.
