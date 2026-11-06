import Link from 'next/link';

import { BuildingsIcon } from '@phosphor-icons/react/dist/ssr';

import { getExperience } from '@/actions/experience.actions';

const Experience = async () => {
  const experience = await getExperience();

  const formatDate = (value: string | Date) => {
    return new Date(value).toLocaleString('en-GB', { month: 'short', year: 'numeric' });
  };

  return (
    <>
      {experience.map((role, index) => (
        <div
          key={index}
          data-reveal
          className="border border-(--text-muted)/30 bg-(--bg-alt) rounded-2xl grid grid-rows-subgrid row-span-5 gap-4 p-4"
        >
          <span
            aria-hidden="true"
            className="text-5xl font-mono font-medium tracking-tighter text-(--bg) select-none text-shadow-[0_1px_0_var(--text-muted)]"
          >
            {new Date(role.start_date).getFullYear()}
          </span>

          <h3 className="text-lg font-medium line-clamp-2 px-0.5">{role.company}</h3>

          <p className="text-(--text-muted) truncate px-0.5">{role.job_title}</p>

          <span className="text-sm text-(--text-muted) px-0.5">
            {formatDate(role.start_date)} - {role.end_date ? formatDate(role.end_date) : 'Present'}
          </span>

          <div className="flex gap-x-2 gap-y-3 flex-wrap items-start mt-1.5">
            <Link href={role.company_linkedin_url} target="_blank" rel="noopener noreferrer" className="button">
              <BuildingsIcon className="shrink-0" weight="bold" />
              View on LinkedIn
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Experience;
