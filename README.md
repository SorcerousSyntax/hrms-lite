# HRMS Lite

A lightweight Human Resource Management System for managing employee records and daily attendance.

## Features

- **Employee Management**: Add employees (Employee ID, Full Name, Email, Department), view list, delete employees
- **Attendance Management**: Mark attendance (Date, Status: Present/Absent), view records per employee
- **Filter attendance** by date range (bonus)
- **Total present days** per employee (bonus)
- **Dashboard** with employee and attendance counts (bonus)

## Tech Stack

| Layer    | Technology        |
| -------- | ------------------ |
| Frontend | React 18, Vite, React Router |
| Backend  | Node.js, Express   |
| Database | MongoDB (Mongoose) |
| Styling  | CSS Modules        |

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string)

## Run Locally

### 1. Backend

```bash
cd backend
npm install
```

Set environment (optional):

- `MONGODB_URI` – default `mongodb://127.0.0.1:27017/hrms-lite`
- `PORT` – default `5000`

```bash
npm run dev
```

API runs at `http://localhost:5000`. Health: `GET http://localhost:5000/api/health`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and uses the backend via Vite proxy (`/api` → `http://localhost:5000`).

### 3. Production build (frontend)

```bash
cd frontend
npm run build
```

Set `VITE_API_URL` to your deployed backend URL when building (e.g. `VITE_API_URL=https://your-api.onrender.com/api npm run build`).

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List all employees |
| POST | `/api/employees` | Create employee (body: employeeId, fullName, email, department) |
| DELETE | `/api/employees/:id` | Delete employee (and their attendance) |
| POST | `/api/attendance` | Mark attendance (body: employeeId, date, status) |
| GET | `/api/attendance/employee/:employeeId` | Get attendance for employee (query: from, to) |

## Deployment

- **Frontend**: Deploy the `frontend` build (e.g. Vercel, Netlify). Set `VITE_API_URL` to your live backend API base URL (including `/api`) at build time.
- **Backend**: Deploy to Render, Railway, etc. Set `MONGODB_URI` to your MongoDB Atlas (or other) connection string and `PORT` as provided by the host.
- **Database**: Use MongoDB Atlas (free tier) and set `MONGODB_URI` in the backend.

## Assumptions / Limitations

- Single admin user; no authentication.
- Employee ID and email are unique; duplicates return 409.
- One attendance record per employee per day; marking again for the same day updates the record.
- Dates are stored in UTC; display uses local date formatting.

## Project Structure

```
hrms-lite/
├── backend/
│   ├── src/
│   │   ├── config/     # DB connection
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API routes
│   │   ├── validators/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/        # API client
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## License

MIT
