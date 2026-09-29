'use server';

import { sql } from '@/lib/db';

export const getProjects = async (featured: boolean) => {
  return await sql.query(`
    SELECT
      projects.title,
      projects.description,
      projects.image_url,
      projects.under_development,
      COALESCE(
        json_agg(
          json_build_object('url', project_links.url, 'icon', project_links.icon, 'label', project_links.label)
          ORDER BY project_links.sequence
        ) FILTER (WHERE project_links.id IS NOT NULL AND project_links.is_archived = false),
        '[]'
      ) AS links
    FROM projects
    LEFT JOIN project_links ON project_links.project_id = projects.id
    WHERE projects.is_archived = false
    ${featured ? 'AND projects.is_featured' : ''}
    GROUP BY projects.id, projects.title, projects.description, projects.image_url, projects.under_development
    ORDER BY projects.sequence
  `);
};
