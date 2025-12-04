# Supabase Build Fix ✅

## Issue: Build Failing with "Missing Supabase environment variables"

### Error Message
```
Error: Missing Supabase environment variables
at /vercel/path0/.next/server/app/api/properties/[id]/route.js
Failed to collect page data for /api/properties/[id]
```

### Root Cause
- Supabase client initialization threw error at **build time**
- Next.js tries to import all modules during build
- Environment variables not required during build, only at runtime
- Error prevented build from completing

---

## Solution Applied

### 1. Updated `src/lib/supabase.ts`

**Before (Build Time Error):**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables') // ❌ Fails at build
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**After (Build Time Safe):**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create client with placeholders if env vars not set (build time)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Runtime check function
export function checkSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables...')
  }
}
```

### 2. Updated API Routes

Added runtime checks to all API endpoints:

**Files Modified:**
- ✅ `src/app/api/properties/route.ts` (GET, POST)
- ✅ `src/app/api/properties/[id]/route.ts` (GET, PUT, DELETE)

**Pattern:**
```typescript
import { supabase, checkSupabaseConfig } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    checkSupabaseConfig() // ✅ Check at runtime when API is called
    // ... rest of code
  }
}
```

---

## Why This Works

### Build Time (No Env Vars Needed)
- ✅ Supabase client created with placeholders
- ✅ No errors thrown
- ✅ Build completes successfully
- ✅ Static pages generated

### Runtime (Env Vars Required)
- ✅ When API route is called, `checkSupabaseConfig()` runs
- ✅ Throws clear error if env vars missing
- ✅ Works normally if env vars configured
- ✅ User gets helpful error message

---

## Vercel Environment Variables

**Required in Vercel Dashboard:**

Go to: Project Settings → Environment Variables

Add these for **Production, Preview, and Development**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to get these:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy Project URL and anon/public key

---

## Build Status

### ✅ Fixed Issues
- [x] Build time initialization error
- [x] Missing environment variable check at build
- [x] API routes throwing errors during static generation
- [x] Runtime validation added

### ✅ Expected Build Output
```
✓ Compiled successfully
  Linting and checking validity of types ...
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Build successful!
```

---

## Testing

### Local Testing (Without Env Vars)
```bash
# Build should succeed
npm run build
# ✅ Success

# Runtime error when calling API
curl http://localhost:3000/api/properties
# ❌ Returns: "Missing Supabase environment variables"
```

### Local Testing (With Env Vars)
```bash
# Create .env.local with Supabase credentials
npm run build
# ✅ Success

npm run dev
curl http://localhost:3000/api/properties
# ✅ Returns: {"properties": [...]}
```

### Vercel Deployment
1. ✅ Build succeeds (no env vars needed at build time)
2. ✅ Add env vars in Vercel dashboard
3. ✅ Redeploy
4. ✅ API routes work with proper env vars

---

## Next Steps

1. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

2. **Add Environment Variables:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add both Supabase variables
   - Redeploy

3. **Verify:**
   - Visit: https://your-site.vercel.app/properties
   - Should load (might show "no properties" if DB empty)
   - Should NOT show build errors

---

## Key Takeaway

**Separate Build-Time and Runtime Concerns:**

- ✅ **Build Time**: Allow placeholders, no validation
- ✅ **Runtime**: Strict validation, clear errors
- ✅ **Result**: Successful builds, helpful runtime messages

---

**Status: Ready to Deploy! 🚀**

Build will now succeed. Just need to add environment variables in Vercel dashboard after deployment.
