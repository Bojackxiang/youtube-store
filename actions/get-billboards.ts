import { Billboard, Category } from "@/types";
import axios from "axios";

const URL = `${process.env.PUBLIC_API_URL}/billboards`;

export const getBillboard = async (
  param: string
): Promise<Billboard | null> => {
  try {
    const response = await axios.get(`${URL}/${param}`);
    const {
      data: { billboard },
    } = response;

    return billboard;
  } catch (error: any) {
    console.error("getBillboards - ", error.message);
    return null;
  }
};
