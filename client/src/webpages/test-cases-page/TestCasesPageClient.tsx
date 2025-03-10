'use client';

import PageHeaderClient from '../shared/components/page-header/PageHeaderClient';
import PageSubHeaderClient from '../shared/components/page-sub-header/PageSubHeaderClient';
import TestCasesListClient from './test-cases-list/TestCasesListClient';

interface ITestCasesPageClientProps {}

export default function TestCasesPageClient(props: ITestCasesPageClientProps) {
  return (
    <div>
      <section>
        <PageHeaderClient hasDivider title='Test cases' />
      </section>
      <section>
        <PageSubHeaderClient title='Preflight check!' />
      </section>
      <section>
        <TestCasesListClient />
      </section>
    </div>
  );
}
