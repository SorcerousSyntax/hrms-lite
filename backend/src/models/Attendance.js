import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Present', 'Absent'] },
  },
  { timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });
export default mongoose.model('Attendance', attendanceSchema);
