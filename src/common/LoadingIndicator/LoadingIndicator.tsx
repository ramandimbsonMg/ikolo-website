import React from 'react';
import styles from './style.module.css';
function LoadingIndicator({ text, size }: { text?: string; size?: number }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.loader}
        style={{
          height: size || 40,
          width: size || 40,
        }}
      />
      {text && <span>{text}</span>}
    </div>
  );
}

export default LoadingIndicator;
