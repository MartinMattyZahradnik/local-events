export const getAppBaseUrl = (): string => {
  return process.env.APPLICATION_BASE_URL || "http://localhost:3000";
};
