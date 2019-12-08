export const getAppBaseUrl = (): string => {
  return process.env.APPLICATION_BASE_URL || "http://localhost:3000";
};

export const makeDBConnectionString = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-dgbbx.mongodb.net/${process.env.DB_NAME}?retryWrites=true`;
    case "development":
      return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-dgbbx.mongodb.net/${process.env.DB_NAME}?retryWrites=true`;
    case "testing":
      return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-dgbbx.mongodb.net/${process.env.DB_NAME_TESTING}?retryWrites=true`;
    default:
      return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-dgbbx.mongodb.net/${process.env.DB_NAME_TESTING}?retryWrites=true`;
  }
};
