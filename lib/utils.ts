import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalDate() {
   // Use UTC to ensure consistency across environments
   const date = new Date();
  
   // For NHL scores, we want the local time relative to the Eastern Time Zone
   const easternTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
   
   const year = easternTime.getFullYear();
   const month = String(easternTime.getMonth() + 1).padStart(2, '0');
   const day = String(easternTime.getDate()).padStart(2, '0');
 
   return {
     formattedDate: `${year}-${month}-${day}`,
     timezone: 'America/New_York',
     isoString: easternTime.toISOString(),
     timestamp: easternTime.getTime()
   };
}