type Props = {
  title: string;
  description: string;
  href: string;
};

export function ProjectListItem({ title, description, href }: Props) {
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
