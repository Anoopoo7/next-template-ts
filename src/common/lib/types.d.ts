export type { Locale } from '@i18n/config';

export interface RawPageContext {
  params: Promise<{
    locale: Locale;
    slug?: string;
    id?: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string;
  }>;
}

export interface PageContext extends RawPageContext {
  translation: Record<string, string>;
}

export type Locale = 'en-ae' | 'ar-ae';

export type Language = 'en' | 'ar';

export interface IResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface IPage<T> {
  hits: T[];
  totalHitsCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface IImageItem {
  type: string;
  defaultSrc: string;
  lg: string | null;
  md: string | null;
  sm: string | null;
  alt: string | null;
}

export interface IAttributeItem {
  type: string;
  options: string[] | null;
  value: string;
}
export interface IAttribute {
  [key: string]: IAttributeItem;
}

export interface IProduct {
  id: string;
  name: string;
  skuId: string;
  categoryName: string | null;
  categoryId: string;
  brandName: string | null;
  brandId: string | null;
  productTypeId: string;
  publishedChannels: string[];
  attributes: IAttribute;
  active: true;
}

export interface IPrice {
  salesPrice: number;
  discountName: number | null;
  discountedPrice: number;
  discountPercentage: number;
  discountFlatPrice: number;
  taxPrice: number;
  finalPrice: number;
}

export interface IProductType {
  id: string;
  name: string;
  slug: string;
  productAttributes: IAttribute;
  variantAttributes: IAttribute;
  active: boolean;
}

export interface IPDPVariant {
  id: string;
  name: string;
  slug: string;
  productId: string;
  skuId: string;
  productTypeId: string;
  url: string;
  seoTitle: string;
  seoDescription: string;
  medias: IImageItem[];
  attributes: IAttribute;
  active: boolean;
}

export interface IPDPVariantResponse extends IPDPVariant {
  productInfo: IProduct;
  prices: IPrice;
  productType: IProductType;
}

export interface IModule {
  resourceId: string;
  data: string;
}

export interface IPDPVariantOptionItem {
  url: string;
  name: string;
  media: IImageItem;
  active: boolean;
}

export interface IPDPVariantOptions {
  hasMore: boolean;
  options: IPDPVariantOptionItem[];
}
