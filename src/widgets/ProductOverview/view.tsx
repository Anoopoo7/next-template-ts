'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import {
  IImageItem,
  IPDPVariantOptionItem,
  IPDPVariantOptions,
  IPrice,
} from '@/common/lib/types';
import Link from 'next/link';

const product = {
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
};
const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProductOverviewProps {
  medias: IImageItem[];
  productName: string;
  gallery: IImageItem | null;
  prices?: IPrice;
  variantName?: string;
  productVariantOptions?: IPDPVariantOptions;
  setGallery: Dispatch<SetStateAction<IImageItem | null>>;
}

const ProductOverviewComponent: FC<ProductOverviewProps> = ({
  gallery,
  medias,
  productName,
  prices,
  variantName,
  productVariantOptions,
  setGallery,
}) => {
  return (
    <div className='bg-white'>
      <div className='pt-6'>
        <nav aria-label='Breadcrumb'>
          <ol
            role='list'
            className='mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8'
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className='flex items-center'>
                  <a
                    href={breadcrumb.href}
                    className='mr-2 text-sm font-medium text-gray-900'
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill='currentColor'
                    width={16}
                    height={20}
                    viewBox='0 0 16 20'
                    aria-hidden='true'
                    className='h-5 w-4 text-gray-300'
                  >
                    <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                  </svg>
                </div>
              </li>
            ))}
            {/* <li className='text-sm'>
              <a
                href={product.href}
                aria-current='page'
                className='font-medium text-gray-500 hover:text-gray-600'
              >
                {product.name} {variantName}
              </a>
            </li> */}
          </ol>
        </nav>

        {/* Product info */}
        <div className='mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24'>
          {/* Options */}
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <div>
              {/* Image gallery */}
              {gallery && (
                <>
                  {/* Mobile image */}
                  <div className='relative aspect-[1/1] overflow-hidden rounded-lg block md:hidden'>
                    <Image
                      src={gallery.sm || gallery?.defaultSrc}
                      alt={gallery?.alt || ''}
                      fill
                      className='object-cover object-center rounded-lg'
                      sizes='100vw'
                      priority
                    />
                  </div>

                  {/* Tablet image */}
                  <div className='relative aspect-[1/1] overflow-hidden rounded-lg hidden md:block lg:hidden'>
                    <Image
                      src={gallery.md || gallery?.defaultSrc}
                      alt={gallery?.alt || ''}
                      fill
                      className='object-cover object-center rounded-lg'
                      sizes='100vw'
                    />
                  </div>

                  {/* Desktop image */}
                  <div className='relative aspect-[1/1] overflow-hidden rounded-lg hidden lg:block'>
                    <Image
                      src={gallery.lg || gallery?.defaultSrc}
                      alt={gallery?.alt || ''}
                      fill
                      className='object-cover object-center rounded-lg'
                      sizes='50vw'
                    />
                  </div>
                </>
              )}

              <div className='mt-4 grid grid-cols-4 gap-4'>
                {Array.isArray(medias) &&
                  medias?.map((image, index) => (
                    <div
                      key={index}
                      className='relative aspect-[1/1] overflow-hidden rounded-lg cursor-pointer'
                      onClick={() => setGallery(image)}
                    >
                      <Image
                        src={image.defaultSrc}
                        alt={image.alt || ''}
                        fill
                        className='object-cover object-center rounded-lg'
                        sizes='(max-width: 768px) 100vw, 25vw'
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className='mt-4 lg:row-span-3 lg:mt-0'>
            {/* start */}

            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 my-6'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {productName} {variantName}
              </h1>
            </div>

            <h2 className='sr-only'>Product information</h2>
            <p className='text-3xl tracking-tight text-gray-900'>
              {prices?.salesPrice === prices?.finalPrice ? (
                `$ ${prices?.finalPrice}.00`
              ) : (
                <>
                  <span className='text-3xl tracking-tight font-bold text-green-900'>{`$ ${prices?.finalPrice}.00`}</span>
                  <small className='text-xl text-gray-400 line-through mx-3'>{`$ ${prices?.salesPrice}.00`}</small>{' '}
                </>
              )}
            </p>

            {/* Reviews */}
            <div className='mt-6'>
              <h3 className='sr-only'>Reviews</h3>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden='true'
                      className={classNames(
                        reviews.average > rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'size-5 shrink-0'
                      )}
                    />
                  ))}
                </div>
                <p className='sr-only'>{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className='mt-10'>
              {/* Colors */}

              {/* Sizes */}
              <div className='my-10'>
                <fieldset aria-label='Choose a size' className='mt-4'>
                  <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
                    {Array.isArray(productVariantOptions?.options) &&
                      productVariantOptions.options.map(
                        (option: IPDPVariantOptionItem) => (
                          <Link key={option.name} href={option.url}>
                            <div className='relative w-16 h-16 mb-2'>
                              <Image
                                src={option.media.defaultSrc}
                                alt={option.media.alt || ''}
                                fill
                                className='object-cover rounded-md'
                                sizes='(max-width: 768px) 25vw, 64px'
                              />
                            </div>
                          </Link>
                        )
                      )}
                  </div>
                </fieldset>
              </div>

              <button
                type='submit'
                className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden'
              >
                Add to bag
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewComponent;
