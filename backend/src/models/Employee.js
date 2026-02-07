import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    department: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

employeeSchema.index({ email: 1 });
export default mongoose.model('Employee', employeeSchema);
