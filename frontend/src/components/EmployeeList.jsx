import styles from './EmployeeList.module.css';

export default function EmployeeList({ employees, onDelete }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => onDelete(emp._id)}
                  aria-label={`Delete ${emp.fullName}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
