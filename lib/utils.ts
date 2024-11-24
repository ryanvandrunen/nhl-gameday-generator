import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalDate() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };

  return {
    formattedDate: new Intl.DateTimeFormat('en-US', options).format(date),
    timezone: timezone,
    isoString: date.toISOString(),
    timestamp: date.getTime()
  };
}
