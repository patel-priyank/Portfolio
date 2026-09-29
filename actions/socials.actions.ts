'use server';

import { sql } from '@/lib/db';

export const getSocials = async () => {
  return await sql.query('SELECT * FROM socials WHERE is_archived = false ORDER BY sequence');
};
