import { useState } from 'react';
import { api } from '../api/client';
import styles from './AddEmployeeForm.module.css';

const initial = { employeeId: '', fullName: '', email: '', department: '' };

export default function AddEmployeeForm({ onAdded, onError }) {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setSubmitting(true);
    onError?.(null);
    try {
      const { data } = await api.addEmployee(form);
      onAdded?.(data);
      setForm(initial);
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Employee ID') || msg.includes('email') || msg.includes('Duplicate')) {
        if (msg.toLowerCase().includes('email')) {
          setValidationErrors((prev) => ({ ...prev, email: msg }));
        } else if (msg.toLowerCase().includes('employee')) {
          setValidationErrors((prev) => ({ ...prev, employeeId: msg }));
        } else {
          onError?.(msg);
        }
      } else {
        onError?.(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="employeeId"
        placeholder="Employee ID"
        value={form.employeeId}
        onChange={handleChange}
        required
        className={validationErrors.employeeId ? styles.inputError : styles.input}
        aria-invalid={!!validationErrors.employeeId}
      />
      {validationErrors.employeeId && (
        <span className={styles.errorText}>{validationErrors.employeeId}</span>
      )}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className={validationErrors.email ? styles.inputError : styles.input}
        aria-invalid={!!validationErrors.email}
      />
      {validationErrors.email && (
        <span className={styles.errorText}>{validationErrors.email}</span>
      )}
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.btn} disabled={submitting}>
        {submitting ? 'Adding…' : 'Add Employee'}
      </button>
    </form>
  );
}
