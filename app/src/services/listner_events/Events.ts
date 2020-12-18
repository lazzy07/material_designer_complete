export type EventType = "save";
export type keyType = "keyDown" | "keyUp" | "keyPress";

export interface KeyEvent {
  type: EventType;
  key: number;
  keyType: keyType;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
}

export const defaultEvents: KeyEvent[] = [
  {
    type: "save",
    key: 83,
    keyType: "keyDown",
    ctrl: true,
    alt: false,
    shift: false
  }
];
