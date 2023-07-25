import { Color, Size } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user-auth/register`;

interface UserRegisterProps {
  email: string;
  password: string;
  phone: string;
}

interface Response {
  message: string;
  success: boolean;
  payload: any;
}

export const userRegisterRequest = async (
  params: UserRegisterProps
): Promise<Response | null> => {
  try {
    const response = await axios.post(`${URL}`, {
      storeToken:
        "eyJhbGciOiJIUzI1NiJ9.M2NlZTVhYTAtMzVmNC00MWYwLWFlY2UtYzNlMDYzYmZjNDUz.3cONYB9ruDV-F_86sJoex6FidyCYs909TrEtmGsZv1c",
      email: params.email,
      password: params.password,
      phone: params.phone,
    });
    const { data } = response;

    return data;
  } catch (error: any) {
    console.error("user register error - ", error.message);
    return null;
  }
};
