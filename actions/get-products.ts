import { Category, Product } from "@/types";
import axios from "axios";
import qs from "query-string";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
  colorId?: string;
  sizeId?: string;
  categoryId?: string;
  isFeatured?: boolean;
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        colorId: query.colorId ?? "",
        sizeId: query.sizeId ?? "",
        categoryId: query.categoryId ?? "",
        isFeature: query.isFeatured ?? "",
      },
    });
    const response = await axios.get(url);
    const {
      data: { products },
    } = response;

    return products;
  } catch (error: any) {
    console.error("getProducts - ", error.message);
    return [];
  }
};
