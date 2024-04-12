export interface Result {
  code: number;
  status: string;
  message?: string | object | string[] | object[];
}

export interface FetchData {
  data: Result | null;
  loading: boolean;
  error: string | null;
}
