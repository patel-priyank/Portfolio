'use server';

import { sql } from '@/lib/db';

export const getSocials = async () => {
  return await sql.query('SELECT * FROM socials ORDER BY sequence');
};
