import Head from 'next/head';
import * as THREE from 'three';

import styles from '@/modules/gradients/gradients.module.scss';
import { useEffect, useRef } from 'react';
import Gradients from '@/modules/gradients/gradient';

export default function GradientsPage() {

  return (
    <>
      <Head>
        <title>Gradients Sandbox</title>
      </Head>
      <main className={styles.main}>
        <Gradients />
      </main>
    </>
  );
}
