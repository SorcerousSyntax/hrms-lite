import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import MarkAttendanceForm from '../components/MarkAttendanceForm';
import AttendanceView from '../components/AttendanceView';
import styles from './Attendance.module.css';

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.getEmployees();
      setEmployees(data);
      if (data.length && !selectedEmployeeId) setSelectedEmployeeId(data[0]._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const fetchAttendance = useCallback(
    async (employeeId, from, to) => {
      if (!employeeId) return;
      setLoadingAttendance(true);
      try {
        const params = {};
        if (from) params.from = from;
        if (to) params.to = to;
        const { data, presentDays } = await api.getAttendance(employeeId, params);
        setAttendanceData({ records: data, presentDays });
      } catch (err) {
        setAttendanceData({ records: [], presentDays: 0, error: err.message });
      } finally {
        setLoadingAttendance(false);
      }
    },
    []
  );

  useEffect(() => {
    if (selectedEmployeeId) fetchAttendance(selectedEmployeeId);
    else setAttendanceData(null);
  }, [selectedEmployeeId, fetchAttendance]);

  const handleMarked = () => {
    if (selectedEmployeeId) fetchAttendance(selectedEmployeeId);
  };

  const handleFilter = (from, to) => {
    fetchAttendance(selectedEmployeeId, from, to);
  };

  if (loading) return <Layout><Loading /></Layout>;
  if (error) {
    return (
      <Layout>
        <ErrorMessage message={error} onRetry={fetchEmployees} />
      </Layout>
    );
  }
  if (employees.length === 0) {
    return (
      <Layout>
        <EmptyState
          message="No employees yet"
          subMessage="Add employees first, then you can mark attendance."
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.page}>
        <h2 className={styles.title}>Attendance</h2>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Mark attendance</h3>
          <MarkAttendanceForm
            employees={employees}
            onMarked={handleMarked}
            onError={setError}
          />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>View records</h3>
          <AttendanceView
            employees={employees}
            selectedEmployeeId={selectedEmployeeId}
            onSelectEmployee={setSelectedEmployeeId}
            attendanceData={attendanceData}
            loading={loadingAttendance}
            onFilter={handleFilter}
          />
        </section>
      </div>
    </Layout>
  );
}
