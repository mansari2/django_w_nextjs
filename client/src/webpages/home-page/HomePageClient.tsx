'use client';

import PageHeaderClient from '../shared/components/page-header/PageHeaderClient';
import PageSubHeaderClient from '../shared/components/page-sub-header/PageSubHeaderClient';

interface IHomePageClientProps {}

export default function HomePageClient(_props: IHomePageClientProps) {
  return (
    <main>
      <section>
        <PageHeaderClient hasDivider title='Home' />
      </section>
      <section>
        <PageSubHeaderClient title='Hello, Azeem!' />
        <p>Welcome to the Doc Analysis app.</p>
        <p>Let&rsquo;s build something new! &#128640;</p>
      </section>
    </main>
  );
}
