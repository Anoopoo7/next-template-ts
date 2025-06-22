import Container from '@/common/ui/component/Container';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';
import ProductOverview from '@/widgets/ProductOverview';

const ProductDetailsPage = handleServerProps(async () => {
  return (
    <Container>
      <ProductOverview />
    </Container>
  );
}, pageTypes.PDP);

export default ProductDetailsPage;
