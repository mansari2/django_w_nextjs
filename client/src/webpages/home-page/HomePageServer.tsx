import HomePageClient from '@/webpages/home-page/HomePageClient';
import { Skeleton } from 'antd';
import { Suspense } from 'react';

async function HomePageServer() {
  return <HomePageClient />;
}

export default function HomePageServerWithSuspense() {
  return (
    <Suspense fallback={<Skeleton loading active />}>
      <HomePageServer />
    </Suspense>
  );
}
