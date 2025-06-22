'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicModuleView = dynamic(() => import('./DynamicModule'), {
  ssr: false,
});

interface DynamicModuleProps {
  projectData: string;
}
const DynamicModule: FC<DynamicModuleProps> = ({ projectData }) => {
  return <DynamicModuleView projectData={projectData} />;
};

export default DynamicModule;
