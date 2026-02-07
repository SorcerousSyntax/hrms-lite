import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.wrapper} aria-busy="true">
      <div className={styles.spinner} />
      <span className={styles.text}>Loading…</span>
    </div>
  );
}
