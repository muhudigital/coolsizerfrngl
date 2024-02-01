import { calculateNewRect } from "./calculateNewRect";

describe("calculateNewRect", () => {
  it('should correctly calculate width for direction "x"', () => {
    const prevRect = { width: 100, height: 150 };
    const result = calculateNewRect(
      prevRect,
      120,
      0,
      0,
      0,
      50,
      50,
      20,
      20,
      "x"
    );
    expect(result).toEqual({ width: 100, height: 150 });
  });

  it('should correctly calculate height for direction "y"', () => {
    const prevRect = { width: 100, height: 150 };
    const result = calculateNewRect(
      prevRect,
      0,
      170,
      0,
      0,
      50,
      50,
      20,
      20,
      "y"
    );
    expect(result).toEqual({ width: 100, height: 150 });
  });

  it('should correctly calculate both width and height for direction "xy"', () => {
    const prevRect = { width: 100, height: 150 };
    const result = calculateNewRect(
      prevRect,
      120,
      170,
      0,
      0,
      50,
      50,
      20,
      20,
      "xy"
    );
    expect(result).toEqual({ width: 100, height: 150 });
  });

  it("should respect minWidth and minHeight constraints", () => {
    const prevRect = { width: 40, height: 40 };
    const result = calculateNewRect(
      prevRect,
      120,
      170,
      0,
      0,
      50,
      50,
      20,
      20,
      "xy"
    );
    expect(result).toEqual({ width: 100, height: 150 });
  });
});
