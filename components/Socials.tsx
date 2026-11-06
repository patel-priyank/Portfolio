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
            data-reveal
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tile h-40"
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
