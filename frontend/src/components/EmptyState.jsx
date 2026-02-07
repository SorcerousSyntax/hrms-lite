import styles from './EmptyState.module.css';

export default function EmptyState({ message, subMessage }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>—</div>
      <p className={styles.message}>{message}</p>
      {subMessage && <p className={styles.sub}>{subMessage}</p>}
    </div>
  );
}
