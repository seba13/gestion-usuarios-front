export interface InputAttr {
  value: string ;
  type: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  patter?: RegExp;
  name?: string;
  see?: boolean;
}

export interface FormData {
  [name: string]: InputAttr;
}
