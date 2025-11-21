"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function RoiTracker() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const calculate = () => {
    const init = parseFloat(initialInvestment);
    const curr = parseFloat(currentValue);
    if (isNaN(init) || isNaN(curr) || init === 0) {
      setError("Please enter valid numbers.");
      setResult("");
      return;
    }
    const roi = ((curr - init) / init) * 100;
    setResult(roi.toFixed(2) + "%");
    setError("");
  };

  const clear = () => {
    setInitialInvestment("");
    setCurrentValue("");
    setResult("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="initial">Initial Investment</Label>
        <Input
          id="initial"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="current">Current Value</Label>
        <Input
          id="current"
          type="number"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={calculate}>Calculate ROI</Button>
        <Button variant="outline" onClick={clear}>Clear</Button>
      </div>
      {error && <p className="text-destructive">{error}</p>}
      {result && (
        <div className="p-4 bg-muted rounded">
          <p className="font-semibold">Your ROI:</p>
          <p className="text-2xl">{result}</p>
        </div>
      )}
    </div>
  );
}
