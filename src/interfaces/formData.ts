export interface InputAttr {
  value: string;
  type: string;
  required: boolean;
}

export interface FormData {
  [name: string]: InputAttr;
}
