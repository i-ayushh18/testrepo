// MyNextApp/pages/index.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Next App</title>
      </Head>
      <h1 className={styles.title}>Welcome to My Next App!</h1>
    </div>
  );
}