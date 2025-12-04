# Map Components Guide

## Two Separate Map Components

This project has two distinct map components for different purposes:

### 1. InteractiveMap (Portfolio Projects)
**Location:** `src/components/InteractiveMap.tsx`

**Purpose:** Displays completed construction projects (portfolio showcase)

**Used By:** `src/components/ProjectMap.tsx`

**Data Source:** Hardcoded PROJECTS array (historical data)

**Features:**
- Shows 8 completed construction projects
- Fixed locations across Ghana
- Project details (client, scope, year)
- Used on the homepage/portfolio section

**DO NOT MODIFY** - This component is for the construction portfolio, not property sales.

---

### 2. PropertiesMap (Property Sales)
**Location:** `src/components/PropertiesMap.tsx`

**Purpose:** Displays properties for sale from database

**Used By:** Property sales pages (when implemented)

**Data Source:** Supabase database via API

**Features:**
- Dynamic properties from database
- Properties with GPS coordinates
- Price and location info in popups
- Auto-fit bounds to show all properties
- Used for property listings

**USE THIS** - For any property sales features that need a map.

---

## Why Two Components?

1. **Different Data Types:**
   - `InteractiveMap` uses `Project` type (name, year, client, etc.)
   - `PropertiesMap` uses `Property` type (title, price, features, etc.)

2. **Different Data Sources:**
   - Portfolio projects are historical and won't change often (hardcoded)
   - Property listings are dynamic and managed via admin dashboard (database)

3. **Different Purposes:**
   - Portfolio: "Look what we've built"
   - Properties: "What's available to buy"

---

## Usage Examples

### For Portfolio (Existing - Already Implemented)
```tsx
import dynamic from 'next/dynamic'

const MapComponent = dynamic(
  () => import('./InteractiveMap'),
  { ssr: false }
)

// In ProjectMap.tsx
<MapComponent 
  selectedProject={selectedProject} 
  onMarkerClick={setSelectedProject}
/>
```

### For Property Sales (New - If Needed)
```tsx
import dynamic from 'next/dynamic'
import type { Property } from '@/lib/supabase'

const PropertiesMapComponent = dynamic(
  () => import('./PropertiesMap'),
  { ssr: false }
)

// In a properties page
<PropertiesMapComponent 
  properties={properties}
  selectedProperty={selectedProperty} 
  onMarkerClick={setSelectedProperty}
/>
```

---

## Adding Map to Properties Page (Future Enhancement)

If you want to add an interactive map to the properties listing page:

1. **Fetch properties** (already done in `/properties` page)
2. **Add map section** to the page
3. **Import PropertiesMap dynamically**:
   ```tsx
   const PropertiesMapComponent = dynamic(
     () => import('@/components/PropertiesMap'),
     { 
       ssr: false,
       loading: () => <div>Loading map...</div>
     }
   )
   ```
4. **Render with properties data**:
   ```tsx
   <PropertiesMapComponent 
     properties={filteredProperties}
     selectedProperty={null}
     onMarkerClick={(property) => {
       // Handle marker click - maybe scroll to property card
       console.log('Clicked:', property.title)
     }}
   />
   ```

---

## Important Notes

- Both components require Leaflet CSS (already imported in layout)
- Both components must be loaded with `ssr: false` (client-side only)
- InteractiveMap has hardcoded data (by design)
- PropertiesMap uses database data (dynamic)
- Don't try to merge them - they serve different purposes

---

## File Structure

```
src/components/
├── InteractiveMap.tsx      # Portfolio projects (hardcoded)
├── PropertiesMap.tsx       # Property sales (database)
└── ProjectMap.tsx          # Uses InteractiveMap

src/app/properties/
├── page.tsx                # Can use PropertiesMap if needed
└── [id]/page.tsx           # Individual property details
```

---

## Coordinates Format

Both components use Leaflet's LatLngExpression:
- `[latitude, longitude]` format
- Example: `[6.46, -2.32]` for Bibiani, Ghana
- Ghana ranges:
  - Latitude: 4.5° to 11° North
  - Longitude: -3.5° to 1.5° East (negative for West)

---

## Summary

✅ **InteractiveMap** = Portfolio projects (keep as is)  
✅ **PropertiesMap** = Property sales (use for new features)  
✅ Both are independent and serve different purposes
