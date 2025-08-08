export interface FormData {
  name: string;
  email: string;
  password: string;
  city: string;
  birthDate: string;
  phone: string;
}

export const initialValues: FormData = {
  name: '',
  email: '',
  password: '',
  city: '',
  birthDate: '',
  phone: '',
};
