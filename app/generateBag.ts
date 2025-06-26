import { Bottle, BottleType } from "./types";

const bottleTypes: BottleType[] = [
  { type: "small", value: 1, image: "/gameprops/can.png", label: "+1kr" },
  { type: "large", value: 3, image: "/gameprops/plastic-bottle.png", label: "+3kr" },
];

export function generateBag(): Bottle[] {
  const count = Math.floor(Math.random() * 3) + 3; // 3-5 bottles/cans
  return Array.from({ length: count }, (_, i) => {
    const t = bottleTypes[Math.random() > 0.5 ? 1 : 0];
    return {
      id: `${i}-${Math.random()}`,
      ...t,
    };
  });
}
