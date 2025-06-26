import React, { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { Bottle } from "../types";
import { generateBag } from "../generateBag";

interface BagProps {
  timer: number;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
  onDeposit: (bottle: Bottle, pos: { x: number; y: number }) => void;
  bag: Bottle[] | null;
  setBag: React.Dispatch<React.SetStateAction<Bottle[] | null>>
}

export const Bag: React.FC<BagProps> = ({ timer, dropZoneRef, onDeposit, bag, setBag }) => {
  const [dragged, setDragged] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [showBag, setShowBag] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const bagRef = useRef<HTMLDivElement | null>(null);
  const MAX_BOTTLES = 6;

  // Generate initial bag only on client after mount
  useEffect(() => {
    if (typeof window !== "undefined" && bag === null) {
      setBag(generateBag());
    }
  }, [bag]);

  // Generate new bag when bag is empty & timer > 0
  useEffect(() => {
    if (bag && bag.length === 0 && timer > 0) {
      setShowBag(false);
      setFadeIn(false);
      setTimeout(() => {
        setBag(generateBag());
        setShowBag(true);
        setTimeout(() => setFadeIn(true), 10); // trigger fade-in after mount
      }, 180); // Hide for 180ms
    }
  }, [bag, timer, setBag]);

  function onPointerDown(e: React.PointerEvent, id: string) {
    setDragged(id);
    setDragPos({ x: e.clientX, y: e.clientY });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragged) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  }
  function onPointerUp(e: React.PointerEvent, bottle: Bottle) {
    if (!dragged) return;
    const dropZone = dropZoneRef.current?.getBoundingClientRect();
    if (dropZone && dragPos) {
      if (
        dragPos.x > dropZone.left &&
        dragPos.x < dropZone.right &&
        dragPos.y > dropZone.top &&
        dragPos.y < dropZone.bottom
      ) {
        onDeposit(bottle, dragPos);
        setBag(bag => bag ? bag.filter(b => b.id !== bottle.id) : []);
      }
    }
    setDragged(null);
    setDragPos(null);
  }

  return (
    <div className={styles.bagArea}>
      {showBag && (
        <div className={styles.bag + (fadeIn ? ' ' + styles.bagFadeIn : '')} ref={bagRef}>
          <img
            src={"/gameprops/bag.png"}
            alt="Bag"
            className={styles.bagImg}
            draggable={false}
            style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none", position: "absolute", left: 0, top: 0, zIndex: 1 }}
          />
          {/* Placement zone for bottles/cans - adjust these values as needed */}
          {(() => {
            const zone = {
              left: 60, // px from left of bag
              top: 70,  // px from top of bag
              width: 140, // px
              height: 120 // px
            };
            return (
              <div
                style={{
                  position: "absolute",
                  left: zone.left,
                  top: zone.top,
                  width: zone.width,
                  height: zone.height,
                  borderRadius: 20,
                  zIndex: 2,
                  pointerEvents: "none",
                  boxSizing: "border-box"
                }}
              />
            );
          })()}
          {/* Place bottles/cans randomly within the zone */}
          {bag && bag.slice(0, MAX_BOTTLES).map((bottle: Bottle, i: number) => {
            const isDragging = dragged === bottle.id;
            // Placement zone (must match above)
            const zone = {
              left: 60,
              top: 70,
              width: 140,
              height: 120
            };
            function pseudoRandom(seed: string, min: number, max: number) {
              let hash = 0;
              for (let j = 0; j < seed.length; j++) hash = ((hash << 5) - hash) + seed.charCodeAt(j);
              const norm = Math.abs(Math.sin(hash)) % 1;
              return min + norm * (max - min);
            }
            // Random x/y within the zone
            const x = pseudoRandom(bottle.id, 0, 1);
            const y = pseudoRandom(bottle.id + "y", 0, 1);
            const maxW = bottle.type === "small" ? 50 : 80;
            const maxH = bottle.type === "small" ? 75 : 120;
            const left = zone.left + x * (zone.width - maxW);
            const top = zone.top + y * (zone.height - maxH);
            const z = Math.floor(pseudoRandom(bottle.id + "z", 2, 10));
            const style = isDragging && dragPos
              ? { position: "fixed" as const, left: dragPos.x - 48, top: dragPos.y - 80, zIndex: 1000, opacity: 1, pointerEvents: "none" as const }
              : { position: "absolute" as const, left: `${left}px`, top: `${top}px`, zIndex: z };
            const imgSize = bottle.type === "small" ? { width: 50, height: 75 } : { width: 80, height: 120 };
            return (
              <div
                key={bottle.id}
                className={styles.bottle + (isDragging ? ' ' + styles.dragging : '')}
                style={{ ...style, background: "none", boxShadow: "none" }}
                onPointerDown={e => onPointerDown(e, bottle.id)}
                onPointerMove={isDragging ? onPointerMove : undefined}
                onPointerUp={e => onPointerUp(e, bottle)}
              >
                <img
                  src={bottle.image}
                  alt={bottle.type === "small" ? "Can" : "Bottle"}
                  style={{ ...imgSize, pointerEvents: "none", objectFit: "contain", display: "block" }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
