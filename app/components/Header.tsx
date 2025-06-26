import styles from "../page.module.css";
import React from "react";

interface HeaderProps {
  score: number;
  timer: number;
  highScore: number;
}

export const Header: React.FC<HeaderProps> = ({ score, timer, highScore }) => {
  return (
    <div className={styles.header}>
      <div className={styles.score}>💰 {score} kr</div>
      <div className={styles.timer}>⏰ {timer}s</div>
      <div className={styles.highScore}>🏆 High score: {highScore} kr</div>
    </div>
  );
};
