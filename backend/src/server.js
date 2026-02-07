import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import employeesRouter from './routes/employees.js';
import attendanceRouter from './routes/attendance.js';
import statsRouter from './routes/stats.js';
import { errorHandler } from './middleware/errorHandler.js';

await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeesRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/stats', statsRouter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'HRMS Lite API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
