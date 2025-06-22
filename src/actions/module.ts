'use server';

import { IModule, IResponse } from '@/common/lib/types';

export const getModulesByResourceId = async (
  id: string
): Promise<IResponse<IModule>> => {
  const url = new URL(
    `/api/modules/id/${id}`,
    process.env.NEXT_PUBLIC_API_BASE_URL
  );

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
