export function getDaysFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  // Reset hours to start of day for accurate day comparison
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  // Get difference in milliseconds
  const diffTime = date.getTime() - now.getTime();
  // Convert to days
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Check if it's today
  if (diffDays === 0) {
    return "New";
  }

  // Check if it's ended
  if (diffDays < 0) {
    // If it's exactly -1, show "Yesterday"
    if (diffDays === -1) {
      return "New";
    }
    // If it's more than 30 days ago, show "Ended"
    if (Math.abs(diffDays) > 30) {
      return "Ended";
    }
    return `${Math.abs(diffDays)} days ago`;
  }

  // Future dates
  if (diffDays === 1) {
    return "Advance";
  }
  return `${diffDays} days left`;
}

export const formatDuration = (duration: number): string => {
  const now = Date.now();

  // Handle duration vs timestamp
  const targetTime = duration < 1000000000000 ? now + duration : duration;
  const diffInMs = targetTime - now;
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // Check for invalid input
  if (isNaN(diffInSeconds) || !isFinite(diffInSeconds)) {
    return "Invalid";
  }

  // Handle past events
  if (diffInSeconds < -60) {
    return "Ended";
  }

  // Handle current/just ended events
  if (diffInSeconds >= -60 && diffInSeconds <= 0) {
    return "Now";
  }

  // Convert to larger units
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Format based on duration length
  if (years > 0) {
    const remainingMonths = Math.floor((days % 365) / 30);
    return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years}y`;
  }

  if (months > 0) {
    const remainingDays = days % 30;
    return remainingDays > 0 ? `${months}mo ${remainingDays}d` : `${months}mo`;
  }

  if (days > 0) {
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  }

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 && hours < 10
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  }

  if (minutes > 0) {
    const remainingSeconds = diffInSeconds % 60;
    return remainingSeconds > 0 && minutes < 10
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  }

  if (diffInSeconds > 0) {
    return `${diffInSeconds}s`;
  }

  return "Now";
};

/**
 * Checks if the provided market deadline is in the future
 * @param currentTime - Current time as JavaScript Date object
 * @param marketDeadlineUnix - Market deadline as Unix timestamp (in seconds)
 * @returns true if market deadline is in the future, false otherwise
 * @throws {ValidationError} if inputs are invalid
 */
export function isMarketDeadlineValid(
  currentTime: Date,
  marketDeadlineUnix: number
): boolean {
  if (!(currentTime instanceof Date) || isNaN(currentTime.getTime())) {
    throw new Error("Invalid current time provided");
  }

  if (typeof marketDeadlineUnix !== "number" || marketDeadlineUnix <= 0) {
    throw new Error("Invalid market deadline timestamp");
  }

  // Convert Unix timestamp (seconds) to Date object
  const marketDeadline = new Date(marketDeadlineUnix * 1000);

  // Reset milliseconds for precise comparison
  const normalizedCurrentTime = new Date(currentTime);
  normalizedCurrentTime.setMilliseconds(0);

  const normalizedDeadline = new Date(marketDeadline);
  normalizedDeadline.setMilliseconds(0);

  // Convert to Unix timestamp (seconds) for comparison
  const currentUnix = Math.floor(normalizedCurrentTime.getTime() / 1000);
  const deadlineUnix = Math.floor(normalizedDeadline.getTime() / 1000);

  // Market deadline must be at least 1 second in the future
  return deadlineUnix > currentUnix;
}

// Optional: Custom error class for validation errors
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

interface MarketValidationResult {
  isValid: boolean;
  currentDate: Date;
  marketDate: Date;
  error: string | null;
}

/**
 * Validates if a market time is in the future and returns detailed validation info
 * @param currentDate - Current date as JavaScript Date object
 * @param marketTimeUnix - Market time as Unix timestamp (in seconds)
 * @returns MarketValidationResult object with validation details
 */
export function validateMarketTimeWithDetails(
  currentDate: Date,
  marketTimeUnix: number
): MarketValidationResult {
  const marketDate = new Date(marketTimeUnix * 1000);

  return {
    isValid: marketDate >= currentDate,
    currentDate: currentDate,
    marketDate: marketDate,
    error:
      marketDate < currentDate ? "Market time cannot be in the past" : null,
  };
}
