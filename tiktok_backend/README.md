# TikTok Clone - Modern Web App with Infinite Scroll & Supabase Cloud Storage

This project is a simplified TikTok-style web application built using modern full-stack technologies. It includes functionality for user authentication, video uploading, infinite scrolling, and cloud-based file storage.


## Practical Coverage

- **Practical 1: Project Setup with Next.js and App Router**
- **Practical 4: Infinite Scrolling with TanStack Query**
- **Practical 5: Cloud Bucket Storage with Supabase**


## Practical 1: Initial Project Setup (Next.js 13 + App Router)

### Tools & Technologies

- **Frontend:** React (Next.js 13 with App Router)
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL
- **Other:** Tailwind CSS, Supabase, TanStack Query (React Query)

### Key Setup Steps

1. Created Next.js 13 project using the `app` directory structure.
2. Implemented routing with `layout.jsx`, `page.jsx`, and dynamic routes.
3. Set up shared components like `Navbar`, `Sidebar`, and `VideoCard`.
4. Backend API endpoints for video upload, list, and delete were created with Express.
5. Environment variables were configured in `.env.local` and `.env`.



## Practical 4: Implementing Infinite Scroll with TanStack Query

### Problem

Fetching all videos at once leads to performance bottlenecks. Users should be able to scroll continuously to fetch more content without page reloads.

### Solution

- Implemented **cursor-based pagination** in the backend API (`GET /videos?cursor=...`).
- Used **TanStack Query's `useInfiniteQuery()`** to fetch and manage paginated video data.
- Added an **Intersection Observer** to detect when the user reaches the bottom and load more videos.
- Ensured duplicate video entries are avoided and scrolling is smooth and responsive.

### Backend Update

```js
// Example controller logic (videoController.js)
const getPaginatedVideos = async (req, res) => {
  const { cursor } = req.query;
  const videos = await prisma.video.findMany({
    take: 10,
    skip: cursor ? 1 : 0,
    ...(cursor && { cursor: { id: parseInt(cursor) } }),
    orderBy: { id: 'desc' },
  });
  res.json(videos);
};
````


## Practical 5: Migrating to Supabase Cloud Storage

### Limitations of Local Storage

* Limited disk space
* No scalability across multiple servers
* File loss on redeployment
* No CDN or automatic backup

### Why Cloud Storage (Supabase)

* Virtually **unlimited storage**
* **Global CDN** for fast file delivery
* **Redundancy** and **backup**
* Fine-grained **access control**
* Direct browser-to-cloud uploads reduce server load

### Supabase Setup

1. Created a Supabase project.
2. Created two **storage buckets**: `videos` (public) and `thumbnails` (public).
3. Configured **RLS policies**:

   * Upload: `authenticated` users can upload
   * Access: `anon` and `authenticated` users can `SELECT`

### Backend Integration

* Installed `@supabase/supabase-js` in the backend.
* Configured Supabase client in `src/lib/supabase.js`.
* Updated `videoController.js`:

  * Upload: Direct upload to Supabase bucket.
  * Delete: Remove files from Supabase before deleting metadata.

```js
const supabase = require('../lib/supabase');

const uploadToSupabase = async (file, bucket) => {
  const filePath = `${Date.now()}_${file.originalname}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file.buffer, { contentType: file.mimetype });

  return { path: filePath, url: `${process.env.SUPABASE_STORAGE_URL}/${bucket}/${filePath}` };
};
```

* Updated Prisma schema to store Supabase file paths:

```prisma
videoStoragePath String? @map("video_storage_path")
thumbnailStoragePath String? @map("thumbnail_storage_path")
```

### Frontend Integration

* Installed `@supabase/supabase-js` in frontend.
* Added `lib/supabase.js` for browser-based access.
* Modified `uploadService.js` and `page.jsx` to directly upload files to Supabase.
* Updated `VideoCard.jsx` to handle Supabase URLs properly.

```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
);

export default supabase;
```


## Folder Structure (Frontend)

```
/app
  /upload
    page.jsx         # Upload page
/components/ui
  VideoCard.jsx      # Renders video with Supabase URL
/lib
  supabase.js        # Supabase client config
/services
  uploadService.js   # Upload logic to Supabase
```


## Testing & Deployment Checklist

* Ran migration script to transfer local files to Supabase.
* Verified videos load correctly from CDN URLs.
* Removed local `uploads/` directory usage.
* Environment variables securely added in `.env` and `.env.local`.


## Environment Variables

**Backend (.env):**

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1
```

**Frontend (.env.local):**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your-public-key
```


## Resources

* [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
* [TanStack Query](https://tanstack.com/query)
* [Prisma ORM](https://www.prisma.io/)
* [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing)

