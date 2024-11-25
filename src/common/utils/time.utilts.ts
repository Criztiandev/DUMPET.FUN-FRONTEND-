// Types and interfaces
export interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface MarketValidationResult {
  isValid: boolean;
  currentDate: Date;
  marketDate: Date;
  error: string | null;
  remainingTime?: string;
}

export enum TimeStatus {
  New = "New",
  Ended = "Ended",
  Now = "Now",
  Advance = "Advance",
  Invalid = "Invalid",
}

// Custom error classes
export class TimeValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeValidationError";
  }
}

// Constants
const TIME_CONSTANTS = {
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  DAYS_IN_MONTH: 30, // Approximate
  DAYS_IN_YEAR: 365,
  PAST_DAYS_THRESHOLD: 30,
  TIMESTAMP_THRESHOLD: 1000000000000, // Used to distinguish between duration and timestamp
} as const;

/**
 * Gets normalized date with time set to start of day
 * @param date Date to normalize
 * @returns Normalized date
 */
function getNormalizedDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Calculate time remaining between two dates
 * @param future Future timestamp in milliseconds
 * @param now Current timestamp in milliseconds
 * @returns TimeRemaining object
 */
function calculateTimeRemaining(future: number, now: number): TimeRemaining {
  const diffInSeconds = Math.floor(
    (future - now) / TIME_CONSTANTS.MILLISECONDS_IN_SECOND
  );

  const years = Math.floor(
    diffInSeconds /
      (TIME_CONSTANTS.SECONDS_IN_MINUTE *
        TIME_CONSTANTS.MINUTES_IN_HOUR *
        TIME_CONSTANTS.HOURS_IN_DAY *
        TIME_CONSTANTS.DAYS_IN_YEAR)
  );
  const months =
    Math.floor(
      diffInSeconds /
        (TIME_CONSTANTS.SECONDS_IN_MINUTE *
          TIME_CONSTANTS.MINUTES_IN_HOUR *
          TIME_CONSTANTS.HOURS_IN_DAY *
          TIME_CONSTANTS.DAYS_IN_MONTH)
    ) % 12;
  const days =
    Math.floor(
      diffInSeconds /
        (TIME_CONSTANTS.SECONDS_IN_MINUTE *
          TIME_CONSTANTS.MINUTES_IN_HOUR *
          TIME_CONSTANTS.HOURS_IN_DAY)
    ) % TIME_CONSTANTS.DAYS_IN_MONTH;
  const hours =
    Math.floor(
      diffInSeconds /
        (TIME_CONSTANTS.SECONDS_IN_MINUTE * TIME_CONSTANTS.MINUTES_IN_HOUR)
    ) % TIME_CONSTANTS.HOURS_IN_DAY;
  const minutes =
    Math.floor(diffInSeconds / TIME_CONSTANTS.SECONDS_IN_MINUTE) %
    TIME_CONSTANTS.SECONDS_IN_MINUTE;
  const seconds = diffInSeconds % TIME_CONSTANTS.SECONDS_IN_MINUTE;

  return { years, months, days, hours, minutes, seconds };
}

/**
 * Gets relative time string from timestamp
 * @param timestamp Timestamp in milliseconds
 * @returns Formatted string representing time status or duration
 */
export function getDaysFromTimestamp(timestamp: number): string {
  try {
    const date = new Date(timestamp);
    const now = new Date();

    if (isNaN(date.getTime())) {
      throw new TimeValidationError("Invalid timestamp provided");
    }

    const normalizedDate = getNormalizedDate(date);
    const normalizedNow = getNormalizedDate(now);

    const diffDays = Math.round(
      (normalizedDate.getTime() - normalizedNow.getTime()) /
        (TIME_CONSTANTS.MILLISECONDS_IN_SECOND *
          TIME_CONSTANTS.SECONDS_IN_MINUTE *
          TIME_CONSTANTS.MINUTES_IN_HOUR *
          TIME_CONSTANTS.HOURS_IN_DAY)
    );

    if (diffDays === 0 || diffDays === -1) return TimeStatus.New;
    if (diffDays < 0) {
      if (Math.abs(diffDays) > TIME_CONSTANTS.PAST_DAYS_THRESHOLD)
        return TimeStatus.Ended;
      return `${Math.abs(diffDays)} days ago`;
    }
    if (diffDays === 1) return TimeStatus.Advance;
    return `${diffDays} days left`;
  } catch (error) {
    console.error("Error in getDaysFromTimestamp:", error);
    return TimeStatus.Invalid;
  }
}

/**
 * Formats duration or timestamp into human-readable string
 * @param duration Duration in milliseconds or timestamp
 * @returns Formatted duration string
 */
export function formatDuration(duration: number): string {
  try {
    const now = Date.now();
    const targetTime =
      duration < TIME_CONSTANTS.TIMESTAMP_THRESHOLD ? now + duration : duration;

    if (isNaN(targetTime) || !isFinite(targetTime)) {
      throw new TimeValidationError("Invalid duration provided");
    }

    const diffInMs = targetTime - now;
    const diffInSeconds = Math.floor(
      diffInMs / TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );

    if (diffInSeconds < -TIME_CONSTANTS.SECONDS_IN_MINUTE)
      return TimeStatus.Ended;
    if (
      diffInSeconds >= -TIME_CONSTANTS.SECONDS_IN_MINUTE &&
      diffInSeconds <= 0
    )
      return TimeStatus.Now;

    const remaining = calculateTimeRemaining(targetTime, now);

    // Format based on largest non-zero unit
    if (remaining.years > 0) {
      return remaining.months > 0
        ? `${remaining.years}y ${remaining.months}m`
        : `${remaining.years}y`;
    }
    if (remaining.months > 0) {
      return remaining.days > 0
        ? `${remaining.months}mo ${remaining.days}d`
        : `${remaining.months}mo`;
    }
    if (remaining.days > 0) {
      return remaining.hours > 0
        ? `${remaining.days}d ${remaining.hours}h`
        : `${remaining.days}d`;
    }
    if (remaining.hours > 0) {
      return remaining.hours < 10 && remaining.minutes > 0
        ? `${remaining.hours}h ${remaining.minutes}m`
        : `${remaining.hours}h`;
    }
    if (remaining.minutes > 0) {
      return remaining.minutes < 10 && remaining.seconds > 0
        ? `${remaining.minutes}m ${remaining.seconds}s`
        : `${remaining.minutes}m`;
    }
    if (remaining.seconds > 0) {
      return `${remaining.seconds}s`;
    }

    return TimeStatus.Now;
  } catch (error) {
    console.error("Error in formatDuration:", error);
    return TimeStatus.Invalid;
  }
}

/**
 * Validates market deadline
 * @param currentTime Current time
 * @param marketDeadlineUnix Market deadline in Unix timestamp (seconds)
 * @returns boolean indicating if market deadline is valid
 */
export function isMarketDeadlineValid(
  currentTime: Date,
  marketDeadlineUnix: number
): boolean {
  try {
    if (!(currentTime instanceof Date) || isNaN(currentTime.getTime())) {
      throw new TimeValidationError("Invalid current time provided");
    }

    if (typeof marketDeadlineUnix !== "number" || marketDeadlineUnix <= 0) {
      throw new TimeValidationError("Invalid market deadline timestamp");
    }

    const marketDeadline = new Date(
      marketDeadlineUnix * TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );

    // Convert to Unix timestamp (seconds) for comparison
    const currentUnix = Math.floor(
      currentTime.getTime() / TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );
    const deadlineUnix = Math.floor(
      marketDeadline.getTime() / TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );

    return deadlineUnix > currentUnix;
  } catch (error) {
    console.error("Error in isMarketDeadlineValid:", error);
    return false;
  }
}

/**
 * Comprehensive market time validation with detailed results
 * @param currentDate Current date
 * @param marketTimeUnix Market time in Unix timestamp (seconds)
 * @returns Detailed validation result
 */
export function validateMarketTimeWithDetails(
  currentDate: Date,
  marketTimeUnix: number
): MarketValidationResult {
  try {
    if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
      throw new TimeValidationError("Invalid current date provided");
    }

    const marketDate = new Date(
      marketTimeUnix * TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );
    const isValid = marketDate >= currentDate;

    return {
      isValid,
      currentDate,
      marketDate,
      error: isValid ? null : "Market time cannot be in the past",
      remainingTime: isValid ? formatDuration(marketDate.getTime()) : undefined,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      isValid: false,
      currentDate: new Date(),
      marketDate: new Date(0),
      error: errorMessage,
    };
  }
}

/**
 * Gets remaining time until market deadline
 * @param marketDeadlineMs Market deadline in milliseconds
 * @returns Object containing detailed time remaining information
 */
export function getMarketTimeRemaining(
  marketDeadlineMs: number
): TimeRemaining | null {
  try {
    if (!marketDeadlineMs || typeof marketDeadlineMs !== "number") {
      throw new TimeValidationError("Invalid market deadline");
    }

    return calculateTimeRemaining(marketDeadlineMs, Date.now());
  } catch (error) {
    console.error("Error in getMarketTimeRemaining:", error);
    return null;
  }
}

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${year} `;
};

export function isMarketConcluded(
  currentTime: Date,
  marketDeadlineUnix: number
): boolean {
  try {
    if (!(currentTime instanceof Date) || isNaN(currentTime.getTime())) {
      throw new TimeValidationError("Invalid current time provided");
    }

    if (typeof marketDeadlineUnix !== "number" || marketDeadlineUnix <= 0) {
      throw new TimeValidationError("Invalid market deadline timestamp");
    }

    const marketDeadline = new Date(
      marketDeadlineUnix * TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );

    // Convert to Unix timestamp (seconds) for comparison
    const currentUnix = Math.floor(
      currentTime.getTime() / TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );
    const deadlineUnix = Math.floor(
      marketDeadline.getTime() / TIME_CONSTANTS.MILLISECONDS_IN_SECOND
    );

    return deadlineUnix <= currentUnix;
  } catch (error) {
    console.error("Error in isMarketConcluded:", error);
    return false;
  }
}
