import React, { useState } from 'react';
import styles from './styles.module.css';

export default function PageFeedback() {
  const [voted, setVoted] = useState(null);

  if (voted) {
    return (
      <div className={styles.container}>
        <p className={styles.thanks}>Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.question}>Was this page helpful?</p>
      <div className={styles.buttons}>
        <button
          className={styles.btn}
          onClick={() => setVoted('yes')}
          aria-label="Yes, this page was helpful"
        >
          👍 Yes
        </button>
        <button
          className={styles.btn}
          onClick={() => setVoted('no')}
          aria-label="No, this page was not helpful"
        >
          👎 No
        </button>
      </div>
    </div>
  );
}
