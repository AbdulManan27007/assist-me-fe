import { debounce } from "@mui/material";
import { Input } from "../ui/input";
import { useEffect, useRef, useState, useMemo } from "react";

export function Range({
  min = 0,
  max = 1000,
  changeMin,
  changeMax,
}: {
  min?: number;
  max?: number;
  changeMin?: (value: number) => void;
  changeMax?: (value: number) => void;
}) {
  const rangeRef = useRef<HTMLDivElement>(null);

  const [endpoints, setEndpoints] = useState({
    start: rangeRef.current?.getBoundingClientRect().x,
    end:
      (rangeRef.current?.getBoundingClientRect().x ?? 0) +
      (rangeRef.current?.getBoundingClientRect().width ?? 0),
    width: rangeRef.current?.offsetWidth ?? 0,
    scale: (rangeRef.current?.offsetWidth ?? 0) / (max - min),
  });

  const [progress, setProgress] = useState({ min: 0, max: 100 });

  useEffect(() => {
    if (rangeRef.current) {
      setEndpoints({
        start: rangeRef.current.getBoundingClientRect().x,
        end:
          rangeRef.current.getBoundingClientRect().x +
          rangeRef.current.getBoundingClientRect().width,
        width: rangeRef.current.offsetWidth,
        scale: (rangeRef.current.offsetWidth ?? 0) / (max - min),
      });
    }
  }, [rangeRef.current]);

  const [isDragging, setIsDragging] = useState<"min" | "max">();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.style.userSelect = "none";

    if (!endpoints.start) return;

    const percentOfProgressAtThisPoint = Math.min(
      Math.max(((e.clientX - endpoints.start) / endpoints.width) * 100, 0),
      100
    );
    const distanceToMin = Math.abs(percentOfProgressAtThisPoint - progress.min);
    const distanceToMax = Math.abs(percentOfProgressAtThisPoint - progress.max);

    if (distanceToMin === distanceToMax) {
      const rangeMiddle = (progress.min + progress.max) / 2;
      const closerEndpoint =
        percentOfProgressAtThisPoint < rangeMiddle ? "min" : "max";
      setIsDragging(closerEndpoint);
      return;
    }
    const closerEndpoint = distanceToMin > distanceToMax ? "max" : "min";

    setIsDragging(closerEndpoint);
  };

  const handleMouseUp = () => {
    document.body.style.userSelect = "auto";
    setIsDragging(undefined);
  };

  useEffect(() => {
    if (!endpoints.start || !endpoints.end || !endpoints.width) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging === "min") {
        const distancePercentage =
          ((e.clientX - (endpoints.start ?? 0)) / (endpoints.width ?? 1)) * 100;
        setProgress({
          ...progress,
          min: Math.max(0, Math.min(distancePercentage, progress.max)),
        });
      }
      if (isDragging === "max") {
        const distancePercentage =
          ((e.clientX - (endpoints.start ?? 0)) / (endpoints.width ?? 1)) * 100;
        setProgress({
          ...progress,
          max: Math.min(100, Math.max(distancePercentage, progress.min)),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [endpoints, isDragging]);

  const [actualMin, setActualMin] = useState(
    Math.max(min, min + (max - min) * (progress.min / 100))
  );
  const [actualMax, setActualMax] = useState(
    min + (max - min) * (progress.max / 100)
  );

  useEffect(() => {
    setActualMin(Math.max(min, min + (max - min) * (progress.min / 100)));
  }, [progress.min]);

  useEffect(() => {
    setActualMax(Math.min(max, min + (max - min) * (progress.max / 100)));
  }, [progress.max]);

  const debouncedChangeMin = useMemo(
    () => debounce((value: number) => changeMin?.(value), 300),
    [changeMin]
  );

  const debouncedChangeMax = useMemo(
    () => debounce((value: number) => changeMax?.(value), 300),
    [changeMax]
  );

  useEffect(() => {
    debouncedChangeMin(actualMin);
  }, [actualMin, debouncedChangeMin]);

  useEffect(() => {
    debouncedChangeMax(actualMax);
  }, [actualMax, debouncedChangeMax]);

  return (
    <div className="grid gap-3">
      <div className="h-4" onMouseDown={handleMouseDown}>
        <div
          ref={rangeRef}
          className="bg-white-3 rounded-full h-1 w-full relative"
        >
          <div
            id="min"
            className="w-4 h-4 rounded-full bg-accent absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer z-10"
            style={{ left: `${progress.min}%` }}
          />
          <div
            id="max"
            className="w-4 h-4 rounded-full bg-accent absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer z-10"
            style={{ left: `${progress.max}%` }}
          />
          <div
            className="h-1 rounded-full bg-accent absolute top-1/2 -translate-y-1/2"
            style={{
              width: `${progress.max - progress.min}%`,
              left: `${progress.min}%`,
              right: `${100 - progress.max}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          smallLabel="Min"
          value={Math.round(actualMin)}
          placeholder="A$0.00"
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/gi, "");
            const newMin = Math.max(min, Math.min(max, Number(inputValue)));
            setActualMin(newMin);
            setProgress((prev) => ({
              ...prev,
              min: ((newMin - min) / (max - min)) * 100,
            }));
          }}
        />
        <Input
          smallLabel="Max"
          value={Math.round(actualMax)}
          placeholder="A$0.00"
          onChange={(e) => {
            const inputValue = e.target.value.replace(/[^0-9]/g, "");
            const newMax = Math.max(min, Math.min(max, Number(inputValue)));
            if (inputValue.length >= `${min}`.length) {
              setActualMax(newMax);
              setProgress((prev) => ({
                ...prev,
                max: ((newMax - min) / (max - min)) * 100,
              }));
            } else if (inputValue.length === 0) {
              setActualMax(max);
              setProgress((prev) => ({
                ...prev,
                max: 100,
              }));
            } else setActualMax(+inputValue);
          }}
          onBlur={(e) => {
            if (Number(e.currentTarget.value) < min) {
              setActualMax(min + 1);
              setProgress((prev) => ({
                ...prev,
                max: ((min + 1 - min) / (max - min)) * 100,
              }));
            }
          }}
        />
      </div>
    </div>
  );
}
