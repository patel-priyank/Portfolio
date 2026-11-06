import Link from 'next/link';

import { getContacts } from '@/actions/contacts.actions';

import { getPhosphorIcon } from '@/lib/icons';

const Contacts = async () => {
  const contacts = await getContacts();

  return (
    <>
      {contacts.map((contact, index) => {
        const Icon = getPhosphorIcon[contact.icon];

        return (
          <Link
            key={index}
            data-reveal
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tile h-40"
          >
            <Icon className="text-2xl" />
            {contact.label}
          </Link>
        );
      })}
    </>
  );
};

export default Contacts;
