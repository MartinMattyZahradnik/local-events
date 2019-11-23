import { format } from "date-fns";

export const DEFAULT_TIME_FORMAT_PATTERN = "MMMM d, yyyy";

export const timestampToDate = (
  timestamp: number,
  pattern: string = DEFAULT_TIME_FORMAT_PATTERN
) => {
  return format(timestamp, pattern);
};
