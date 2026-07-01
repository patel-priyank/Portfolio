import Image from 'next/image';

import Contacts from '@/components/Contacts';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import SectionBtn from '@/components/SectionBtn';
import Skills from '@/components/Skills';
import Socials from '@/components/Socials';
import ThatsAllFolksBtn from '@/components/ThatsAllFolksBtn';
import ThemeDialog from '@/components/ThemeDialog';

const Home = () => {
  return (
    <>
      <noscript className="fixed inset-0 p-4 grid place-items-center bg-[#1a1a1a] text-[#fafafa] text-center text-balance z-1300">
        Enable JavaScript to view this site.
      </noscript>

      <Loader />

      <Navbar />

      <main className="max-w-5xl mx-auto p-4 pb-20 flex flex-col gap-20">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <Image
            src="/profile.jpg"
            alt="profile photo"
            width={512}
            height={512}
            preload
            sizes="320px"
            className="w-full mx-auto object-cover max-w-xs sm:h-80 rounded-xl aspect-square sm:aspect-auto select-none"
          />

          <div className="sm:col-span-2 flex flex-col gap-4 items-center sm:items-start">
            <h1 className="text-2xl font-bold">Priyank Patel</h1>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 place-items-center">
              <Hero />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex gap-4 items-center">
            <span>I’ve built some things</span>
            <div className="grow border-b border-dashed border-(--text-muted)"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Projects />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex gap-4 items-center">
            <span>Where I’ve worked</span>
            <div className="grow border-b border-dashed border-(--text-muted)"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Experience />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex gap-4 items-center">
            <span>I know a thing or two</span>
            <div className="grow border-b border-dashed border-(--text-muted)"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <Skills />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex gap-4 items-center">
            <span>More of what I do</span>
            <div className="grow border-b border-dashed border-(--text-muted)"></div>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Socials />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex gap-4 items-center">
            <span>Reach out to me</span>
            <div className="grow border-b border-dashed border-(--text-muted)"></div>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Contacts />
          </div>
        </section>

        <section className="flex justify-center">
          <ThatsAllFolksBtn />
        </section>
      </main>

      <ThemeDialog />

      <SectionBtn />
    </>
  );
};

export default Home;
