export type UserRole = "paciente" | "profesional";

type MockUser = {
  username: string;
  password: string;
  role: UserRole;
  redirectTo: string;
};

