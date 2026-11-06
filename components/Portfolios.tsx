import Link from 'next/link';

import { BrowserIcon } from '@phosphor-icons/react/dist/ssr';

import { getPortfolios } from '@/actions/portfolios.actions';

const Portfolios = async () => {
  const portfolios = await getPortfolios();

  return (
    <>
      {portfolios.reverse().map((portfolio, index) => (
        <div
          key={index}
          data-reveal
          className="border border-(--text-muted)/30 bg-(--bg-alt) rounded-2xl grid grid-rows-subgrid row-span-3 gap-4 p-4"
        >
          <span
            aria-hidden="true"
            className="text-5xl font-mono font-medium tracking-tighter text-(--bg) select-none text-shadow-[0_1px_0_var(--text-muted)]"
          >
            {'v' + (portfolios.length - index).toString().padStart(2, '0')}
          </span>

          <p className="px-0.5">{portfolio.description}</p>

          <div className="flex gap-x-2 gap-y-3 flex-wrap items-start mt-1.5">
            <Link href={portfolio.url} target="_blank" rel="noopener noreferrer" className="button">
              <BrowserIcon className="shrink-0" weight="bold" />
              Visit site
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Portfolios;
