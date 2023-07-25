import { Color, Size } from "@/types";
import axios from "axios";

const URL = `${process.env.PUBLIC_API_URL}/auth/register`;

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
      storeToken: "",
      email: params.email,
      password: params.password,
    });

    const {
      data: { message, success, payload },
    } = response;

    if(!success){
      throw new Error(message);
    }

    return payload;
  } catch (error: any) {
    console.error("getBillboards - ", error.message);
    return null;
  }
};
