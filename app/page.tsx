import Image from 'next/image';
import Link from 'next/link';

import { PencilRulerIcon, PenNibIcon } from '@phosphor-icons/react/dist/ssr';

import Contacts from '@/components/Contacts';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Portfolios from '@/components/Portfolios';
import Projects from '@/components/Projects';
import SectionBtn from '@/components/SectionBtn';
import Skills from '@/components/Skills';
import Socials from '@/components/Socials';
import ThatsAllFolksBtn from '@/components/ThatsAllFolksBtn';

const HomePage = () => {
  return (
    <>
      <main className="max-w-5xl mx-auto p-4 pb-20 flex flex-col gap-20">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <Image
            data-reveal
            src="/profile.jpg"
            alt="profile photo"
            width={512}
            height={512}
            preload
            sizes="320px"
            className="w-full mx-auto object-cover max-w-xs sm:h-80 rounded-3xl aspect-square sm:aspect-auto select-none"
          />

          <div className="sm:col-span-2 flex flex-col gap-4 items-center sm:items-start">
            <h1 data-reveal className="text-2xl font-bold">
              Priyank Patel
            </h1>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 place-items-center">
              <Hero />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 data-reveal className="text-xl font-semibold text-center text-balance">
            I’ve built some things
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Projects params={{ featured: true }} />
          </div>
          <Link
            data-reveal
            href="/projects"
            className="sm:col-span-2 bg-(--accent-light) text-(--accent) rounded-2xl select-none flex flex-col gap-3 items-start justify-end p-4 h-30 border border-b-2 border-(--accent) hover:bg-(--accent-dark) hover:text-(--bg) active:translate-y-0.5 transition-[background-color,color]"
          >
            <PencilRulerIcon className="text-2xl" />
            See more things I’ve built
          </Link>
        </section>

        <section className="flex flex-col gap-6">
          <h2 data-reveal className="text-xl font-semibold text-center text-balance">
            Where I’ve worked
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Experience />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 data-reveal className="text-xl font-semibold text-center text-balance">
            I know a thing or two
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <Skills />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 data-reveal className="text-xl font-semibold text-center text-balance">
            More of what I do
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Socials />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 data-reveal className="text-xl font-semibold text-center text-balance">
            Reach out to me
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Contacts />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 data-reveal className="text-xl font-semibold text-center text-balance">
            Since you’ve reached this far
          </h2>
          <div className="flex flex-col gap-4">
            <div
              data-reveal
              className="border border-l-4 border-(--text-muted) bg-(--bg-alt) rounded-2xl rounded-tl-none p-4 text-(--text-muted) flex flex-col gap-3 sm:col-span-3"
            >
              <PenNibIcon className="text-2xl shrink-0" />

              <p className="px-0.5">
                I’ve redesigned this site a few times over the years, and every version is still online. These are my
                older portfolios, left exactly as they were when I moved on to the next one.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Portfolios />
            </div>
          </div>
        </section>

        <section className="flex justify-center">
          <ThatsAllFolksBtn />
        </section>
      </main>

      <SectionBtn />
    </>
  );
};

export default HomePage;
