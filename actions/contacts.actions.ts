'use server';

import { sql } from '@/lib/db';

export const getContacts = async () => {
  return await sql.query('SELECT * FROM contacts ORDER BY sequence');
};
