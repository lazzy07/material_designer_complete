import { KeyEvent, defaultEvents } from "../listner_events/Events";

export default class KeyboardListen {
  static events: KeyEvent[] = defaultEvents;

  static listen = () => {
    document.addEventListener("keydown", e => {
      let shift = e.shiftKey;
      let ctrl = e.ctrlKey;
      let alt = e.altKey;
      let key = e.which;

      KeyboardListen.events.forEach(ele => {
        let shouldDispatch = true;
        if (ele.ctrl !== ctrl) {
          shouldDispatch = false;
        }
        if (ele.alt !== alt) {
          shouldDispatch = false;
        }
        if (ele.shift !== shift) {
          shouldDispatch = false;
        }
        if (key === ele.key && shouldDispatch) {
          let event = new Event(ele.type);
          document.dispatchEvent(event);
        }
      });
    });
  };
}
