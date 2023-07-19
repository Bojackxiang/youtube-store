import { Size } from "@/types";
import axios from "axios";

const URL = `${process.env.PUBLIC_API_URL}/sizes`;

export const getSizes = async (
): Promise<Size[] | null> => {
  try {
    const response = await axios.get(`${URL}`);
    const {
      data: { sizes },
    } = response;

    return sizes;
  } catch (error: any) {
    console.error("getBillboards - ", error.message);
    return null;
  }
};
