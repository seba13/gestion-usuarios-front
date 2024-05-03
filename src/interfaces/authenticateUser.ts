export interface AuthenticateUser {
  token: string | null;
  usuario: string | null;
  rutEmisor: string | null;
  idEmisor: string | null;
  setToken: (prevToken: string) => void;
  handleChangeToken: () => void;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}
