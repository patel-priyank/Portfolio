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
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-(--accent-light) text-(--accent) rounded-2xl select-none flex flex-col gap-3 items-start justify-end p-4 h-40 border border-b-2 border-(--accent) pointer-fine:hover:bg-(--accent-dark) pointer-fine:hover:text-(--bg) active:translate-y-0.5 transition-[background-color,color]"
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
