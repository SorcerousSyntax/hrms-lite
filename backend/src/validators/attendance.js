import { body, param, query } from 'express-validator';

export const markAttendanceRules = [
  body('employeeId').isMongoId().withMessage('Valid employee ID is required'),
  body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Invalid date format'),
  body('status').isIn(['Present', 'Absent']).withMessage('Status must be Present or Absent'),
];

export const getAttendanceRules = [
  param('employeeId').isMongoId().withMessage('Invalid employee ID'),
  query('from').optional().isISO8601().withMessage('Invalid from date'),
  query('to').optional().isISO8601().withMessage('Invalid to date'),
];
