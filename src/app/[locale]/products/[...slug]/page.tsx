import { getVariantDetailsByUrl } from '@/actions/variant';
import { IPDPVariant, IResponse } from '@/common/lib/types';
import Container from '@/common/ui/component/Container';
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

  return (
    <Container>
      <ProductOverview
        medias={variant?.medias || []}
        productName={product?.name || ''}
        prices={price}
        variantName={variant?.name}
      />
    </Container>
  );
}, pageTypes.PDP);

export default ProductDetailsPage;
