# GeoPhotoMap

A full-stack web application that allows users to upload geotagged photos, visualize them on an interactive map, and interact through comments.

Built as part of the HyLight Fullstack Internship Technical Test.

---

# Features

## Authentication
- User signup
- User login
- JWT-based authentication
- Protected API routes

## Photo Upload
- Upload images with latitude and longitude
- Store uploaded images locally
- Save metadata in PostgreSQL

## Interactive Map
- Leaflet.js map integration
- Dynamic map markers
- Popup image previews

## Comments
- Add comments to uploaded photos
- Real-time comment display

## AI Description (MVP)
- Placeholder AI-generated image description
- Designed for future OpenAI Vision integration

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- React Router DOM
- React Leaflet
- Leaflet.js

## Backend
- Node.js
- Express.js
- JWT Authentication
- Multer

## Database
- PostgreSQL

## Storage
- Local file storage (`uploads/`)

---

# Architecture

Frontend (React)
↓
REST API (Express.js)
↓
PostgreSQL Database
↓
Local Image Storage

---

# Database Models

## Users

| Field | Type |
|---|---|
| id | SERIAL |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |

## Photos

| Field | Type |
|---|---|
| id | SERIAL |
| user_id | INTEGER |
| image_url | TEXT |
| latitude | DOUBLE |
| longitude | DOUBLE |
| description | TEXT |

## Comments

| Field | Type |
|---|---|
| id | SERIAL |
| photo_id | INTEGER |
| user_id | INTEGER |
| comment | TEXT |

---

# Image Upload Flow

1. User uploads image from frontend
2. React sends multipart/form-data request
3. Express receives image using Multer
4. Image stored in uploads folder
5. Metadata stored in PostgreSQL
6. Photos fetched and displayed on Leaflet map

---

# Scalability Considerations

## Image Storage Trade-offs

### Current MVP
- Local uploads folder
- Fast and simple for development

### Production Recommendation
- AWS S3 or Cloudinary
- CDN support
- Better scalability and reliability

## Handling 10k+ Photos

To maintain map performance:
- Marker clustering
- Pagination
- Lazy loading
- Bounding-box map queries
- Thumbnail optimization
- CDN caching

---

# AI Integration

The project includes a modular AI description utility.

Current implementation:
- Placeholder AI-generated descriptions

Future improvement:
- OpenAI Vision API integration
- Automatic image caption generation

---

# Deployment Strategy

## Frontend
- Vercel or Render

## Backend
- Render or Railway

## Database
- Neon PostgreSQL / Supabase PostgreSQL

## Storage
- AWS S3 / Cloudinary

---

# Time Estimation

| Task | Estimated Time |
|---|---|
| Project setup | 30 min |
| Backend APIs | 1.5 hr |
| Database integration | 30 min |
| Authentication | 45 min |
| Image upload | 45 min |
| Map integration | 1 hr |
| Comments system | 30 min |
| UI improvements | 45 min |
| AI placeholder integration | 20 min |
| Testing & debugging | 1 hr |

Total: ~6-7 hours

---

# Local Setup

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/geophotomap

JWT_SECRET=mysecretkey

OPENAI_API_KEY=
```

---

# Future Improvements

- Real AI image analysis
- Geolocation auto-detection
- Image optimization
- Marker clustering
- Mobile responsiveness
- Dark mode
- Cloud image storage
- User profiles
- Like system

---

# Author

Aileni Sathvik Reddy