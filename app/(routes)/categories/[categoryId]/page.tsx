import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getProducts } from "@/actions/get-products";
import { getColors } from "@/actions/get-colors";
import { getSizes } from "@/actions/get-sizes";
import Container from "@/components/helpers/container";
import Billboard from "@/components/ui/billboard";
import { getCategoryById } from "@/actions/get-category-by-id";
import Filter from "@/components/ui/filter";
import MobileFilters from "@/components/ui/mobile-filter";

interface CategoryProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage = async ({ params, searchParams }: CategoryProps) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const colors = await getColors();
  const sizes = await getSizes();
  const category = await getCategoryById(params.categoryId);

  console.log(sizes);

  return (
    <div className="bg-white">
      <Container>
        {category && <Billboard data={category.billboard} />}

        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />

              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {/* {products.length === 0 && <NoResults />} */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
