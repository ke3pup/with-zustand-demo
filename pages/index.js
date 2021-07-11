import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useStore } from './store';

export default function Home() {
  const { email } = useStore();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Email is: {email}</h1>
      </main>
    </div>
  );
}
