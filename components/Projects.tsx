import Image from 'next/image';
import Link from 'next/link';

import { getProjects } from '@/actions/projects.actions';

import { getPhosphorIcon } from '@/lib/icons';

const Projects = async ({ params }: { params: { featured: boolean } }) => {
  const projects = await getProjects(params.featured);

  return (
    <>
      {projects.map((project, index) => (
        <div key={index} className="bg-(--bg-alt) rounded-lg grid grid-rows-subgrid row-span-4 gap-4 p-4">
          <div className="relative">
            <Image
              src={project.image_url}
              alt=""
              width={512}
              height={512}
              sizes="(min-width: 640px) 456px, 100vw"
              className="w-full object-cover rounded-md aspect-3/2 md:aspect-2/1 select-none"
            />

            {project.under_development && (
              <span className="absolute top-2 right-2 bg-(--bg-alt) text-(--text-muted) text-sm rounded-sm px-2 py-1 pointer-events-none border border-(--text-muted) select-none">
                Under development
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold line-clamp-2">{project.title}</h3>

          <p className="text-(--text-muted) line-clamp-5">{project.description}</p>

          <div className="flex gap-2 flex-wrap items-start">
            {project.links.map((link: { url: string; icon: string; label: string }, index: number) => {
              const Icon = getPhosphorIcon[link.icon];

              return (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center px-3 py-1 border border-(--accent) rounded-md select-none bg-(--bg-alt) text-(--accent) pointer-fine:hover:bg-(--accent) pointer-fine:hover:text-(--bg-alt) transition-[background-color,color]"
                >
                  {Icon && <Icon weight="bold" />}
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
