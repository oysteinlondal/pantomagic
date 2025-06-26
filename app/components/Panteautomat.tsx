import React from "react";
import Image from "next/image";
import styles from "../page.module.css";

interface PanteautomatProps {
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
  showLabel: { label: string; pos: { x: number; y: number } } | null;
}

const dropZoneConfig = {
  left: "35%", // center horizontally
  top: 50,     // px from top
  width: 150,  // px
  height: 160, // px
  transform: "translateX(-50%)"
};

export const Panteautomat: React.FC<PanteautomatProps> = ({ dropZoneRef, showLabel }) => (
  <div className={styles.machineArea}>
    <div
      ref={dropZoneRef}
      className={styles.dropZone}
      style={{
        position: "absolute",
        left: dropZoneConfig.left,
        top: dropZoneConfig.top,
        width: dropZoneConfig.width,
        height: dropZoneConfig.height,
        transform: dropZoneConfig.transform
      }}
    />
    <Image
      src="/gameprops/panteautomat.png"
      alt="Panteautomat"
      width={320}
      height={180}
      className={styles.machineImg}
      priority
    />
    {/* Floating label for +1kr/+3kr animation */}
    {showLabel && (
      <div
        className={styles.scoreLabel}
        style={{ left: showLabel.pos.x - 40, top: showLabel.pos.y }}
      >
        {showLabel.label}
      </div>
    )}
  </div>
);
