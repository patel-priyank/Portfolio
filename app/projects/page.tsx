import Breadcrumbs from '@/components/Breadcrumbs';
import Projects from '@/components/Projects';

const ProjectsPage = () => {
  return (
    <main className="max-w-5xl mx-auto p-4 pb-20 flex flex-col gap-4">
      <Breadcrumbs params={{ crumbs: [{ url: '/', label: 'Home' }], current: 'Projects' }} />

      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>

        <p className="text-(--text-muted)">
          A collection of everything I’ve built over the years, in one place. Some are big, some are tiny, some are
          actually useful, and some exist only because I thought they’d be fun to build. A handful scratch an itch so
          niche that maybe three people on earth have it, myself included. You’ll find polished projects next to
          half-finished experiments and weekend hacks that got out of hand, but each one taught me something. Feel free
          to poke around, open the source, or reach out and ask about it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <Projects params={{ featured: false }} />
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
