import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useStore } from './store';

export default function Login() {
  const { email, setEmail, loading } = useStore();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Set email to dummy value</h1>
        <h1 className={styles.title}>Loading: {loading}</h1>
        <button
          onClick={() => {
            // Dummy logic to create a "session" for this user
            localStorage.setItem('user-has-session', true);
            setEmail('foo@bar.com');
          }}
        >
          set email
        </button>
      </main>
    </div>
  );
}
