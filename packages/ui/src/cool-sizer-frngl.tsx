"use client";

import {
  HTMLProps,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { calculateNewRect } from "./utils/calculateNewRect";
import { getElementOffset } from "./utils/getElementOffset";

type Direction = "x" | "y" | "xy";

type Props = PropsWithChildren<
  HTMLProps<HTMLDivElement> & {
    minWidth?: number;
    minHeight?: number;
    directions?: Direction[];
    xHandleClassName?: string;
    yHandleClassName?: string;
    xyHandleClassName?: string;
  }
>;

export const CoolSizerFrngl = ({
  children,
  className,
  minWidth = 0,
  minHeight = 0,
  directions = ["x", "y", "xy"],
  xHandleClassName,
  yHandleClassName,
  xyHandleClassName,
  ...props
}: Props) => {
  const [rect, setRect] = useState(
    null as { width: number; height: number } | null
  );
  const containerRef = useRef(null);
  const directionRef = useRef("xy" as "x" | "y" | "xy");

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      // We use the container's width and height as a default value in case we dind't resize it yet
      // This is because the container can be rendered at content's size.
      const { offsetHeight, offsetWidth } = containerRef.current;

      // We calculate the offset of the container relative to the document as a base of the calculation
      const { offsetLeft, offsetTop } = getElementOffset(containerRef.current);

      const currentheight = offsetHeight ?? 0;
      const currentWidth = offsetWidth ?? 0;
      const direction = directionRef.current;

      setRect((prevRect) =>
        calculateNewRect(
          {
            width: prevRect?.width ?? currentWidth,
            height: prevRect?.height ?? currentheight,
          },
          e.clientX,
          e.clientY,
          window.scrollX,
          window.scrollY,
          minWidth,
          minHeight,
          offsetLeft,
          offsetTop,
          direction
        )
      );
    },
    [minWidth, minHeight]
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  // onMouseDown we attach the mousemove function to a document instead of the container or resizer.
  // This is because we want to be able to resize the container even if the mouse is outside of it.
  const handleMouseDownX = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      directionRef.current = "x";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  const handleMouseDownY = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      directionRef.current = "y";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  const handleMouseDownXY = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      directionRef.current = "xy";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  return (
    <div
      className={twMerge("relative", className)}
      ref={containerRef}
      style={
        rect
          ? {
              width: rect.width,
              height: rect.height,
            }
          : undefined
      }
      {...props}
    >
      {directions.includes("x") && (
        <div
          className={twMerge(
            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-blue-500 w-4 h-4 cursor-ew-resize z-50",
            xHandleClassName
          )}
          onMouseDown={handleMouseDownX}
        ></div>
      )}
      {directions.includes("y") && (
        <div
          className={twMerge(
            "absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 bg-blue-500 w-4 h-4 cursor-ns-resize z-50",
            yHandleClassName
          )}
          onMouseDown={handleMouseDownY}
        ></div>
      )}
      {directions.includes("xy") && (
        <div
          className={twMerge(
            "absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 bg-blue-500 w-4 h-4 cursor-nwse-resize z-50",
            xyHandleClassName
          )}
          onMouseDown={handleMouseDownXY}
        ></div>
      )}
      {children}
    </div>
  );
};
