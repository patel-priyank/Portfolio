'use server';

import { sql } from '@/lib/db';

export const getSkillCategories = async () => {
  return await sql.query(`
    SELECT
      skill_categories.icon,
      skill_categories.title,
      COALESCE(
        json_agg(skills.name ORDER BY skills.sequence) FILTER (WHERE skills.id IS NOT NULL),
        '[]'
      ) AS skills
    FROM skill_categories
    LEFT JOIN skills ON skills.skill_category_id = skill_categories.id
    GROUP BY skill_categories.id, skill_categories.icon, skill_categories.title
    ORDER BY skill_categories.sequence
  `);
};
