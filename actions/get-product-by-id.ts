import { Product } from "@/types";
import axios from "axios";

const FUNCTION_ERROR_NAME = "[getProductById_ERROR]";

const URL = process.env.PUBLIC_API_URL;

export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const response = await axios.get(`${URL}/products/${productId}`);
    const { data: {product} } = response;
    return product;
  } catch (error: any) {
    console.error(FUNCTION_ERROR_NAME, error.message);

    return null;
  }
};
