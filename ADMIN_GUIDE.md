# Admin Dashboard Guide - How to Add Properties

## Quick Access

**Admin Dashboard URL:** https://your-site.vercel.app/admin

**Default Route:** `/admin`

---

## Step 1: Access the Admin Dashboard

### Option 1: Direct URL
```
https://solani-construction-engineering.vercel.app/admin
```

### Option 2: Add Link to Your Site
You can add an admin link to your Navbar or Footer (for your use only):
```tsx
<Link href="/admin">Admin</Link>
```

---

## Step 2: Login

### Login Screen
When you visit `/admin`, you'll see a login form:

```
┌─────────────────────────────┐
│     Admin Login             │
├─────────────────────────────┤
│                             │
│  Email:                     │
│  [___________________]      │
│                             │
│  Password:                  │
│  [___________________]      │
│                             │
│  [      Login      ]        │
│                             │
└─────────────────────────────┘
```

### Credentials
- Use the email and password you created in Supabase Authentication
- Example: `admin@solaniconstruction.com`

### If Login Fails
**Error: "Supabase not configured"**
- Environment variables not set in Vercel
- Follow `SETUP_GUIDE.md` to configure

**Error: "Invalid login credentials"**
- Check email and password are correct
- Verify user exists in Supabase Authentication
- Ensure "Auto Confirm User" was enabled

---

## Step 3: Admin Dashboard Overview

After login, you'll see:

```
┌──────────────────────────────────────────────┐
│  Admin Dashboard              [Logout]       │
├──────────────────────────────────────────────┤
│                                              │
│  Property Management                         │
│                        [+ Add New Property]  │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ Property List Table                    │ │
│  │  Property | Type | Location | Price    │ │
│  │  [Image]  | Land | Bibiani  | GHS 250K │ │
│  │           |      |          | [Edit] [Delete] │
│  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## Step 4: Add New Property

### Click "Add New Property" Button

A form will appear with these fields:

---

### **Required Fields** ⭐

#### 1. **Title** *
```
Example: "Prime Commercial Land - Bibiani Central"
Tips: 
- Make it descriptive
- Include location in title
- Keep it concise (max 100 characters)
```

#### 2. **Type** * (Dropdown)
```
Options:
- Land
- Residential
- Commercial
- Industrial

Choose the category that best fits the property
```

#### 3. **Status** * (Dropdown)
```
Options:
- Available (actively for sale)
- Under Offer (negotiation in progress)
- Sold (completed sale)

Start with "Available" for new listings
```

#### 4. **Location** *
```
Example: "Bibiani, Western North Region"
Tips:
- Include city/town
- Add region/district
- Be specific enough for buyers to find
```

#### 5. **Price (GHS)** *
```
Example: 250000
Tips:
- Enter as number only (no commas)
- In Ghana Cedis (GHS)
- Will display as "GHS 250,000" on site
```

#### 6. **Area (sqm)** *
```
Example: 1500
Tips:
- Square meters only
- Whole numbers
- Total plot size
```

#### 7. **Description** *
```
Example:
"Strategically located commercial land in the heart of Bibiani, 
perfect for retail, office, or mixed-use development. This prime 
plot offers excellent visibility and accessibility..."

Tips:
- Write 2-3 paragraphs
- Highlight key features
- Mention nearby amenities
- Be honest and detailed
- Minimum 100 characters
```

#### 8. **Images (One URL per line)** *
```
Example:
/project1.jpg
/project2.jpg
/bibiani-land.jpg

Tips:
- One image URL per line
- At least 1 image required
- Upload images to /public folder first
- Use relative paths (/image.jpg) or full URLs
- First image shows as main photo
- Recommended: 3-5 images per property
```

**How to Add Images:**
1. Upload images to `/public` folder in your project
2. Use filename: `/your-image.jpg`
3. Or use full URL: `https://yourdomain.com/images/property.jpg`

---

### **Optional Fields** (Recommended)

#### 9. **Latitude** (Optional but recommended)
```
Example: 6.46
Tips:
- Decimal degrees format
- For Ghana: 4.5 to 11 (North)
- Property will show on map if provided
- Find on Google Maps: Right-click → "What's here?"
```

#### 10. **Longitude** (Optional but recommended)
```
Example: -2.32
Tips:
- Decimal degrees format
- For Ghana: -3.5 to 1.5 (negative = West)
- Required for map display
- Copy from Google Maps with latitude
```

**Why Add Coordinates?**
- Properties appear on interactive map
- Buyers can see exact location
- Better user experience
- Professional presentation

#### 11. **Features (One per line)**
```
Example:
Main Road Access
Utilities Available
Fenced Perimeter
City Center Location
Commercial Zoning

Tips:
- One feature per line
- Be specific
- Highlight unique selling points
- Maximum 10-15 features
- Use short, clear phrases
```

---

## Step 5: Save the Property

### Click "Create Property" Button

**What Happens:**
1. ✅ Form validates all required fields
2. ✅ Data sent to API
3. ✅ Saved to Supabase database
4. ✅ Property appears in table immediately
5. ✅ Form closes automatically

**If Error Occurs:**
- Check all required fields (*) are filled
- Verify images are valid URLs/paths
- Ensure price and area are numbers
- Check coordinates are valid decimals

---

## Step 6: Verify Property Added

### Check in Admin Dashboard
- Property appears in table
- Shows thumbnail, title, location
- Status badge visible
- Edit/Delete buttons available

### Check on Public Site
1. Go to `/properties` page
2. Your new property should appear
3. Click to see detail page
4. Verify all information correct

---

## Managing Existing Properties

### Edit Property

1. **Click "Edit" button** on any property
2. Form opens with current data pre-filled
3. Make your changes
4. Click **"Update Property"**
5. Changes save immediately

**Common Edits:**
- Change status (Available → Under Offer → Sold)
- Update price
- Add more images
- Add/edit features
- Correct coordinates

### Delete Property

1. **Click "Delete" button** on any property
2. Confirmation dialog appears: "Are you sure?"
3. Click **"OK"** to confirm
4. Property removed from database immediately
5. Disappears from admin table and public site

**⚠️ Warning:** Deletion is permanent! Cannot be undone.

---

## Complete Example: Adding a Property

### Example Property Data

```
Title: Beautiful Residential Plot - Estate Road
Type: Residential
Status: Available
Location: Estate Road, Bibiani
Price: 180000
Area: 1200
Latitude: 6.45
Longitude: -2.31

Description:
Spacious residential plot in a quiet, developing area with 
access to utilities and good road network. This well-positioned 
property is perfect for building your dream home or as a 
long-term investment. The neighborhood features established 
residential properties and is known for its peaceful environment 
while still being close to essential amenities.

Images:
/plot1.jpg
/plot2.jpg
/plot3.jpg

Features:
Residential Area
Electricity Available
Water Access
Fenced Perimeter
Quiet Neighborhood
Clear Title
Paved Road Access
```

### Fill the Form

1. **Title:** "Beautiful Residential Plot - Estate Road"
2. **Type:** Select "Residential"
3. **Status:** Select "Available"
4. **Location:** "Estate Road, Bibiani"
5. **Price:** 180000
6. **Area:** 1200
7. **Description:** (Paste the description above)
8. **Images:** (Copy lines, one per line)
   ```
   /plot1.jpg
   /plot2.jpg
   /plot3.jpg
   ```
9. **Features:** (Copy lines, one per line)
   ```
   Residential Area
   Electricity Available
   Water Access
   Fenced Perimeter
   Quiet Neighborhood
   Clear Title
   Paved Road Access
   ```
10. **Latitude:** 6.45
11. **Longitude:** -2.31

12. Click **"Create Property"**

---

## Tips for Success

### Image Best Practices
- **Size:** 1200x800px or similar aspect ratio
- **Format:** JPG or PNG
- **Quality:** High resolution but compressed
- **Content:** Show different angles, features, surroundings
- **First image:** Should be most attractive view

### Writing Descriptions
- **Start with location/type:** "Prime commercial land in..."
- **Highlight key features:** accessibility, utilities, zoning
- **Mention development potential:** what can be built
- **Be honest:** actual condition and features
- **Include nearby:** schools, roads, markets, facilities

### Setting Prices
- **Research market rates** in the area
- **Consider:** location, size, accessibility, utilities
- **Be competitive** but fair
- **Round numbers** work well (250,000 not 247,500)

### Adding Coordinates
1. Open Google Maps
2. Find the property location
3. Right-click on exact spot
4. Select "What's here?"
5. Copy latitude and longitude (shown at bottom)
6. Paste into admin form

---

## Bulk Adding Properties

### For Multiple Properties

**Option 1: Use Admin Dashboard (Recommended)**
- Add one property at a time through form
- Ensures data validation
- Immediate preview

**Option 2: Direct Database Insert**
If you have many properties, you can insert directly in Supabase:

1. Go to Supabase → SQL Editor
2. Use this format:
```sql
INSERT INTO properties (
  title, description, price, type, status, 
  location, area_sq_m, images, features, 
  latitude, longitude
) VALUES (
  'Property Title',
  'Full description here...',
  250000,
  'Commercial',
  'Available',
  'Bibiani, Western North Region',
  2000,
  ARRAY['/image1.jpg', '/image2.jpg'],
  ARRAY['Feature 1', 'Feature 2', 'Feature 3'],
  6.46,
  -2.32
);
```

---

## Common Issues and Solutions

### "Cannot add property"
**Solution:**
- Check all required fields are filled
- Verify you're logged in
- Check Supabase connection

### "Images not showing"
**Solution:**
- Verify image files exist in /public folder
- Check image paths are correct
- Use relative paths: `/image.jpg` not `image.jpg`

### "Property not appearing on site"
**Solution:**
- Refresh the properties page
- Check browser cache (hard refresh: Ctrl+F5)
- Verify property status is "Available"

### "Map not showing property"
**Solution:**
- Add latitude and longitude coordinates
- Verify coordinates are in decimal degrees
- Check coordinates are for Ghana region

---

## Security Notes

### Admin Access
- ✅ Only authenticated users can add/edit/delete
- ✅ Public users can only view
- ✅ Row Level Security enforced

### Protecting Admin Route
**Recommended:** Add this to your navbar (only you can see):
```tsx
// Show only if you're logged in
{isAdmin && <Link href="/admin">Admin</Link>}
```

Or keep it as direct URL access only - no public links.

---

## Quick Reference Card

```
📋 ADDING A PROPERTY CHECKLIST

☐ Navigate to /admin
☐ Login with credentials
☐ Click "+ Add New Property"
☐ Fill required fields:
  ☐ Title
  ☐ Type (dropdown)
  ☐ Status (dropdown)
  ☐ Location
  ☐ Price (number)
  ☐ Area (number)
  ☐ Description (2-3 paragraphs)
  ☐ Images (at least 1, one per line)
☐ Fill optional fields:
  ☐ Features (one per line)
  ☐ Latitude (for map)
  ☐ Longitude (for map)
☐ Click "Create Property"
☐ Verify in table
☐ Check on /properties page
☐ Test filters and detail page
```

---

## Support

### Need Help?
- Check `SETUP_GUIDE.md` for configuration issues
- See `QUICK_START.md` for quick reference
- Review `IMPLEMENTATION_SUMMARY.md` for technical details

### Property Not Saving?
1. Open browser console (F12)
2. Check for errors
3. Verify API response
4. Check Supabase dashboard → Authentication (are you logged in?)
5. Check Supabase dashboard → Table Editor (is data there?)

---

## Summary

**Admin Dashboard:** `/admin`
**Login:** Use Supabase credentials
**Add Property:** Click "+ Add New Property"
**Required Fields:** Title, Type, Status, Location, Price, Area, Description, Images
**Optional:** Latitude, Longitude, Features
**Save:** Click "Create Property"
**Edit:** Click "Edit" button on any property
**Delete:** Click "Delete" button (careful - permanent!)

---

**You're ready to start adding properties! 🎉**

Visit `/admin` → Login → Click "+ Add New Property" → Fill form → Click "Create Property"
