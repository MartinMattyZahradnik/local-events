type AvailableUserRoles = "admin" | "user" | "visitor";
type Gender = "male" | "female" | "other";

export interface IUser {
  id: string;
  name: string;
  firstName: string;
  userName: string;
  email: string;
  phone?: string;
  birthDate: Date;
  userRole: AvailableUserRoles;
  gender?: Gender;
  image?: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

export interface ILoginActionPayload {
  email: string;
  password: string;
}

export interface IPasswordResetActionPayload {
  email: string;
}

export interface IRegisterUserActionPayload {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone?: string;
  birthDate: Date;
  password: string;
  gender?: Gender;
  // image?: File | string;
  image?: any;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
}
