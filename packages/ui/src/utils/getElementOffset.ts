// calculate the offset of an element relative to the document
export function getElementOffset(element: Element) {
  const rect = element.getBoundingClientRect();
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  return {
    offsetLeft: rect.left + scrollLeft,
    offsetTop: rect.top + scrollTop,
  };
}
