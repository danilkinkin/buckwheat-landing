export const smooth = (value: number, target: number, smoothing: number) => {
  return value - (value - target) * smoothing;
};