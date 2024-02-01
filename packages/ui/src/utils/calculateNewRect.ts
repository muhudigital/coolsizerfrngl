export type Rect = {
  width: number;
  height: number;
};

// Calculate new width and height for a resizable element. The calculation is
// based on position of the element to avoid issues with difference calculation.
export function calculateNewRect(
  prevRect: Rect,
  clientX: number,
  clientY: number,
  scrollX: number,
  scrollY: number,
  minWidth: number,
  minHeight: number,
  offsetLeft: number,
  offsetTop: number,
  direction: "x" | "y" | "xy"
): Rect {
  const newWidth = clientX + scrollX - offsetLeft;
  const newHeight = clientY + scrollY - offsetTop;

  let width = prevRect.width;
  let height = prevRect.height;

  if (direction === "x") {
    width = Math.max(minWidth, newWidth);
  } else if (direction === "y") {
    height = Math.max(minHeight, newHeight);
  } else if (direction === "xy") {
    width = Math.max(minWidth, newWidth);
    height = Math.max(minHeight, newHeight);
  }

  return { width, height };
}
