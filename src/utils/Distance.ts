export const meterToKm = (meter: number): string => {
  if (meter < 1000) return `${meter}m`;
  const k = Math.floor(meter / 1000);
  const m = Math.floor(meter % 1000);
  return `${k}km ${m}m`;
};
