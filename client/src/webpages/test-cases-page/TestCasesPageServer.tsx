import { Skeleton } from 'antd';
import { Suspense } from 'react';
import TestCasesPageClient from './TestCasesPageClient';

async function TestCasesPageServer() {
  return <TestCasesPageClient />;
}

export default function TestCasesPageServerWithSuspense() {
  return (
    <Suspense fallback={<Skeleton loading active />}>
      <TestCasesPageServer />
    </Suspense>
  );
}
