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

export const formatEventTime = (timestamp: number): string => {
  const now = Date.now();

  // If timestamp is a small number, assume it's a duration in milliseconds
  // rather than a full Unix timestamp
  const targetTime = timestamp < 1000000000000 ? now + timestamp : timestamp;

  const diffInSeconds = Math.floor((targetTime - now) / 1000);

  // Check for invalid timestamp
  if (isNaN(diffInSeconds) || !isFinite(diffInSeconds)) {
    return "Invalid time";
  }

  // Event is in the past
  if (diffInSeconds < -30) {
    return "Event has ended";
  }

  // Just ended or about to end
  if (diffInSeconds >= -30 && diffInSeconds < 0) {
    return "Ending now";
  }

  // Just starting
  if (diffInSeconds >= 0 && diffInSeconds < 30) {
    return "Starting now";
  }

  // Convert to larger units
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Future event formatting
  if (diffInYears > 0) {
    return `Starts in ${diffInYears} year${diffInYears === 1 ? "" : "s"}`;
  } else if (diffInMonths > 0) {
    return `Starts in ${diffInMonths} month${diffInMonths === 1 ? "" : "s"}`;
  } else if (diffInDays > 0) {
    return `Starts in ${diffInDays} day${diffInDays === 1 ? "" : "s"}`;
  } else if (diffInHours > 0) {
    return `Starts in ${diffInHours} hour${diffInHours === 1 ? "" : "s"}`;
  } else if (diffInMinutes > 0) {
    return `Starts in ${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"}`;
  } else {
    return `Starts in ${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"}`;
  }
};

export const formatDuration = (timestamp: number): string => {
  const now = Date.now();

  // If timestamp is a small number, assume it's a duration in milliseconds
  // rather than a full Unix timestamp
  const targetTime = timestamp < 1000000000000 ? now + timestamp : timestamp;
  const diffInSeconds = Math.floor((targetTime - now) / 1000);

  // Check for invalid timestamp
  if (isNaN(diffInSeconds) || !isFinite(diffInSeconds)) {
    return "Invalid";
  }

  // Event has ended
  if (diffInSeconds < 0) {
    return "Ended";
  }

  // Convert to larger units
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Format based on duration length
  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    const remainingMinutes = minutes % 60;
    // Only show minutes if less than 10 hours
    if (hours < 10 && remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else if (diffInSeconds >= 0) {
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
