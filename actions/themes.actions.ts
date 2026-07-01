'use server';

import { sql } from '@/lib/db';
import type { Theme } from '@/lib/themes';

export const getThemes = async () => {
  return (await sql.query('SELECT * FROM themes ORDER BY sequence')) as Theme[];
};
