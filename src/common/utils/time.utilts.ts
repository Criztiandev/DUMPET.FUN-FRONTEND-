export function getDaysFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  // Get difference in milliseconds
  const diffTime = date.getTime() - now.getTime();
  // Convert to days and round
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days ago`;
  }
  return `${diffDays} days left`;
}
