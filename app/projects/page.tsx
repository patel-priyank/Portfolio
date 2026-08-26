import Breadcrumbs from '@/components/Breadcrumbs';
import Projects from '@/components/Projects';

const ProjectsPage = () => {
  return (
    <main className="max-w-5xl mx-auto p-4 pb-20 flex flex-col gap-4">
      <Breadcrumbs params={{ crumbs: [{ url: '/', label: 'Home' }], current: 'Projects' }} />

      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>

        <p className="text-(--text-muted) line-clamp-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias a amet eveniet asperiores omnis quae
          laudantium voluptates molestias natus tempore officia, quia numquam quod quibusdam deserunt repudiandae nisi
          velit magnam doloremque corrupti illum esse! Deleniti doloremque voluptates, fuga inventore sunt, repudiandae
          quidem necessitatibus quia repellat, nostrum ipsum excepturi cupiditate laborum.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Projects params={{ featured: false }} />
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
