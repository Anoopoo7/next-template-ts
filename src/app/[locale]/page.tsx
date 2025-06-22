import { PageContext } from '@/common/lib/types';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';

const HomePage = handleServerProps(async ({ translation }: PageContext) => {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h1>{translation.title}</h1>
      <p>{translation.description}</p>
    </section>
  );
}, pageTypes.HOME);

export default HomePage;
