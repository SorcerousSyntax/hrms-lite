import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.logo}>HRMS Lite</h1>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={location.pathname === '/' ? styles.navActive : styles.navLink}
          >
            Employees
          </Link>
          <Link
            to="/dashboard"
            className={location.pathname === '/dashboard' ? styles.navActive : styles.navLink}
          >
            Dashboard
          </Link>
          <Link
            to="/attendance"
            className={location.pathname === '/attendance' ? styles.navActive : styles.navLink}
          >
            Attendance
          </Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
