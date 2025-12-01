Below is the **FULL + CLEAN + READY-TO-COPY/PASTE** Cursor AI prompt exactly how you requested — no explanations, no extra text.
Just copy it and paste into Cursor.

---

# ✅ **COPY–PASTE READY — CURSOR AI PROMPT**

**TASK:**
Create a **full JavaFX + Online Movie Gallery System** with both **Offline (desktop)** and **Online (MongoDB)** features.
Include admin panel, payment, downloader, media player, file manager, premium system, playlists, rating, trending, etc.
Follow all details below exactly.

---

# **PART 1 — DESKTOP (OFFLINE) APPLICATION — JavaFX**

Build a **JavaFX desktop application** with:

### **A. File Management**

* Folder selection (user chooses and can change the file path).
* File downloading.
* File deleting.
* View file metadata.
* Auto folders: Movies, Music, Downloads.
* Search local files.
* Tags & categories based on filename.

### **B. Media Players**

* Video player (MP4, MKV, AVI).
* Music player (MP3, WAV).
* Playlist support.
* Play, pause, volume, speed, full-screen.
* Continue-where-you-left-off.

### **C. Universal Media Downloader**

Use **yt-dlp** + FFmpeg behind the scenes.

#### Supports:

* YouTube single video
* YouTube playlist
* Audio MP3 download
* Playlist audio MP3
* Download ANY video or audio from ANY website
* Quality selection
* Progress bar
* Cancel download

### **D. UI (JavaFX)**

* Modern UI (Material/Fluent design).
* Navigation drawer.
* Dashboard, File Manager, Video Player, Music Player, Downloader, Online Store, Settings.
* Dark/light mode.
* Animated transitions.
* Responsive grid view for media.
* Glass/blur effects.

### **E. Extra Features**

* Local history.
* Favorites.
* Recent downloads.
* In-app update checker.

---

# **PART 2 — ONLINE (MongoDB + Backend + Admin)**

Create a backend service (Spring Boot OR Node.js + Express — choose best).
Connect to **MongoDB**.

## **A. Admin Features**

Admin can:

* Upload movies.
* Upload trailers.
* CRUD (create, read, update, delete) movies.
* CRUD actors, categories, genres, series, seasons.
* Manage premium movies.
* Manage trending/latest/popular flags.
* Manage banners/sliders.
* Approve or reject user payments (screenshots optional).
* Manage premium plans.
* View users & download logs.
* Manage prices and reservations.
* System statistics dashboard.

## **B. User Features**

Users can:

* Register/Login.
* Guest mode (default, no login required for basic browsing).
* View movies, trailers, details.
* Download movies from store.
* Download files from other sites using URL (same universal downloader as desktop).
* Rate movies (stars + comment).
* Like/dislike.
* Add to favorites.
* View history.
* Watchlist.
* Trending / Latest / Popular / Top Rated sections.
* Series: seasons + episodes.
* Recommended movies.

## **C. Payments**

Integrate:

* Stripe
* Chapa
* Local bank transfer (admin verifies screenshot)
* Subscription packages
* Pay-per-movie
* Premium features

## **D. Premium System**

Premium users get:

* Faster downloads
* High-quality movie versions
* Exclusive movies
* No ads
* Unlimited playlist downloads
* Early access
* Premium-only categories
* Special badge

Admin controls all premium settings.

## **E. Reservation Method**

Users can reserve unreleased films.
Admin approves/declines.
Users get notified when available.

## **F. Engagement System**

* Points
* Levels
* Achievements
* Badges
* Activity logs

---

# **PART 3 — GLOBAL SYSTEM REQUIREMENTS**

### **A. Architecture**

* Clean Architecture.
* MVC for JavaFX.
* Modularized project.

### **B. Security**

* JWT auth.
* Hashed passwords.
* Roles: ADMIN, USER, GUEST.

### **C. APIs**

Provide all REST endpoints:

* Auth
* Movies
* Series
* Categories
* Payment
* Ratings
* Downloads
* Premium
* Reservation
* User dashboard

### **D. Testing**

* Unit tests
* Integration tests

### **E. Performance**

* Caching for movies & sliders
* Preload images
* Async downloads

---

# **PART 4 — WHAT TO GENERATE**

Cursor should generate the following:

## **A. JavaFX Project Structure**

* Controllers
* FXML UI files
* Services
* Models
* Media players
* Downloader integration (yt-dlp)
* File manager
* Settings system
* Beautiful UI

## **B. Backend Project**

* REST APIs
* MongoDB schemas
* Service layer
* Admin panel API
* User API
* Payments API
* Download tracking
* Recommendation logic

## **C. Documentation**

* Installation steps
* How to run JavaFX app
* How to run backend
* API documentation
* Config files

---

# **FINAL REQUIREMENT**

Produce the **full system step-by-step**, with:

* Directory structure
* Code generation
* UI layout
* Backend endpoints
* Database schema
* Integration between desktop app & backend

Do **not** simplify anything.
Use modern best-practices everywhere.

---

# END OF PROMPT

Generate everything.

---

If you want, I can also generate **a minimal version**, **a pro version**, **only backend**, **only JavaFX**, or **database structure only**.
