import { getModulesByResourceId } from '@/actions/module';
import {
  getAllVariantsByProductId,
  getVariantDetailsByUrl,
} from '@/actions/variant';
import {
  IModule,
  IPage,
  IPDPVariant,
  IPDPVariantOptionItem,
  IPDPVariantOptions,
  IPDPVariantResponse,
  IResponse,
} from '@/common/lib/types';
import Container from '@/common/ui/component/Container';
import DynamicModule from '@/common/ui/modules';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';
import ProductOverview from '@/widgets/ProductOverview';

const ProductDetailsPage = handleServerProps(async (ctx) => {
  const awaitedParams = await ctx.params;
  const slugList = awaitedParams.slug as unknown as string[];

  let url =
    slugList.filter(Boolean).join('/') || slugList.filter(Boolean).join('/');

  url = `/products/${url}`;

  const response: IResponse<IPDPVariantResponse> = await getVariantDetailsByUrl(
    url
  );

  if (!response.success) {
    return {
      notFound: true,
    };
  }

  const variant = response.data;
  const product = variant?.productInfo;
  const price = variant?.prices;

  const variants: IResponse<IPage<IPDPVariant>> =
    await getAllVariantsByProductId(product?.id || '');

  const modules: IResponse<IModule> = await getModulesByResourceId(
    variant?.id || ''
  );

  const variantHits: IPage<IPDPVariant> = variants?.data || {
    hits: [],
    totalHitsCount: 0,
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  };

  const variantOptions: IPDPVariantOptionItem[] = variantHits?.hits?.map(
    (hit) => ({
      url: hit.url,
      name: hit.name,
      media: hit.medias?.[0] || {},
      active: hit.active
    })
  );

  const productVariantOptions: IPDPVariantOptions = {
    hasMore: variantHits?.hasNext,
    options: variantOptions,
  };

  return (
    <>
      <Container>
        <ProductOverview
          medias={variant?.medias || []}
          productName={product?.name || ''}
          prices={price}
          variantName={variant?.name}
          productVariantOptions={productVariantOptions}
        />
      </Container>
      {modules.success && (
        <DynamicModule projectData={modules.data?.data || ''} />
      )}
    </>
  );
}, pageTypes.PDP);

export default ProductDetailsPage;
