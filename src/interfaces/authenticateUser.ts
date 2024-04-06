export interface AuthenticateUser {
  token: string | null;
  setToken: (prevToken: string) => void;
  handleChangeToken: ({ token }: { token: string }) => void;
  logout: () => void;
}
