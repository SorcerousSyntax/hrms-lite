import { Router } from 'express';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [employeeCount, attendanceCount] = await Promise.all([
      Employee.countDocuments(),
      Attendance.countDocuments(),
    ]);
    res.json({ success: true, data: { employeeCount, attendanceCount } });
  } catch (err) {
    next(err);
  }
});

export default router;
