"use client";

import { Header } from "./components/Header";
import { Panteautomat } from "./components/Panteautomat";
import { Bag } from "./components/Bag";
import { Receipt } from "./components/Receipt";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { Bottle } from "./types";

// --- State ---
export default function Home() {
  const [bag, setBag] = useState<Bottle[] | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [highScore, setHighScore] = useState<number>(0);
  const [showLabel, setShowLabel] = useState<{
    label: string;
    pos: { x: number; y: number };
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  // --- Refs ---
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  useEffect(() => {
    if (timer <= 0) return;
    timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current!);
  }, [timer]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = Number(localStorage.getItem("highScore") || 0);
      setHighScore(stored);
    }
  }, []);

  function reset() {
    setScore(0);
    setTimer(30);
	setBag(null)
  }

  useEffect(() => {
    if (timer === 0 && score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", String(score));
    }
  }, [timer, score, highScore]);

  // --- Render ---
  return (
    <div className={styles.gameWrapper}>
      <Header score={score} timer={timer} highScore={highScore} />
      <Panteautomat dropZoneRef={dropZoneRef} showLabel={showLabel} />
      {mounted && (
        <Bag
          timer={timer}
          dropZoneRef={dropZoneRef}
          onDeposit={(bottle, pos) => {
            setScore(s => s + bottle.value);
            setShowLabel({ label: bottle.label, pos });
            setTimeout(() => setShowLabel(null), 700);
          }}
		  bag={bag}
		  setBag={setBag}
        />
      )}
      {timer <= 0 && (
        <Receipt score={score} highScore={highScore} reset={reset} />
      )}
    </div>
  );
}
