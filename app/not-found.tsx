import Link from 'next/link';

import { DetectiveIcon } from '@phosphor-icons/react/dist/ssr';

const NotFound = () => {
  return (
    <main className="max-w-5xl mx-auto p-4 pb-20 flex flex-col gap-6 items-center">
      <DetectiveIcon className="text-7xl text-(--text-muted)" />

      <h1 className="text-2xl font-bold">Out exploring, are we?</h1>

      <p className="text-(--text-muted) text-center text-balance">
        It’s okay, we all get a bit curious. But there’s nothing to be found here, trust me.
      </p>

      <p className="text-sm text-(--text-muted) text-center text-balance">This is a portfolio, not a treasure hunt.</p>

      <Link
        href="/"
        className="mt-2 flex gap-2 items-center px-3 py-1.5 border border-b-2 border-(--accent) rounded-lg select-none bg-(--accent-light) text-(--accent) pointer-fine:hover:bg-(--accent-dark) pointer-fine:hover:text-(--bg) active:translate-y-0.5 transition-[background-color,color]"
      >
        Go Home
      </Link>
    </main>
  );
};

export default NotFound;
