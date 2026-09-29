'use server';

import { sql } from '@/lib/db';

export const getExperience = async () => {
  return await sql.query('SELECT * FROM experiences WHERE is_archived = false ORDER BY sequence DESC');
};
