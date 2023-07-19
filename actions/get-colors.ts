import { Color, Size } from "@/types";
import axios from "axios";

const URL = `${process.env.PUBLIC_API_URL}/colors`;

export const getColors = async (
): Promise<Color[] | null> => {
  try {
    const response = await axios.get(`${URL}`);
    const {
      data: { colors },
    } = response;

    return colors;
  } catch (error: any) {
    console.error("getBillboards - ", error.message);
    return null;
  }
};
