export function formatArweaveTokenAmount(amount: number | string) {
  // Handle null, undefined, or zero amounts
  if (amount == null || Number(amount) === 0) return 0;

  // Convert to string and handle scientific notation
  const amountStr = String(Number(amount));

  // Ensure the string has at least 12 decimal places
  const paddedAmount = amountStr.padStart(12, "0");

  // Split into whole and decimal parts
  const wholePart = paddedAmount.slice(0, -12) || "0";
  const decimalPart = paddedAmount.slice(-12);

  // Format the whole part with commas for readability
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Trim trailing zeros from decimal part
  const trimmedDecimalPart = decimalPart.replace(/0+$/, "");

  const result = trimmedDecimalPart
    ? Number(`${formattedWholePart}.${trimmedDecimalPart}`)
    : Number(formattedWholePart);

  // Combine whole and decimal parts
  return isNaN(result) ? 0 : result;
}
