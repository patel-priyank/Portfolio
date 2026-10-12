import { ReadCvLogoIcon } from '@phosphor-icons/react/dist/ssr';

import Breadcrumbs from '@/components/Breadcrumbs';
import Projects from '@/components/Projects';

const ProjectsPage = () => {
  return (
    <main className="max-w-5xl mx-auto p-4 pb-20 flex flex-col gap-4">
      <Breadcrumbs params={{ crumbs: [{ url: '/', label: 'Home' }], current: 'Projects' }} />

      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>

        <div className="border border-b-2 border-(--text-muted) bg-(--bg-alt) rounded-2xl p-4 text-(--text-muted) flex flex-col gap-3">
          <ReadCvLogoIcon className="text-2xl shrink-0" />

          <p className="px-0.5">
            A collection of everything I’ve built over the years, in one place. Some are big, some are tiny, some are
            actually useful, and some exist only because I thought they’d be fun to build. A handful scratch an itch so
            niche that maybe three people on earth have it, myself included. You’ll find polished projects next to
            half-finished experiments and weekend hacks that got out of hand, but each one taught me something. Feel
            free to poke around, open the source, or reach out and ask about it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Projects params={{ featured: false }} />
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
