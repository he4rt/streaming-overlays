import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  ariaLabel?: string;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  orientation = "horizontal",
  className = "",
  ariaLabel,
}: SliderProps) {
  const vertical = orientation === "vertical";
  return (
    <RadixSlider.Root
      orientation={orientation}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(v) => onChange(v[0]!)}
      aria-label={ariaLabel}
      className={`relative flex touch-none select-none items-center ${
        vertical ? "h-full w-4 flex-col" : "h-4 w-full"
      } ${className}`}
    >
      <RadixSlider.Track
        className={`relative grow overflow-hidden rounded-full bg-white/10 ${
          vertical ? "h-full w-1" : "h-1 w-full"
        }`}
      >
        <RadixSlider.Range
          className={`absolute rounded-full bg-accent ${vertical ? "w-full" : "h-full"}`}
        />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="block h-3 w-3 rounded-full bg-white shadow-md ring-1 ring-accent/40 transition focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </RadixSlider.Root>
  );
}
