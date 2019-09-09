export interface IUser {
  id: string;
  name: string;
  firstName: string;
  userName: string;
  email: string;
  phone?: string;
  age?: number;
  gender: "male" | "female";
}

export interface ILoginActionPayload {
  email: string;
  password: string;
}

export interface IPasswordResetActionPayload {
  email: string;
}
