export type UserRole = 'USER_RFC' | 'ADMIN';

export interface User {
  username: string;
  password: string;
  name: string;
  state: string;
  role: UserRole;
}
