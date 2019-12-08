type tokenType = "user" | "admin";

export const getToken = (tokenType: tokenType): string => {
  switch (tokenType) {
    case "user":
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBva3VzdGVrQHBva3VzdGVrLmNvbSIsIl9pZCI6IjVkZTI4NDhjN2E1OGRmY2JhMTlhYzMyZSIsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTU3NTM5MTY4OCwiZXhwIjoxNTc1Mzk1Mjg4fQ.LKputt-rsP2a_79j-LsBVFZDEf1-v3LJ9Bb4NuOcNss";
      return;
    case "admin":
      return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphaHJhZG5pay5hZG1pbkBnbWFpbC5jb20iLCJfaWQiOiI1ZDcwMGRmN2RkNzc2ZDBhOWQwYzBlMTciLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNTc1MzkxNTk0LCJleHAiOjE1NzUzOTUxOTR9.AZMA4aHv5_fD2gXHebqc9RVgEHJ_YB9Q4A4T8_EqplI";
    default:
      return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphaHJhZG5pay5hZG1pbkBnbWFpbC5jb20iLCJfaWQiOiI1ZDcwMGRmN2RkNzc2ZDBhOWQwYzBlMTciLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNTc1MzkxNTk0LCJleHAiOjE1NzUzOTUxOTR9.AZMA4aHv5_fD2gXHebqc9RVgEHJ_YB9Q4A4T8_EqplI";
  }
};
