import React from "react";
import styles from "../page.module.css";

interface ReceiptProps {
  score: number;
  highScore: number;
  reset: () => void;
}

export const Receipt: React.FC<ReceiptProps> = ({ score, highScore, reset }) => (
  <div className={styles.receiptOverlay}>
    <div className={styles.receipt}>
      <div className={styles.receiptHeader}>Pantelapp</div>
      <div className={styles.receiptBody}>
        <div className={styles.receiptRow}><span>Total</span><span>{score} kr</span></div>
        <div className={styles.receiptRow}><span>Machine</span><span>#01</span></div>
        <div className={styles.receiptRow}><span>Date</span><span>{typeof window !== 'undefined' ? new Date().toLocaleDateString() : ''} {typeof window !== 'undefined' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span></div>
        <div className={styles.receiptRow}><span>High score</span><span>{highScore} kr</span></div>
      </div>
      <div className={styles.receiptFooter}>Thank you for using the panteautomat!<br/>Tap to play again</div>
      <button className={styles.resetBtn} onClick={reset}>New round</button>
    </div>
  </div>
);
