import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EmployeeList from '../components/EmployeeList';
import styles from './Employees.module.css';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAdded = (newEmployee) => {
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee? Their attendance records will also be removed.')) return;
    try {
      await api.deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.head}>
          <h2 className={styles.title}>Employees</h2>
          <AddEmployeeForm onAdded={handleAdded} onError={setError} />
        </div>

        {loading && <Loading />}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={fetchEmployees} />
        )}
        {!loading && !error && employees.length === 0 && (
          <EmptyState
            message="No employees yet"
            subMessage="Add an employee using the form above."
          />
        )}
        {!loading && !error && employees.length > 0 && (
          <EmployeeList employees={employees} onDelete={handleDelete} />
        )}
      </div>
    </Layout>
  );
}
