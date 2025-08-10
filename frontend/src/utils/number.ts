export function isBetween(
  value: number | null | undefined,
  min: number,
  max: number,
): boolean {
  if (typeof value !== 'number') return false;

  return value >= min && value <= max;
}
