import { Category } from "@/types";
import axios from "axios";

const URL = `${process.env.PUBLIC_API_URL}/products`;

export const getProducts = async (param: {isFeatured: boolean}): Promise<Category[]> => {
  try {
    const response = await axios.get(URL);
    const { data : {products} } = response;
    
    return products;
  } catch (error: any) {
    console.error("getProducts - ", error.message);
    return [];
  }
};
