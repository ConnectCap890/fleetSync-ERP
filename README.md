# FleetSync ERP — Transport & Fleet Management System

A full-stack ERP system built with the MERN stack for managing transport operations including vehicles, drivers, routes and trips across multiple user roles.

## 🌐 Live Demo
- **Frontend:** https://fleet-sync-9uf3xr905-connect-cap.vercel.app
- **Backend API:** https://fleetsync-erp-production.up.railway.app

## 🚀 Features

### Authentication & Security
- JWT based authentication with 12 hour token expiry
- Crypto generated unique IDs for secure login
- Role based access control — Admin, Manager and Driver
- Protected routes on both frontend and backend
- Bcryptjs password hashing

### Admin Features
- Complete system oversight
- Create and manage Managers and Drivers with auto generated credentials
- Full CRUD for Vehicles, Journeys and Trips
- Real time dashboard — total vehicles, active trips, available drivers
- User management with unique ID visibility

### Manager Features
- Create and manage Journeys and Trips
- View Drivers and Vehicles
- See only their own created trips
- Dashboard with relevant stats

### Driver Features
- View assigned trips with status
- Update trip status — Scheduled, In Progress, Completed, Cancelled
- View and manage own profile
- Change password

### Trip Management
- Conflict detection — prevents double booking of vehicles and drivers
- Automatic status updates — vehicle and driver status sync with trip status
- Trip filtering by role — Manager sees own trips, Driver sees assigned trips
- Schedule management with date picker

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- MongoDB Atlas (cloud database)
- JWT Authentication
- bcryptjs
- CORS

### Frontend
- React.js
- React Router DOM v6
- Axios with interceptors
- Tailwind CSS
- Context API for global auth state

## 🏗️ Architecture

### Backend — MVC Pattern with Layered Architecture

Routes → Middleware → Controllers → Models → MongoDB
- JWT auth middleware on all protected routes
- Role middleware for granular access control
- RESTful API design
- Separate User and Profile models for clean separation of concerns

### Frontend
- Component based architecture
- Protected routes with role verification
- Axios interceptors for automatic JWT token attachment
- Context API for global authentication state
- Collapsible sidebar navigation per role

## 👥 User Roles

| Feature | Admin | Manager | Driver |
|---|---|---|---|
| Create Users | ✅ | ❌ | ❌ |
| Manage Managers | ✅ | ❌ | ❌ |
| Manage Drivers | ✅ | View only | ❌ |
| Manage Vehicles | ✅ | View only | ❌ |
| Manage Journeys | ✅ | ✅ | ❌ |
| Manage Trips | ✅ | Own trips | Own trips |
| Update Trip Status | ✅ | ✅ | ✅ |
| View Profile | ✅ | ✅ | ✅ |

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- npm

### Installation

**Clone the repository:**
```bash
git clone https://github.com/ConnectCap890/fleetSync-ERP.git
cd fleetSync-ERP
```

**Setup Backend:**
```bash
cd backend
npm install
```

Create `.env` file in root:

PORT=5000
MongoDB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

Seed the first Admin:
```bash
node seed.js
```

Run backend:
```bash
npm start
```

**Setup Frontend:**
```bash
cd frontend
npm install
npm start
```

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` — Create new user (Admin only)
- `POST /api/auth/login` — Login with uniqueId and password

### Users
- `GET /api/users/` — Get all users (Admin)
- `GET /api/users/:id` — Get user by ID
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user (Admin)

### Managers
- `POST /api/managers/create` — Create manager profile (Admin)
- `GET /api/managers/` — Get all managers
- `GET /api/managers/me` — Get own profile (Manager)
- `PUT /api/managers/:id` — Update manager
- `DELETE /api/managers/:id` — Delete manager (Admin)

### Drivers
- `POST /api/drivers/create` — Create driver profile (Admin)
- `GET /api/drivers/` — Get all drivers (Admin, Manager)
- `GET /api/drivers/me` — Get own profile (Driver)
- `PUT /api/drivers/:id` — Update driver
- `DELETE /api/drivers/:id` — Delete driver (Admin)

### Vehicles
- `POST /api/vehicles/create` — Create vehicle (Admin, Manager)
- `GET /api/vehicles/` — Get all vehicles
- `PUT /api/vehicles/:id` — Update vehicle
- `DELETE /api/vehicles/:id` — Delete vehicle (Admin)

### Journeys
- `POST /api/journeys/create` — Create journey (Admin, Manager)
- `GET /api/journeys/` — Get all journeys
- `PUT /api/journeys/:id` — Update journey
- `DELETE /api/journeys/:id` — Delete journey (Admin)

### Trips
- `POST /api/trips/create` — Create trip (Admin, Manager)
- `GET /api/trips/` — Get trips (filtered by role)
- `PUT /api/trips/:id` — Update trip status
- `DELETE /api/trips/:id` — Delete trip (Admin)

## 🔮 Future Improvements
- Refresh token implementation for long sessions
- Race condition protection using MongoDB transactions
- Email notifications for new user credentials
- Google Maps Places API for location autocomplete
- React Native driver mobile app
- GPS vehicle tracking
- Advanced reporting and analytics
- Input validation with Joi or Zod
- Centralized error handling
- Unit and integration tests

## 👨‍💻 Author
Hassan — BBIT (final Year), Virtual University of Pakistan
GitHub: github.com/ConnectCap890