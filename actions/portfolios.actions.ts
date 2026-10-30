import 'server-only';

import { sql } from '@/lib/db';

export const getPortfolios = async () => {
  return await sql.query('SELECT * FROM portfolios ORDER BY sequence');
};
