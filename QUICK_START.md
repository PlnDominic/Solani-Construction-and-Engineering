# Quick Start Guide

## First Time Setup (5 minutes)

### 1. Install Supabase Package
```bash
npm install @supabase/supabase-js
```

### 2. Create Supabase Project
1. Go to https://supabase.com
2. Sign up/login
3. Click "New Project"
4. Wait 2-3 minutes for setup

### 3. Get Your Credentials
In Supabase Dashboard → Settings → API:
- Copy **Project URL**
- Copy **anon public key**

### 4. Configure Environment
Create `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=https://solaniconstruction.com
NEXT_PUBLIC_SUPABASE_URL=paste-your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-key-here
```

### 5. Setup Database
In Supabase Dashboard → SQL Editor:
1. Click "New Query"
2. Copy entire `database/schema.sql` file
3. Paste and click "Run"

### 6. Create Admin User
In Supabase Dashboard → Authentication → Users:
1. Click "Add User"
2. Enter email and password
3. Check "Auto Confirm User"
4. Click "Create User"

### 7. Start Development
```bash
npm run dev
```

Visit:
- Properties: http://localhost:3000/properties
- Admin: http://localhost:3000/admin

## Adding Your First Property

1. Go to http://localhost:3000/admin
2. Login with your admin credentials
3. Click "Add New Property"
4. Fill in the form:
   - **Title**: "Beautiful Land in Bibiani"
   - **Type**: Select from dropdown
   - **Status**: "Available"
   - **Location**: "Bibiani, Western North Region"
   - **Price**: 250000
   - **Area**: 1500
   - **Description**: Write a detailed description
   - **Images**: (one per line)
     ```
     /image1.jpg
     /image2.jpg
     /image3.jpg
     ```
   - **Features**: (one per line)
     ```
     Main Road Access
     Utilities Available
     Fenced Perimeter
     ```
   - **Latitude**: 6.46 (optional, for map)
   - **Longitude**: -2.32 (optional, for map)
5. Click "Create Property"

## Common Tasks

### View All Properties
- Public page: `/properties`
- Fetches from API automatically
- Uses filters to search

### Edit a Property
1. Login to `/admin`
2. Find property in table
3. Click "Edit"
4. Make changes
5. Click "Update Property"

### Delete a Property
1. Login to `/admin`
2. Find property in table
3. Click "Delete"
4. Confirm deletion

### Filter Properties
On `/properties` page:
- Click type buttons (Land, Residential, etc.)
- Select status from dropdown
- Type in location search
- Enter min/max price
- Click "Reset Filters" to clear

### Add Map Coordinates
To show property on interactive map:
1. Find location on Google Maps
2. Right-click → "What's here?"
3. Copy latitude and longitude
4. Add to property in admin dashboard
5. Property will appear on map automatically

## Troubleshooting

### Properties not showing?
- Check Supabase Table Editor → properties table
- Verify environment variables in `.env.local`
- Check browser console for errors

### Can't login to admin?
- Verify user exists in Supabase Authentication
- Check "Auto Confirm User" was enabled
- Try password reset in Supabase

### Map not loading?
- Check that coordinates are valid numbers
- Latitude: 4.5 to 11 (for Ghana)
- Longitude: -3.5 to 1.5 (for Ghana)
- At least one property needs coordinates

## File Locations

- Admin Dashboard: `src/app/admin/page.tsx`
- Properties Page: `src/app/properties/page.tsx`
- Property Detail: `src/app/properties/[id]/page.tsx`
- API Routes: `src/app/api/properties/`
- Database Schema: `database/schema.sql`
- Supabase Config: `src/lib/supabase.ts`

## API Testing

### Test GET all properties
```bash
curl http://localhost:3000/api/properties
```

### Test GET with filters
```bash
curl "http://localhost:3000/api/properties?type=Commercial&status=Available"
```

### Test GET single property
```bash
curl http://localhost:3000/api/properties/YOUR_PROPERTY_ID
```

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Add environment variables in Vercel
- [ ] Click "Deploy"
- [ ] Update site URL in Supabase settings
- [ ] Test production site
- [ ] Add properties via admin panel

## Support Resources

- Full Setup: See `SETUP_GUIDE.md`
- Implementation Details: See `IMPLEMENTATION_SUMMARY.md`
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Leaflet Docs: https://leafletjs.com/reference.html

## Important URLs

- Local Development: http://localhost:3000
- Properties Page: http://localhost:3000/properties
- Admin Dashboard: http://localhost:3000/admin
- Supabase Dashboard: https://app.supabase.com
- Vercel Dashboard: https://vercel.com/dashboard

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions.
