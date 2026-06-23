# FleetSync ERP — Transport & Fleet Management System

A full-stack ERP system built with the MERN stack for managing transport operations including vehicles, drivers, routes and trips across multiple user roles.

## Live Demo
Coming soon after deployment

## Features

### Authentication & Authorization
- JWT based authentication
- Role based access control — Admin, Manager and Driver roles
- Protected routes on both frontend and backend
- Secure password hashing with bcryptjs

### Admin Features
- Create and manage user accounts for Managers and Drivers
- Full CRUD for Managers, Drivers, Vehicles, Journeys and Trips
- Dashboard with real time stats — total vehicles, active trips, available drivers
- Complete system oversight

### Manager Features
- View and manage Drivers
- Create and manage Journeys and Trips
- Vehicle management
- Dashboard overview

### Driver Features
- View assigned trips
- Update trip status
- View own profile

### Trip Management
- Vehicle availability check before trip assignment
- Driver availability check before trip assignment
- Automatic status updates — vehicle and driver status change when trip starts or ends
- Trip status flow — Scheduled → In Progress → Completed/Cancelled

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs
- CORS

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Context API for state management

## Architecture

### Backend — MVC Pattern

- Layered architecture with clear separation of concerns
- Role based middleware protecting all routes
- RESTful API design

### Frontend
- Component based architecture
- Protected routes with role verification
- Axios interceptors for automatic token attachment
- Context API for global auth state

## Getting Started

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
cd backend
node seed.js
```

Run backend:
```bash
nodemon server.js
```

**Setup Frontend:**
```bash
cd frontend
npm install
npm start
```

## API Endpoints

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
- `GET /api/managers/` — Get all managers (Admin)
- `GET /api/managers/:id` — Get manager by ID
- `PUT /api/managers/:id` — Update manager
- `DELETE /api/managers/:id` — Delete manager (Admin)

### Drivers
- `POST /api/drivers/create` — Create driver profile (Admin)
- `GET /api/drivers/` — Get all drivers (Admin, Manager)
- `GET /api/drivers/:id` — Get driver by ID
- `PUT /api/drivers/:id` — Update driver
- `DELETE /api/drivers/:id` — Delete driver (Admin)

### Vehicles
- `POST /api/vehicles/create` — Create vehicle (Admin, Manager)
- `GET /api/vehicles/` — Get all vehicles
- `GET /api/vehicles/:id` — Get vehicle by ID
- `PUT /api/vehicles/:id` — Update vehicle
- `DELETE /api/vehicles/:id` — Delete vehicle (Admin)

### Journeys
- `POST /api/journeys/create` — Create journey (Admin, Manager)
- `GET /api/journeys/` — Get all journeys
- `GET /api/journeys/:id` — Get journey by ID
- `PUT /api/journeys/:id` — Update journey
- `DELETE /api/journeys/:id` — Delete journey (Admin)

### Trips
- `POST /api/trips/create` — Create trip (Admin, Manager)
- `GET /api/trips/` — Get all trips
- `GET /api/trips/:id` — Get trip by ID
- `PUT /api/trips/:id` — Update trip status
- `DELETE /api/trips/:id` — Delete trip (Admin)

## Future Improvements
- Refresh token implementation
- Race condition protection using MongoDB transactions
- Email notifications for new user credentials
- React Native driver mobile app
- GPS vehicle tracking
- Advanced reporting and analytics

## Author
Hassan — BBIT Graduate, Virtual University of Pakistan
GitHub: github.com/ConnectCap890