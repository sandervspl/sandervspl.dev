import '../globals.css';
// import '../client';
import type { PageProps } from '@parcel/rsc';
import { Head } from '../components/head';
import GithubIcon from 'jsx:../icons/github.svg';
import InstagramIcon from 'jsx:../icons/instagram.svg';
import TwitterIcon from 'jsx:../icons/twitter.svg';

export default function Page(props: PageProps) {
  return (
    <html lang="en">
      <Head />
      <body className="text-neutral-700 bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-200 transition-colors">
        <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 my-20">
          <div className="mx-auto max-w-2xl space-y-10">
            <header>
              <h1 className="text-2xl font-bold">Sander Vispoel</h1>
              <p className="text-neutral-600 dark:text-neutral-500">Fullstack Developer</p>

              <p className="text-neutral-500 dark:text-neutral-400 mt-4">
                📍 Living in Utrecht, The Netherlands 🇳🇱
              </p>
            </header>
            <section className="space-y-2">
              <h2 className="text-xl">Projects</h2>
              <ul className="grid sm:grid-cols-3 gap-2">
                <ProjectListItem
                  title="Wowvalor.app"
                  description="Statistics for high-end World of Warcraft players"
                  href="https://wowvalor.app"
                />
                <ProjectListItem
                  title="Word 2 Emoji"
                  description="Transform words into emojis with AI"
                  href="https://word2emoji.com"
                />
                <ProjectListItem
                  title="Buff Timers"
                  description="World of Warcraft addon"
                  href="https://curseforge.com/wow/addons/bufftimers"
                />
                <ProjectListItem
                  title="Public repositories"
                  description="Too many to list them all"
                  href="https://github.com/sandervspl?tab=repositories&q=&type=public&language=&sort="
                />
              </ul>
            </section>

            <footer className="border-t dark:border-neutral-600 pt-2 flex justify-between items-center">
              <span>🐠</span>
              <ul className="flex gap-6">
                <SocialLink
                  href="https://github.com/sandervspl"
                  icon={<GithubIcon aria-hidden="true" className="size-3.5" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://instagram.com/sandervspl"
                  icon={<InstagramIcon aria-hidden="true" className="size-3.5" />}
                  label="Instagram"
                />
                <SocialLink
                  href="https://twitter.com/sandervspl"
                  icon={<TwitterIcon aria-hidden="true" className="size-3.5" />}
                  label="Twitter"
                />
              </ul>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}

function ProjectListItem({
  title,
  description,
  href,
}: { title: string; description: string; href: string }) {
  return (
    <li className="transition p-2 -ml-2 rounded-lg group">
      <a href={href} target="_blank" rel="noreferrer">
        <h3 className="underline underline-offset-[6px] mb-2 decoration-neutral-300 dark:decoration-neutral-600 group-hover:decoration-cyan-400 dark:group-hover:decoration-yellow-200 transition-colors">
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400">{description}</p>
      </a>
    </li>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <li className="hover:bg-neutral-100 dark:hover:bg-neutral-800! transition p-2 -ml-2 rounded-lg">
      <a href={href} className="flex gap-1.5 items-center text-sm" target="_blank" rel="noreferrer">
        {icon}
        {label}
      </a>
    </li>
  );
}
