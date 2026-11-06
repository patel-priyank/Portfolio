import Image from 'next/image';
import Link from 'next/link';

import { getProjects } from '@/actions/projects.actions';

import { getPhosphorIcon } from '@/lib/icons';

const Projects = async ({ params }: { params: { featured: boolean } }) => {
  const projects = await getProjects(params.featured);

  return (
    <>
      {projects.map((project, index) => (
        <div
          key={index}
          data-reveal
          className="border border-(--text-muted)/30 bg-(--bg-alt) rounded-2xl grid grid-rows-subgrid row-span-4 gap-4 p-4"
        >
          <div className="relative">
            <Image
              src={project.image_url}
              alt=""
              width={512}
              height={512}
              sizes="(min-width: 640px) 456px, 100vw"
              className="w-full object-cover rounded-lg select-none"
            />

            {project.under_development && (
              <span className="absolute top-3.5 right-3.5 bg-(--bg-alt) text-(--text-muted) text-sm rounded-md px-3 py-1 pointer-events-none border border-(--text-muted) select-none">
                Under development
              </span>
            )}
          </div>

          <h3 className="text-lg font-medium line-clamp-2 px-0.5">{project.title}</h3>

          <p className="text-(--text-muted) line-clamp-5 px-0.5">{project.description}</p>

          <div className="flex gap-x-2 gap-y-3 flex-wrap items-start mt-1.5">
            {project.links.map((link: { url: string; icon: string; label: string }, index: number) => {
              const Icon = getPhosphorIcon[link.icon];

              return (
                <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="button">
                  {Icon && <Icon className="shrink-0" weight="bold" />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default Projects;
