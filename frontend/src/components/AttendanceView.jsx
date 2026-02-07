import { useState } from 'react';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
import styles from './AttendanceView.module.css';

export default function AttendanceView({
  employees,
  selectedEmployeeId,
  onSelectEmployee,
  attendanceData,
  loading,
  onFilter,
}) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const selectedEmployee = employees.find((e) => e._id === selectedEmployeeId);
  const records = attendanceData?.records ?? [];
  const presentDays = attendanceData?.presentDays ?? 0;
  const filterError = attendanceData?.error;

  const handleApplyFilter = () => {
    onFilter(from || undefined, to || undefined);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <label className={styles.label}>
          Employee
          <select
            value={selectedEmployeeId}
            onChange={(e) => onSelectEmployee(e.target.value)}
            className={styles.select}
          >
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName} ({emp.employeeId})
              </option>
            ))}
          </select>
        </label>
        <div className={styles.filterRow}>
          <input
            type="date"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={styles.input}
          />
          <input
            type="date"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={styles.input}
          />
          <button type="button" className={styles.filterBtn} onClick={handleApplyFilter}>
            Filter
          </button>
        </div>
      </div>

      {selectedEmployee && (
        <p className={styles.summary}>
          Total present days: <strong>{presentDays}</strong>
        </p>
      )}

      {filterError && (
        <ErrorMessage message={filterError} />
      )}

      {loading && <Loading />}
      {!loading && !filterError && records.length === 0 && selectedEmployeeId && (
        <EmptyState
          message="No attendance records for this employee"
          subMessage="Mark attendance using the form above."
        />
      )}
      {!loading && !filterError && records.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>
                    <span className={r.status === 'Present' ? styles.present : styles.absent}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
