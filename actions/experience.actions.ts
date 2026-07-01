'use server';

import { sql } from '@/lib/db';

export const getExperience = async () => {
  return await sql.query('SELECT * FROM experiences ORDER BY sequence DESC');
};
