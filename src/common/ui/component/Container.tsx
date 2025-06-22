import { FC } from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {children}
    </section>
  );
};

export default Container;
