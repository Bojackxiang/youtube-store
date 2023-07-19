// import getProducts from '@/actions/get-products';

import ProductList from "@/components/ui/product-list";
import { getProductById } from "@/actions/get-product-by-id";
import Container from "@/components/helpers/container";
import Gallery from "./components/gallery";
import Info from "./components/Info";
import { getProducts } from "@/actions/get-products";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params;
  const product = await getProductById(params.productId);
  console.log("product: ", product);

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  console.log(suggestedProducts);

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          x
          <hr className="my-10" />
          <ProductList
            title="Related Items"
            items={suggestedProducts.filter((item) => item.id !== productId)} // filter current product
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
