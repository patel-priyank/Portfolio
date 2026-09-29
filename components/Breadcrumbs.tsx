import React from 'react';

import Link from 'next/link';

import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr';

const Breadcrumbs = ({ params }: { params: { crumbs: { url: string; label: string }[]; current: string } }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 font-medium text-(--text-muted)">
      {params.crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <Link href={crumb.url} className="text-(--accent) pointer-fine:hover:underline rounded-xs">
            {crumb.label}
          </Link>

          <CaretRightIcon weight="bold" className="shrink-0" />
        </React.Fragment>
      ))}

      <span>{params.current}</span>
    </div>
  );
};

export default Breadcrumbs;
