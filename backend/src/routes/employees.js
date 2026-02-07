import { Router } from 'express';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import { createEmployeeRules, deleteEmployeeRules } from '../validators/employee.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
});

router.post('/', createEmployeeRules, handleValidation, async (req, res, next) => {
  try {
    const { employeeId, fullName, email, department } = req.body;
    const employee = await Employee.create({
      employeeId: employeeId.trim(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      department: department.trim(),
    });
    res.status(201).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', deleteEmployeeRules, handleValidation, async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    await Attendance.deleteMany({ employeeId: req.params.id });
    res.json({ success: true, message: 'Employee deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
