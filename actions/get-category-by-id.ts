import { Category } from "@/types";
import axios from "axios";

const URL = `${process.env.PUBLIC_API_URL}/categories`;

export const getCategoryById = async (
  categoryId: string
): Promise<Category | null> => {
  try {
    const response = await axios.get(`${URL}/${categoryId}`);
    const {
      data: { category },
    } = response;

    return category;
  } catch (error: any) {
    console.error("getCategories - ", error.message);
    return null;
  }
};
