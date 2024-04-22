export interface AuthenticateUser {
  token: string | null;
  setToken: (prevToken: string) => void;
  handleChangeToken: () => void;
  logout: () => void;
}
