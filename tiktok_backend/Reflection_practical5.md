
# Practical 5: Implementing Cloud Bucket Storage with Supabase


## Introduction

In this practical, we upgraded our TikTok application’s file storage system by migrating from local file storage to **cloud storage using Supabase**. This shift improves the app's **scalability**, **reliability**, and **performance**, ensuring that user-uploaded videos and thumbnails are stored securely and served efficiently via a global CDN.

---

## What I Learned

- **Cloud Storage Concepts**: Understood the limitations of local file storage and how cloud storage addresses them.
- **Supabase Storage**: Learned to configure **Supabase buckets**, create storage **policies**, and manage access control using role-based rules.
- **Direct Upload Architecture**: Realized the benefits of frontend-to-cloud uploads, reducing backend load and increasing speed.
- **Supabase SDK Integration**: Set up Supabase clients in both backend and frontend environments.
- **URL Management**: Handled Supabase file URLs properly to render media in the UI and track storage paths in the database.
- **Schema Updates**: Modified the Prisma schema to include video and thumbnail storage paths.

---

## Challenges Faced

- **Permission Policies**: Writing custom RLS policies in Supabase that balanced access and security required attention to detail.
- **URL Handling**: Updating components like `VideoCard` to correctly handle and load files from Supabase URLs.
- **Migration**: Moving existing video files from local storage to Supabase without breaking links or causing downtime.
- **Environment Variables**: Configuring different sets of environment variables for backend and frontend access safely.

---

## Key Takeaways

- Supabase Storage is a robust solution for managing file uploads in modern applications.
- Using a **Content Delivery Network (CDN)** drastically improves video playback speed and reduces server strain.
- Managing cloud storage alongside metadata in the database helps create a clean and maintainable system.
- Securely handling API keys and roles is essential when working with public and private files.

---

## How This Builds on Previous Practicals

This practical builds on our earlier backend and database setup by decoupling file storage from the local filesystem. It complements the Prisma ORM work from Practical 4 and continues to modernize the stack by adding cloud-native features to our full stack TikTok app.



## What I Would Do Differently

If I redid this practical, I would:
- Set up storage buckets and policies at the beginning of the project to avoid migration later.
- Automate uploads and metadata syncing during the upload process more cleanly.
- Explore private bucket access with token-based download links for more secure media access.



## Conclusion

This practical demonstrated how to integrate **Supabase Storage** into a real-world application. Migrating from local file storage to cloud storage made the app more production-ready, scalable, and performant. It also gave me real experience in working with external APIs, cloud file architecture, and secure storage systems.

