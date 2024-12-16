// Linear regression utility functions
export function calculateRegression(x: number[], y: number[]) {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

export function predictY(x: number, slope: number, intercept: number): number {
  return slope * x + intercept;
}

export function predictX(y: number, slope: number, intercept: number): number {
  return (y - intercept) / slope;
}

export function parseInputValues(input: string): number[] {
  return input
    .split(",")
    .map((val) => Number(val.trim()))
    .filter((val) => !isNaN(val));
}
