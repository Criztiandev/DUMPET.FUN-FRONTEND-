export function formatArweaveTokenAmount(amount: Number | string) {
  if (!amount) return;

  // Convert the amount to a string to handle very large numbers
  const amountStr = amount.toString();

  // Ensure the string has at least 12 characters (12 decimal places)
  const paddedAmount = amountStr.padStart(12, "0");

  // Split into whole and decimal parts
  const wholePart = paddedAmount.slice(0, -12) || "0";
  const decimalPart = paddedAmount.slice(-12);

  // Format the whole part with commas for readability
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Trim trailing zeros from decimal part
  const trimmedDecimalPart = decimalPart.replace(/0+$/, "");

  // Combine whole and decimal parts
  return trimmedDecimalPart
    ? Number(`${formattedWholePart}.${trimmedDecimalPart}`)
    : Number(formattedWholePart);
}
