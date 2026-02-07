import { useState, useEffect } from 'react';
import { api } from '../api/client';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getStats()
      .then(({ data }) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Layout><Loading /></Layout>;
  if (error) return <Layout><ErrorMessage message={error} onRetry={() => window.location.reload()} /></Layout>;

  return (
    <Layout>
      <div className={styles.page}>
        <h2 className={styles.title}>Dashboard</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Employees</span>
            <span className={styles.cardValue}>{stats.employeeCount}</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Attendance Records</span>
            <span className={styles.cardValue}>{stats.attendanceCount}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
