import { Role } from './role';

export class User {
  userId: number;
  roleEntities: Role[];
  userDni: number;
  userEmail: string;
  userPassword: string;
  userName: string;
  userLastName: string;
  userPhone: number;
  userAddress: string;
  userBirth: string;
  userState: boolean;
  userRegister: string;
  userNotAccountExpired: boolean;
  userNotAccountBlocked: boolean;
  userCredentialNotExpired: boolean;
}