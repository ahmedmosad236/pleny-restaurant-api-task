# 📘 Pleny Task - Restaurant Management API

A scalable backend system built with NestJS, MongoDB, and Mongoose that provides restaurant management, user interactions, geospatial search, and recommendation engine.

---

# 🚀 Overview

This project is a backend API system that simulates a restaurant discovery and social platform, where users can:

* Create and browse restaurants
* Filter restaurants by cuisines
* Find nearby restaurants (GeoSpatial search)
* Follow restaurants
* Get personalized restaurant recommendations

---

# 🧱 Tech Stack

* NestJS
* MongoDB
* Mongoose
* TypeScript
* Swagger (API Documentation)
* Class Validator (Validation)

---

# 📁 Project Structure

```
src/
 ├── modules/
 │    ├── restaurants/
 │    ├── users/
 │    ├── follows/
 │
 ├── common/
 │    ├── dto/
 │    ├── interceptors/
 │    ├── filters/
 │    ├── constants/
 │    ├── utils/
 │
 ├── config/
 ├── main.ts
 ├── app.module.ts
```

---

# ⚙️ Features

## 🍔 Restaurant Management

* Create restaurant
* Get all restaurants
* Filter by cuisine
* Get restaurant by slug
* Pagination support

---

## 📍 GeoSpatial Search

Find restaurants within 1KM radius using MongoDB Geo queries.

---

## 👤 User System

* Create users
* Store favorite cuisines

---

## 🔗 Follow System

Users can follow restaurants (Many-to-Many relationship).

---

## 🧠 Recommendation Engine

Suggests restaurants based on:

* Users with similar cuisines
* Restaurants followed by those users

---

# 📡 API Endpoints

## 🍔 Restaurants

| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| POST   | `/restaurants`            | Create restaurant             |
| GET    | `/restaurants`            | Get all (pagination + filter) |
| GET    | `/restaurants/slug/:slug` | Get by slug                   |
| GET    | `/restaurants/nearby`     | Nearby restaurants            |

---

## 👤 Users

| Method | Endpoint                         | Description         |
| ------ | -------------------------------- | ------------------- |
| POST   | `/users`                         | Create user         |
| GET    | `/users`                         | Get all users       |
| GET    | `/users/recommendations/:userId` | Get recommendations |

---

## 🔗 Follows

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| POST   | `/follows` | Follow restaurant |

---

# 📍 Nearby Search Example

```
GET /restaurants/nearby?lat=30.0444&lng=31.2357
```

---

# 🧠 Recommendation Logic

1. Find users with similar favorite cuisines
2. Get restaurants followed by those users
3. Return:

   * Similar users
   * Recommended restaurants

---

# 🧪 Validation

All inputs are validated using:

* class-validator
* class-transformer
* Global ValidationPipe

---

# 🧾 API Response Format

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

# 📊 Pagination Format

```json
{
  "data": [],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

---

# 📚 Swagger Documentation

API documentation available at:

```
http://localhost:3000/api-docs
```

---

# ⚙️ Environment Setup

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

---

# 🚀 Run Project

```bash
# install dependencies
yarn install

# run development server
yarn start:dev
```

---

# 🧠 Key Highlights

* Clean modular architecture
* GeoSpatial queries (MongoDB 2dsphere)
* Aggregation pipelines
* Relationship modeling (Many-to-Many)
* Scalable recommendation system
* Production-ready structure

---

# 📌 Notes

* Slug is auto-generated from restaurant name
* Location uses GeoJSON format [lng, lat]
* Restaurants support max 3 cuisines
* Follows stored in separate collection for scalability

---

# 👨‍💻 Author

Ahmed Mosaad
Frontend Developer transitioning to Backend Engineering 🚀

---

# 🏁 Status

✔ Completed Core Requirements
✔ API Ready for Production Review
✔ Swagger Documented
✔ Clean Architecture Implemented

---

# ✅ Completed Tasks

## Task 1: User Schema
- ✅ Defined User Schema with Full Name
- ✅ Added Favorite Cuisines field
- ✅ Implemented validation and DTOs

## Task 2: User-Restaurant Relationship Schema
- ✅ Created Follow Schema for Many-to-Many relationship
- ✅ Each restaurant can have many followers
- ✅ Each user can follow many restaurants
- ✅ Added unique compound index (userId + restaurantId)

## Task 3: Find Nearby Restaurants API
- ✅ Implemented GeoSpatial queries using MongoDB 2dsphere index
- ✅ Finds restaurants within 1KM radius
- ✅ Uses `$geoNear` aggregation pipeline
- ✅ Returns distance in meters

## Task 4: Restaurant Recommendations API
- ✅ Takes User ID as input
- ✅ Step 1: Finds users with shared favorite cuisines
- ✅ Step 2: Retrieves restaurants followed by those users
- ✅ Step 3: Returns similar users and recommended restaurants
- ✅ Implemented using MongoDB Aggregation Pipeline
