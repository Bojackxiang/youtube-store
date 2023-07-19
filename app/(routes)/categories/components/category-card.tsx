"use client";
import React from "react";

interface CategoryCardProps {
  categoryName: string;
}

const CategoryCard = ({ categoryName }: CategoryCardProps) => {
  return (
    <div className="m-2 p-10 text-white rounded-xl bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-400 bg-size-200 bg-pos-0 ">
      <div className="text-black font-bold text-3xl text-center">
        {categoryName}
      </div>
      
    </div>
  );
};

export default CategoryCard;
