import Link from 'next/link';

import { DetectiveIcon } from '@phosphor-icons/react/dist/ssr';

const NotFoundPage = () => {
  return (
    <main className="max-w-5xl mx-auto p-4 pb-20 flex flex-col gap-6 items-center">
      <DetectiveIcon className="text-7xl text-(--text-muted)" />

      <h1 className="text-2xl font-bold">Out exploring, are we?</h1>

      <p className="text-(--text-muted) text-center text-balance">
        It’s okay, we all get a bit curious. But there’s nothing to be found here, trust me.
      </p>

      <p className="text-sm text-(--text-muted) text-center text-balance">This is a portfolio, not a treasure hunt.</p>

      <Link href="/" className="button mt-2">
        Go Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
