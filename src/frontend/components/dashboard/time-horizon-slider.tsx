"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface TimeHorizonSliderProps {
    value: number;
    onChange: (val: number) => void;
}

export function TimeHorizonSlider({ value, onChange }: TimeHorizonSliderProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Label htmlFor="time-horizon-slider" className="text-lg font-semibold">Time Horizon</Label>
                <span className="text-2xl font-bold text-primary">{value} Years</span>
            </div>
            <Slider
                id="time-horizon-slider"
                defaultValue={[value]}
                max={30}
                min={1}
                step={1}
                value={[value]}
                onValueChange={(vals) => onChange(vals[0])}
                className="py-4"
                aria-label="Time Horizon in Years"
            />
            <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
            </div>
        </div>
    )
}
