'use client';
import React from 'react'
import { useParams, useRouter } from 'next/navigation';

interface CategoryProps {}

const Category = ({}: CategoryProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div>Category</div>
  )
}

export default Category