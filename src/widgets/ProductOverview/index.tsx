'use client';

import { IImageItem, IPDPVariantOptions, IPrice } from '@/common/lib/types';
import ProductOverviewComponent from './view';
import { useState } from 'react';

interface ProductOverviewProps {
  medias: IImageItem[];
  productName: string;
  prices?: IPrice;
  variantName?: string;
  productVariantOptions?: IPDPVariantOptions;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({
  medias,
  productName,
  prices,
  variantName,
  productVariantOptions,
}) => {
  const [gallery, setGallery] = useState<IImageItem | null>(medias?.[0]);

  return (
    <ProductOverviewComponent
      gallery={gallery}
      medias={medias}
      productName={productName}
      prices={prices}
      variantName={variantName}
      productVariantOptions={productVariantOptions}
      setGallery={setGallery}
    />
  );
};

export default ProductOverview;
