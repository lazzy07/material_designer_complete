/**
 * Get width and height of an element
 * @param {HTMLDivElement} elem element that need to be size checked
 * @returns {{width:number, height:number}} width and height of the element
 */
export const getSizeOfElement = (
  elem: HTMLDivElement
): { width: number; height: number } => {
  if (elem) {
    return { height: elem.clientHeight, width: elem.clientWidth };
  } else {
    return { height: 0, width: 0 };
  }
};
