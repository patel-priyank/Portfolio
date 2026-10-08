import Link from 'next/link';

import { getSocials } from '@/actions/socials.actions';

import { getPhosphorIcon } from '@/lib/icons';

const Socials = async () => {
  const socials = await getSocials();

  return (
    <>
      {socials.map((social, index) => {
        const Icon = getPhosphorIcon[social.icon];

        return (
          <Link
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-(--accent-light) text-(--accent) rounded-2xl select-none flex flex-col gap-3 items-start justify-end p-4 h-40 border border-b-2 border-(--accent) pointer-fine:hover:bg-(--accent-dark) pointer-fine:hover:text-(--bg) active:translate-y-0.5 transition-[background-color,color]"
          >
            <Icon className="text-2xl" />
            {social.label}
          </Link>
        );
      })}
    </>
  );
};

export default Socials;
