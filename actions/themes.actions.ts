'use server';

import { sql } from '@/lib/db';
import type { Theme } from '@/lib/themes';

export const getThemes = async () => {
  return (await sql.query('SELECT * FROM themes WHERE is_archived = false ORDER BY sequence')) as Theme[];
};
