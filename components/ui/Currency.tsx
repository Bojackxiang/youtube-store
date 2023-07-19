"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // 这边是为了解决服务端渲染的问题
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="font-semibold">
      {formatter.format(Number(value))}
    </div>
  );
}

export default Currency;