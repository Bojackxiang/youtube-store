"use client";
import { Category } from "@/types";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
  const {id, name: categoryName} = category;
  return (
    <Link href={`/categories/${id}`}>
      <div className="m-2 flex items-center justify-center h-[100px] p-10 text-white rounded-xl bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-400 bg-size-200 bg-pos-0 text-2xl hover:text-3xl duration-200 overflow-hidden">
        <div className="text-black font-bold text-center">{categoryName}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
