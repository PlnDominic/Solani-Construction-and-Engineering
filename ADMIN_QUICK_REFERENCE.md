# Admin Dashboard - Quick Reference

## 🚀 Quick Start (30 seconds)

### Access Admin
```
URL: https://your-site.vercel.app/admin
```

### Login
```
Email: your-admin@email.com
Password: your-password
```

### Add Property
```
1. Click "+ Add New Property"
2. Fill the form
3. Click "Create Property"
```

---

## 📋 Property Form Fields

### ⭐ REQUIRED FIELDS

| Field | Type | Example |
|-------|------|---------|
| **Title** | Text | "Prime Commercial Land - Bibiani" |
| **Type** | Dropdown | Land / Residential / Commercial / Industrial |
| **Status** | Dropdown | Available / Under Offer / Sold |
| **Location** | Text | "Bibiani, Western North Region" |
| **Price** | Number | 250000 (will show as GHS 250,000) |
| **Area** | Number | 1500 (in square meters) |
| **Description** | Text Area | 2-3 paragraphs about the property |
| **Images** | Text Area | One URL per line (minimum 1 image) |

### 🎯 OPTIONAL FIELDS (Recommended)

| Field | Purpose | Example |
|-------|---------|---------|
| **Latitude** | For map display | 6.46 |
| **Longitude** | For map display | -2.32 |
| **Features** | Property highlights | One feature per line |

---

## 📸 Image Format

```
One image per line:

/property1.jpg
/property2.jpg
/property3.jpg

OR full URLs:

https://yourdomain.com/images/prop1.jpg
https://yourdomain.com/images/prop2.jpg
```

---

## ✨ Features Format

```
One feature per line:

Main Road Access
Utilities Available
Fenced Perimeter
City Center Location
Commercial Zoning
```

---

## 🗺️ Getting Coordinates (for Map)

### Method 1: Google Maps
```
1. Open Google Maps
2. Right-click on property location
3. Click "What's here?"
4. Copy the numbers shown:
   - First number = Latitude
   - Second number = Longitude
```

### Example from Google Maps
```
6.4605, -2.3194
     ↓       ↓
 Latitude  Longitude
```

---

## 🎬 Step-by-Step Visual Guide

```
┌─────────────────────────────────────┐
│ 1. Go to /admin                     │
│    https://your-site.vercel.app/admin│
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 2. Login Screen                     │
│    Email: ________________          │
│    Password: ____________           │
│    [Login]                          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 3. Admin Dashboard                  │
│    Property Management              │
│    [+ Add New Property]             │
│                                     │
│    Properties List:                 │
│    [Property 1] [Edit] [Delete]     │
│    [Property 2] [Edit] [Delete]     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 4. Property Form                    │
│    Title: _______________           │
│    Type: [Dropdown]                 │
│    Status: [Dropdown]               │
│    Location: ____________           │
│    Price: ________                  │
│    Area: ________                   │
│    Description: _________           │
│    Images: _____________            │
│    Features: ____________           │
│    Latitude: _____                  │
│    Longitude: _____                 │
│    [Create Property] [Cancel]       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 5. Success!                         │
│    ✓ Property added to database     │
│    ✓ Appears in admin table         │
│    ✓ Visible on /properties page    │
└─────────────────────────────────────┘
```

---

## ⚡ 5-Minute Example

### Property Details
```yaml
Title: Beautiful Residential Plot
Type: Residential
Status: Available
Location: Estate Road, Bibiani
Price: 180000
Area: 1200
Description: |
  Spacious residential plot in a quiet area with utilities.
  Perfect for building your dream home. Good road access
  and established neighborhood.
Images: |
  /plot1.jpg
  /plot2.jpg
  /plot3.jpg
Features: |
  Electricity Available
  Water Access
  Fenced Perimeter
  Paved Road
Latitude: 6.45
Longitude: -2.31
```

### Copy and Paste Ready! ✂️

Just copy each section into the corresponding field in the admin form.

---

## 🔧 Edit or Delete

### Edit Property
```
1. Find property in admin table
2. Click [Edit] button
3. Form opens with current data
4. Make changes
5. Click "Update Property"
```

### Delete Property
```
1. Find property in admin table
2. Click [Delete] button
3. Confirm deletion
4. Property removed permanently
```

⚠️ **Warning:** Deletion cannot be undone!

---

## ❌ Common Mistakes to Avoid

### ❌ Wrong Image Format
```
❌ image1.jpg, image2.jpg, image3.jpg  (DON'T use commas)
✅ /image1.jpg
   /image2.jpg
   /image3.jpg
```

### ❌ Wrong Features Format
```
❌ Feature 1, Feature 2, Feature 3  (DON'T use commas)
✅ Feature 1
   Feature 2
   Feature 3
```

### ❌ Wrong Price Format
```
❌ GHS 250,000  (DON'T include currency or commas)
❌ 250,000
✅ 250000
```

### ❌ Wrong Coordinates
```
❌ 6°27'N  (DON'T use degrees/minutes)
✅ 6.45    (USE decimal degrees)
```

---

## 🎯 Pro Tips

### Images
- ✅ Upload to `/public` folder first
- ✅ Use descriptive filenames: `bibiani-commercial-front.jpg`
- ✅ Recommended size: 1200x800px
- ✅ First image becomes main photo

### Descriptions
- ✅ Start with property type and location
- ✅ Mention unique features
- ✅ Describe surroundings and access
- ✅ 100-300 words optimal

### Pricing
- ✅ Research local market rates
- ✅ Use round numbers (250000, not 247500)
- ✅ Consider size, location, amenities

### Coordinates
- ✅ Required for map display
- ✅ Get from Google Maps
- ✅ Double-check accuracy
- ✅ Ghana: Lat 4-11, Lon -3.5 to 1.5

---

## 📞 Need Help?

### Quick Links
- **Full Guide:** `ADMIN_GUIDE.md`
- **Setup:** `SETUP_GUIDE.md`
- **Quick Start:** `QUICK_START.md`

### Troubleshooting
```
Problem: Can't login
Solution: Check credentials in Supabase Authentication

Problem: Images don't show
Solution: Verify files in /public folder

Problem: Property not saving
Solution: Check all required fields are filled

Problem: Not on map
Solution: Add latitude and longitude coordinates
```

---

## 📱 Mobile Admin

The admin dashboard works on mobile devices too:
- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Same features as desktop
- ✅ Manage properties on the go

---

## ✅ Checklist Before Publishing Property

```
☐ All required fields filled
☐ Title is descriptive
☐ Description is detailed (100+ words)
☐ At least 1 image added
☐ Images load correctly
☐ Price is correct
☐ Area is accurate
☐ Location is specific
☐ Features listed (if applicable)
☐ Coordinates added (for map)
☐ Status set to "Available"
☐ Previewed on /properties page
☐ Detail page looks good
☐ Shows on map (if coords added)
```

---

## 🎉 You're Ready!

**Quick Steps:**
1. Go to `/admin`
2. Login
3. Click "+ Add New Property"
4. Fill form
5. Click "Create Property"
6. Done! 🎊

**For detailed instructions, see:** `ADMIN_GUIDE.md`
