import { Router } from 'express';
import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';
import { markAttendanceRules, getAttendanceRules } from '../validators/attendance.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.post('/', markAttendanceRules, handleValidation, async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    const dateOnly = new Date(date);
    dateOnly.setUTCHours(0, 0, 0, 0);
    const existing = await Attendance.findOne({ employeeId, date: dateOnly });
    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ success: true, data: existing, updated: true });
    }
    const record = await Attendance.create({
      employeeId,
      date: dateOnly,
      status,
    });
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

router.get('/employee/:employeeId', getAttendanceRules, handleValidation, async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { from, to } = req.query;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    const filter = { employeeId };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setUTCHours(23, 59, 59, 999);
        filter.date.$lte = toDate;
      }
    }
    const records = await Attendance.find(filter).sort({ date: -1 }).lean();
    const presentCount = records.filter((r) => r.status === 'Present').length;
    res.json({ success: true, data: records, presentDays: presentCount });
  } catch (err) {
    next(err);
  }
});

export default router;
