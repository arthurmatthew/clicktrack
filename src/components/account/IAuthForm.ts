export interface IAuthForm {
  email: string;
  setEmail: (value: React.SetStateAction<string>) => void;
  password: string;
  setPassword: (value: React.SetStateAction<string>) => void;
  handleSubmit?: (e: React.MouseEvent) => Promise<void>;
  loading: boolean;
}
