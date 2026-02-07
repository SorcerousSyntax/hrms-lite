import { useState } from 'react';
import { api } from '../api/client';
import styles from './MarkAttendanceForm.module.css';

export default function MarkAttendanceForm({ employees, onMarked, onError }) {
  const [employeeId, setEmployeeId] = useState(employees[0]?._id || '');
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [status, setStatus] = useState('Present');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    onError?.(null);
    try {
      await api.markAttendance({
        employeeId,
        date: new Date(date).toISOString(),
        status,
      });
      onMarked?.();
    } catch (err) {
      onError?.(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className={styles.select}
        required
      >
        <option value="">Select employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.fullName} ({emp.employeeId})
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.input}
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={styles.select}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button type="submit" className={styles.btn} disabled={submitting}>
        {submitting ? 'Saving…' : 'Mark'}
      </button>
    </form>
  );
}
