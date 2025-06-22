import { getModulesByResourceId } from '@/actions/module';
import { getVariantDetailsByUrl } from '@/actions/variant';
import { IModule, IPDPVariant, IResponse } from '@/common/lib/types';
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

  const response: IResponse<IPDPVariant> = await getVariantDetailsByUrl(url);

  if (!response.success) {
    return {
      notFound: true,
    };
  }

  const variant = response.data;
  const product = variant?.productInfo;
  const price = variant?.prices;

  const modules: IResponse<IModule> = await getModulesByResourceId(
    variant?.id || ''
  );

  return (
    <>
      <Container>
        <ProductOverview
          medias={variant?.medias || []}
          productName={product?.name || ''}
          prices={price}
          variantName={variant?.name}
        />
      </Container>
      {modules.success && (
        <DynamicModule projectData={modules.data?.data || ''} />
      )}
    </>
  );
}, pageTypes.PDP);

export default ProductDetailsPage;
