import { body, param } from 'express-validator';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createEmployeeRules = [
  body('employeeId').trim().notEmpty().withMessage('Employee ID is required'),
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .matches(emailRegex)
    .withMessage('Invalid email format'),
  body('department').trim().notEmpty().withMessage('Department is required'),
];

export const deleteEmployeeRules = [
  param('id').isMongoId().withMessage('Invalid employee ID'),
];
