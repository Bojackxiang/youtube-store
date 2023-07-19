import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategories } from "@/actions/get-categories";
import Container from "@/components/helpers/container";
import CategoryCard from "./components/category-card";

interface CategoryProps {}

const CategoriesPage = async ({}: CategoryProps) => {
  const categories = await getCategories();

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 gap-y-4 mt-8 min-h-full">
          {categories.map((category) => (
            <CategoryCard category={category} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default CategoriesPage;
