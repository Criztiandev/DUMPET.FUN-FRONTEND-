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