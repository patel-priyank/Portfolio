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
          className="border-2 border-(--text-muted) bg-(--bg-alt) rounded-2xl grid grid-rows-subgrid row-span-5 gap-4 p-4"
        >
          <span aria-hidden="true" className="text-5xl font-mono tracking-tighter text-(--bg) select-none">
            {new Date(role.start_date).getFullYear()}
          </span>

          <h3 className="text-xl font-semibold line-clamp-2">{role.company}</h3>

          <p className="text-lg text-(--text-muted) truncate">{role.job_title}</p>

          <span className="text-(--text-muted)">
            {formatDate(role.start_date)} - {role.end_date ? formatDate(role.end_date) : 'Present'}
          </span>

          <div className="flex gap-2 flex-wrap items-start mt-1.5">
            <Link
              href={role.company_linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center px-3 py-1.5 border-2 border-(--accent) rounded-lg font-medium select-none bg-(--bg-alt) text-(--accent) pointer-fine:hover:bg-(--accent) pointer-fine:hover:text-(--bg-alt) transition-[background-color,color]"
            >
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
