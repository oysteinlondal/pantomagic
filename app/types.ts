export interface BottleType {
  type: "small" | "large";
  value: number;
  image: string;
  label: string;
}

export interface Bottle extends BottleType {
  id: string;
}
