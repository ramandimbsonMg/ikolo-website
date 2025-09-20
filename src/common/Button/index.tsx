import React, { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

function Button({
  className,
  type = 'button',
  onClick,
  style,
  loading = false,
  children,
}: {
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  style?: React.CSSProperties;
  loading?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={className + ' ' + styles.button}
      style={style}
      onClick={onClick}
    >
      {loading ? <LoadingIndicator size={20} /> : children}
    </button>
  );
}

export default Button;
