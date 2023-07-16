import { Category } from "@/types";
import axios from "axios";

const URL = `${process.env.PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(URL);
    const { data : {categories} } = response;
    
    return categories;
  } catch (error: any) {
    console.error("getCategories - ", error.message);
    return [];
  }
};
