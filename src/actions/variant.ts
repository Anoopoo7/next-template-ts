'use server';

import { IPDPVariant, IResponse } from '@/common/lib/types';

export const getVariantDetailsByUrl = async (
  variantUrl: string
): Promise<IResponse<IPDPVariant>> => {
  // const cookieStore = await cookies();
  const url = new URL(
    `/api/variants/url?url=${variantUrl}`,
    process.env.NEXT_PUBLIC_API_BASE_URL
  );

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${cookieStore.get('accessToken')?.value}`,
    },
  });

  return response.json().then((data) => {
    //   handleError(data);
    if (data?.success) {
      return {
        success: true,
        data: data.data,
        message: 'variant fetched successfully',
      };
    }
    return {
      success: false,
      message: data?.message || 'Failed to fetch variant',
    };
  });
};
